import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "universal-cookie";

const user = (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req.headers.cookie);
  
  fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${cookies.get('access_token')}`
    }
  })
  .then(response => response.json())
  .then(json => res.status(200).json(json))
  .catch(err => console.log(err))
}

export default user;