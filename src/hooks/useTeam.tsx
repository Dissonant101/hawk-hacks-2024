import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../App';
import axios from 'axios';

export interface User {
  id: string;
  name: string;
  email: string;
}

export function useTeam({ user, loading }: { user: any; loading: boolean }) {
  const [team, setTeam] = useState<any[]>([]);
  const [teamLoading, setTeamLoading] = useState<boolean>(true);

  useEffect(() => {
    if (loading) return;

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
              team_id: user.id,
            }),
          },
        },
      );
      // console.log({ res });

      setTeam(res.data.data);
      setTeamLoading(false);
    })();
  }, [loading]);

  return { team, teamLoading };
}
