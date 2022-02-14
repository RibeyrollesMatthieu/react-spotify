import { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";
import Cookies from "universal-cookie";
const querystring = require('querystring');

const callback = (req: NextApiRequest, res: NextApiResponse) => {
  const code: string | null = req.query.code as string || null;
  const state: string | null = req.query.state as string || null;
  const cookies = new Cookies(req.headers.cookie);

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
    .then((json) => res.redirect('http://localhost:3000/login?' + querystring.stringify({
      access_token: json.access_token,
      refresh_token: json.refresh_token
    })))
  }

}

export default callback;