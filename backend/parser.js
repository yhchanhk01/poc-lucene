const lucene = require('lucene');
const R = require('ramda');

const concatAll = R.unapply(R.reduce(R.concat, []));
const toMongooseQuery = (q) => {
  if (!q) {
    return null;
  }
  const left = toMongooseQuery(R.propOr(null, 'left', q));
  const right = toMongooseQuery(R.propOr(null, 'right', q));

  const query = {};

  if (left || right) {
    const operator = R.propEq('operator', 'OR', q) ? '$or' : '$and';

    query[ operator ] = R.reject(R.isNil, concatAll(
      R.propOr([ left ], operator, left),
      R.propOr([ right ], operator, right),
    ));

    return query;
  }

  const field = R.prop('field', q);
  if (field) {
    if (R.has('term', q)) {
      query[ field ] = R.prop('term', q);
    } else {
      query[ field ] = R.reject(
        (value)=>value === 'undefined',
        (R.propEq('both', 'inclusive', q)) ? {
        $gt: R.prop('term_min', q),
        $lt: R.prop('term_max', q),
      } : {
        $gt: R.prop('term_min', q),
        $lt: R.prop('term_max', q),
      });
    }

    return query;
  }
  return undefined;
};

const parser = R.pipe(
  lucene.parse,
  toMongooseQuery,
);




module.exports = parser;
