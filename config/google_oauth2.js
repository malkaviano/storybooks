'use strict';

const google = require('googleapis'),
      OAuth2Client = google.auth.OAuth2,
      oauth_string = require('./client_secret.json'),
      CLIENT_ID = oauth_string.id,
      CLIENT_SECRET = oauth_string.secret,
      REDIRECT_URL = oauth_string.redirect_url,
      oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL),
      url = oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',

        // If you only need one scope you can pass it as a string
        scope: [ 
          'https://www.googleapis.com/auth/plus.login',
          'https://www.googleapis.com/auth/plus.me',
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/userinfo.profile'
        ]
        
      }),
      plus = google.plus('v1');

module.exports = {
  url: url,
  oauth2Client: oauth2Client,
  plus: plus
};