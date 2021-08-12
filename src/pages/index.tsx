import React from 'react';
import { useSelector } from 'react-redux';
import { Classes, Login } from 'components';
import { RootState } from 'redux/reducers/reducers';

const Home: React.FC = () => {
  const state = useSelector((state: RootState) => state);

  return (
    <div className='d-flex flex-column min-vh-100'>
      {state.students.name ? <Classes /> : <Login />}
    </div>
  );
};

export default Home;
