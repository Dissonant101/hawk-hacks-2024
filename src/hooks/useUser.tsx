import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../App';
import axios from 'axios';

export interface User {
  id: string;
  name: string;
  email: string;
}

export function useUser() {
  const [user, setUser] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const auth = useContext(SessionContext) as any;

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        'https://us-east-2.aws.neurelo.com/rest/users',
        {
          headers: {
            'X-API-KEY':
              'neurelo_9wKFBp874Z5xFw6ZCfvhXYgW+6IrvRGB88Iaa4knlm2zOF/nakrV/jSrVszE2WKDcf6S6+ooTEHQrgYgjMWtj++yCOV/Lp7hhorR0HGRrU3zoYKG0E4LVMuqD21mEtT4d/rtJeIWQY4yEA8lYlLa6ZjekJjhcE6fbcPmEnOxjHI5QBKYyvA/JSSKTs6R+gPU_6IhO4QlrTFhy/Fn5eJ9LuEBO0SAsyevH05G8s7U1QPg=',
            'Content-Type': 'application/json',
          },
          params: {
            filter: JSON.stringify({
              email: auth.user.email,
            }),
          },
        },
      );
      console.log({ useUser: res.data });
      setUser(res.data[0]);
      setLoading(false);
    })();
  }, []);

  return { user, loading };
}
