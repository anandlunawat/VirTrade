'use client'
import { printLogs } from '../actions/logs';

import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

const privateRoute = (Component) => {
  printLogs("In privateRoute.js")
  const Auth = (props) => {
    const router = useRouter();
    const [hydrated, isHydrated] = useState(false)
    useEffect(() => {
      isHydrated(true)
    }, [])
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('feedToken')) {
        return !hydrated ? null : <Component {...props} />;
      } else {
        toast.error("PLease Login to access.")
        router.push('/');
      }
    }
    return null;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default privateRoute;
