const R = require('ramda');
const flatten = require('flat');

const OPERATOR_AND = ' AND ';
const OPERATOR_OR = ' OR ';

const propExistAndIsBoolean = (key, value) => R.and(R.has(key, value), R.is(Boolean, value[ key ]));

const handleDeep = (key, value) => {
  const object = R.omit([ 'or' , 'group'], value);
  return searchQueryBuilder({
    ...flatten({
      [ key ]: object
    }),
    or: value.or,
    group: value.group,
  });
};
const searchQueryBuilder = (object) => {
  const operator = (propExistAndIsBoolean('or', object) && object.or) ? OPERATOR_OR : OPERATOR_AND;
  const group = propExistAndIsBoolean('group', object) && object.group || false;
  object = R.omit([ 'or' , 'group'], object);

  return R.pipe(
    R.mapObjIndexed(
      (value, key) => {
        if (R.isNil(value) || R.isEmpty(value)) {
          return;
        }
        switch (R.type(value)) {
          case 'Object':
            if (!R.has('include', value)) {
              if (R.has('from', value) || R.has('to', value)) {
                throw new Error('search range should have key include');
              }
              return handleDeep(key, value);
            }
            return (value.include) ? `${key}: [${value.from} TO ${value.to}]` : `${key}: {${value.from} TO ${value.to}}`;
          case 'String':
            return `${key}: "${value}"`;
          default:
            return `${key}: ${value}`;
        }
      }),
    R.values,
    R.reject(R.isNil),
    R.join(operator),
    R.when(()=>group, (string)=>`(${string})`),
  )(object)
};


module.exports = {
  searchQueryBuilder,
};
