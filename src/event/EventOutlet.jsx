import React, { useState } from 'react';
import Header from './components/Header';
import { styled } from 'styled-components';
import { Outlet } from 'react-router-dom';
import EventMain from './eventMain/EventMain';
import NavigationBar from './components/NavigationBar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const BodyContainer = styled.div`
  padding: 30px;
  height: calc(100vh - 216px);
  overflow-y: hidden;
`

export default function EventOutlet() {
  const [BodyComponent, setBodyComponent] = useState(<EventMain />);

  return (
    <Container>
      <Header />
      <BodyContainer>
        <Outlet context={{BodyComponent}}/>
      </BodyContainer>
      <NavigationBar onSelectedBody={setBodyComponent} />
    </Container>
  );
}
