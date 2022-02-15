import { NextApiRequest, NextApiResponse } from "next";

const repeat = (req: NextApiRequest, res: NextApiResponse) => {
  const state = req.query.state;
  
  fetch(`${process.env.SPOTIFY_ENDPOINT_API_URL}/me/player/repeat?state=${state}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`
    }
  })
} 

export default repeat;