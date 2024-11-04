import React from 'react';
import { styled } from 'styled-components';
import { Outlet } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export default function EventOutlet() {

  return (
    <Container>
      <Outlet/>
      <NavigationBar/>
    </Container>
  );
}
