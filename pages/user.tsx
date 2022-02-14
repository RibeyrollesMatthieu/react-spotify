import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { I__user, setUser } from "../redux/features/userSlice";
import { useEffect, useState } from "react";

const User = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(store => store.user);
  const [ fetching, setFetching ] = useState({ loaded: false, error: null });

  useEffect(() => {
    fetch('http://localhost:3000/api/spotify/getCurrentUser')
      .then(res => res.json())
      .then(json => {
        const loadedUserData: I__user = {
          name: json.display_name,
          country: json.country,
          email: json.email,
          profile_url: json.external_urls.spotify,
          followers: json.followers.total,
          premium: json.product.toLowerCase() === 'premium'
        };

        dispatch(setUser(loadedUserData));
      })
      .then(() => setFetching({ loaded: true, error: null }))
      .catch((err) => setFetching({ error: err.message, loaded: true }))
  }, [dispatch]);

  if (!fetching.loaded) return <div>Loading data..</div>
  if (fetching.error) return <div>{fetching.error}</div>
  return (
    <div>
      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>
      <div>Country: {user.country}</div>
      <div>Followers: {user.followers}</div>
      <div>Premium? {user.premium.toString()}</div>
      <div><a href={user.profile_url}>Profile</a></div>
    </div>
  )
}

export default User;