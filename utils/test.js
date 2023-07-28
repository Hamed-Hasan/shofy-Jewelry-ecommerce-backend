const dayjs = require("dayjs");
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)

console.log(dayjs('2010-10-20').isBetween('2010-10-19', dayjs('2010-10-25'), 'year'))