'use strict';

const moment = require('moment'),
      htmlToText = require('html-to-text');

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
  formatDate: (date, format) => moment(date).format(format),
  selected: (selected, options) => {
    const str = ` value="${selected}"`;
    return options.fn(this)
                  .replace(
                    str,
                    `${str} selected="selected"`
                  );
  },
  htmlToText: html => htmlToText.fromString(html, {
    wordwrap: false
  }),
  showEditIcon: (userId, authorId) => {
    console.log(userId);
    console.log(authorId);
    console.log(userId.trim() === authorId.trim());
    userId === authorId;
  }
};