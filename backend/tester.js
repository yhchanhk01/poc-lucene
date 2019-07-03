const parser= require('./parser');
const query ='(title: "fjskdfj") AND publishStartTime: [1234 TO 3234] AND subTitle: {1234 TO 3234} AND publishEndTime: {2234 TO undefined} AND (meta.keyword: "gdfgdjk" OR meta.authors.name: "yhchan" OR meta.authors.id: 1)';

console.log(JSON.stringify(parser(query)));
