import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from './useAxiosPrivate';

const GET_USERS_URL = '/admin/users';

const useGetUserData = () => {
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const getUsers = async () => {
    try {
      const response = await axiosPrivate.get(GET_USERS_URL, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setUsers(response.data.data);

    } catch (err) {
      navigate('/sign-in', { state: { from: location }, replace: true });
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return { users, getUsers };
};

export default useGetUserData;


