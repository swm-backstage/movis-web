import React from 'react';
import { styled } from 'styled-components';
import { Outlet } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const BodyContainer = styled.div`
  height: calc(100vh - 100px);
  overflow-y: scroll;
`

export default function EventOutlet() {

  return (
    <Container>
      <BodyContainer>
        <Outlet/>
      </BodyContainer>
      <NavigationBar/>
    </Container>
  );
}
