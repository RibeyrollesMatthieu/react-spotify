import type { NextApiRequest, NextApiResponse } from "next";
let querystring = require('querystring');

const generateRandomString = (length: number) => {
  let text: string = '';
  let possible: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

const login = (req: NextApiRequest, res: NextApiResponse) => {
  const state = generateRandomString(16);
  const scope = 'user-library-read streaming user-read-email user-modify-playback-state user-read-private';

  res.redirect(
    'https://accounts.spotify.com/authorize?' + 
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: scope,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      state: state
    })
  );
}

export default login;