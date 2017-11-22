'use strict';

const google = require('googleapis'),
      OAuth2Client = google.auth.OAuth2,
      defaults = require('./defaults.json'),
      CLIENT_ID = defaults.clientId,
      CLIENT_SECRET = process.env.SECRET,
      REDIRECT_URL = process.env.REDIRECT,
      oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL),
      url = oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        //access_type: 'offline',

        // If you only need one scope you can pass it as a string
        scope: defaults.scopes
      }),
      plus = google.plus(defaults.plusVersion);

module.exports = {
  url: url,
  oauth2Client: oauth2Client,
  plus: plus
};