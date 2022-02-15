import { NextApiRequest, NextApiResponse } from "next";

const pause = async (req: NextApiRequest, res: NextApiResponse) => {

  fetch(`${process.env.SPOTIFY_ENDPOINT_API_URL}/me/player/${req.query.action}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`
    }
  })
}

export default pause;