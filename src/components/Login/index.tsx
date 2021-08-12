import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { studentactions } from 'redux/actions/index';
import { Container, Button, Form } from 'react-bootstrap';

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const login = () => {
    dispatch(studentactions.login(name));
  };

  return (
    <div className='text-center'>
      <Container>
        <div className='d-flex align-items-center justify-content-center vh-100 flex-column'>
          <div className='d-flex align-items-center pb-2'>
            <span>Student Name: </span>
            <Form.Control
              type='text'
              className='w-auto ml-4'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <Button className='d-block' size='sm' onClick={login}>
            Login
          </Button>
        </div>
      </Container>
    </div>
  );
};
