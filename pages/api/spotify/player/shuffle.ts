import { NextApiRequest, NextApiResponse } from "next";

const shuffle = (req: NextApiRequest, res: NextApiResponse) => {
  const state = req.query.state;
  
  fetch(`${process.env.SPOTIFY_ENDPOINT_API_URL}/me/player/shuffle?state=${state}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`
    }
  })
} 

export default shuffle;