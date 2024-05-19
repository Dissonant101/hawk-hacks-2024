import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../App';

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
    // Fetch user
    setUser(undefined);
  }, []);

  return { user, loading };
}
