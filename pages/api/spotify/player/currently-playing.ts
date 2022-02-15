import { NextApiRequest, NextApiResponse } from "next";

const getCurrentUser =async (req: NextApiRequest, res: NextApiResponse) => {

  return new Promise<void>((resolve, reject) => {
    fetch(`${process.env.SPOTIFY_ENDPOINT_API_URL}/me/player/currently-playing`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`
      }
    })
    .then(response => response.json())
    .then(json => {
      res.status(200).json(json);
      resolve();
    })
    .catch(err => {
      reject();
    })
  })
  
}

export default getCurrentUser;