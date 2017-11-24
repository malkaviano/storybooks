'use strict';

const striptags = require('striptags'),
      moment = require('moment');

module.exports = {
  truncate: function(str, len) {
    let newStr = "" + str;

    if(str.length > len) {
      const sliceSize = Math.trunc(len / 2);
      const firstSlice = newStr.substr(0, sliceSize);
      const lastSlice = newStr.substr(-sliceSize);

      newStr = `${firstSlice} ... ${lastSlice}`;
    }

    return newStr;
  },
  striptags: striptags,
  formatDate: (date, format) => moment(date).format(format),
  selected: (selected, options) => {
    console.log(options.fn(this));

    const str = ` value="${selected}"`;
    return options.fn(this)
                  .replace(
                    str,
                    `${str} selected="selected"`
                  );
  }
};