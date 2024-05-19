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
            'X-API-KEY': import.meta.env.VITE_NEURELO_X_API_KEY,
            'Content-Type': 'application/json',
          },
          params: {
            filter: JSON.stringify({
              email: auth.user.email,
            }),
          },
        },
      );
      // console.log({ res });

      setUser(res.data.data[0]);
      setLoading(false);
    })();
  }, []);

  return { user, loading };
}
