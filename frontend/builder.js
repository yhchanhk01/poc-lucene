const queryBuilder = require('lucene-query-string-builder');
const R = require('ramda');

const searchQueryBuilder = R.pipe(
  R.mapObjIndexed(
    (value, key) => {
      if (R.isNil(value) || R.isEmpty(value)) {
        return;
      }
      switch (R.type(value)) {
        case 'Object':
          return queryBuilder.field(key, queryBuilder.range(value.min, value.max));
        default:
          return queryBuilder.field(key, value);
      }
    }),
    R.values,
  R.reject(R.isNil),
  R.apply(queryBuilder.and),
  queryBuilder.group,
);

console.log(searchQueryBuilder(
  {
    title: 'fjskdfj',
    publishStartTime: {
      min: '1234',
      max: '3234'
    },
    publishEndTime: {
      min: '2234'
    },
    tags:[],
  }
));
