import { NextApiRequest, NextApiResponse } from "next";

const getOAuthToken = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ access_token: process.env.SPOTIFY_ACCESS_TOKEN });
}

export default getOAuthToken;