const {searchQueryBuilder} =require('./builder');

// title: "fjskdfj" AND publishStartTime: [1234 TO 3234] AND subTitle: {1234 TO 3234} AND publishEndTime: {2234 TO undefined} AND (meta.keyword: "gdfgdjk" OR meta.authors.name: "yhchan" OR meta.authors.id: 1 OR or: true OR group: true) AND or: false
console.log(searchQueryBuilder(
  {
    title: 'fjskdfj',
    publishStartTime: {
      from: '1234',
      to: '3234',
      include: true
    },
    subTitle: {
      from: '1234',
      to: '3234',
      include: false
    },
    publishEndTime: {
      from: '2234',
      include: false
    },
    tags: [],
    meta: {
      keyword: 'gdfgdjk',
      authors: {
        name: 'yhchan',
        id: 1
      },
      or: true,
      group:true,
    },
    or:false,
  }
));
