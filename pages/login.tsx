import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import Cookies from 'universal-cookie';

const Login = () => {

  const router = useRouter();

  useEffect(() => {
    const cookies = new Cookies();
    /* TODO: try to replace it with httponly cookies */
    if (router.query && router.query.access_token && router.query.refresh_token) {
      cookies.set('access_token', router.query.access_token);
      cookies.set('refresh_token', router.query.refresh_token);
      router.push('/user');
    }
  }, [router]);

  return (
    <div>
      laoding..
    </div>
  )
}

export default Login;
