import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import Cookies from "universal-cookie";
import { I__user, setUser } from "../redux/features/userSlice";
import { useEffect, useState } from "react";

const User = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(store => store.user);
  const [ loaded, setLoaded ] = useState(false);
  const cookies = new Cookies();

  useEffect(() => {
    fetch('http://localhost:3000/api/user')
      .then(res => res.json())
      .then(json => {
        const loadedUserData: I__user = {
          name: json.display_name,
          country: json.country,
          email: json.email,
          profile_url: json.external_urls.spotify,
          followers: json.followers.total,
          id: json.id,
          premium: json.product.toLowerCase() === 'premium'
        };

        dispatch(setUser(loadedUserData));
      })
      .then(() => setLoaded(true));
  }, [dispatch]);

  if (!loaded) return <div>Loading data..</div>

  return (
    <div>
      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>
      <div>Country: {user.country}</div>
      <div>Followers: {user.followers}</div>
      <div>Id: {user.id}</div>
      <div>Premium? {user.premium.toString()}</div>
      <div><a href={user.profile_url}>Profile</a></div>
    </div>
  )
}

export default User;