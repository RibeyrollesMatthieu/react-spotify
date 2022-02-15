import { NextApiRequest, NextApiResponse } from "next";

const isSongLiked = (req: NextApiRequest, res: NextApiResponse) => {
  fetch(`${process.env.SPOTIFY_ENDPOINT_API_URL}/me/tracks/contains?ids=${req.query.ids}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`
    }
  })
  .then(response => response.json())
  .then(json => res.status(200).json(json))
  .catch(err => console.log(err))
}



export default isSongLiked;