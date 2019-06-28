const parser = require('lucene');

console.log(parser.parse('title: "fjskdfj" AND publishStartTime: [1234 TO 3234] AND subTitle: {1234 TO 3234} AND publishEndTime: {2234 TO undefined} AND (meta.keyword: "gdfgdjk" OR meta.authors.name: "yhchan" OR meta.authors.id: 1 OR or: true OR group: true) AND or: false'));
