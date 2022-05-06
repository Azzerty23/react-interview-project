import { FunctionComponent /* useEffect, useState */ } from 'react';
// import axios from 'axios';
// import type { User } from '@views/UsersContainer';
import Overview from '@components/Overview';

const HomeContainer: FunctionComponent = () => {
  // const [users, setUsers] = useState<User[]>([]);

  // useEffect(() => {
  //   const url = 'https://jsonplaceholder.typicode.com/users';
  //   axios.get(url).then((response) => setUsers(response.data));
  // }, []);

  return <Overview />;
};

export default HomeContainer;
