import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const privateRoute = (Component) => {
  const Auth = (props) => {
    const router = useRouter();
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('feedToken')) {        
        return <Component {...props} />;
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
