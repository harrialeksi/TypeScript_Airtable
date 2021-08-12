import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/reducers/reducers';
import { studentactions } from 'redux/actions/index';
import { Container, Card, Button, Spinner } from 'react-bootstrap';

export const Classes: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const classes = state.students.classes;

  return (
    <Container className='position-relative'>
      <Button
        size='sm'
        className='position-absolute'
        style={{ top: 10, right: 0 }}
        onClick={() => dispatch(studentactions.logout())}
      >
        Logout
      </Button>
      <div className='d-flex flex-column align-items-center justify-content-center vh-100'>
        {state.students.loading && <Spinner animation='border' variant='dark' />}
        {classes.map((record, index) => {
          return (
            <Card key={index} style={{ width: '28rem' }} className='mb-3'>
              <Card.Body>
                <p className='font-weight-bold'>Name</p>
                <p>{record.name}</p>
                <p className='font-weight-bold'>Students</p>
                <p>{record.student_name && record.student_name.join(', ')}</p>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </Container>
  );
};
