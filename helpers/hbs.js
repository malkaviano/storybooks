'use strict';

const striptags = require('striptags');

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
  striptags: striptags
};