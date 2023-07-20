import React, { useEffect } from 'react';
import Form from '../Form';
import ContactsList from '../ContactsList';
import Filter from 'components/Filter';
import { Container } from './App.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getError, getIsLoading } from 'redux/selector';
import { fetchContacts } from 'redux/operations';
import Loader from 'components/Loader';

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container>
      <h1>Phonebook</h1>
      <Form />
      <h2>Contacts</h2>
      <Filter />
      {isLoading && !error && <Loader />}
      <ContactsList />
    </Container>
  );
};

export default App;
