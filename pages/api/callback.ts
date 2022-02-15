import { NextApiRequest, NextApiResponse } from "next";
const querystring = require('querystring');

/* TODO replace buffer */

const refreshingToken = (refresh_token: string) => {
  /* refresh every 30mins */

  setInterval(() => {
    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: process.env.SPOTIFY_REFRESH_TOKEN
      })
    })
    .then(res => res.json())
    .then(json => {
      process.env.SPOTIFY_ACCESS_TOKEN = json.access_token;
    });
  }, 30 * 1000)
}

const callback = (req: NextApiRequest, res: NextApiResponse) => {
  const code: string | null = req.query.code as string || null;
  const state: string | null = req.query.state as string || null;

  if (state) {
    /* get the access token */
    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: querystring.stringify({
        code: code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        grant_type: "authorization_code"
      })
    })
    .then(response => response.json())
    .then(json => {
      process.env.SPOTIFY_ACCESS_TOKEN = json.access_token;
      process.env.SPOTIFY_REFRESH_TOKEN = json.refresh_token;
      refreshingToken(json.refresh_token);
    })
    .then(() => {
      res.redirect('/')
    })
  } else {
    res.redirect('/');
  }

}

export default callback;