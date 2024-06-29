import React, { useState } from 'react';
import Header from './components/Header';
import { styled } from 'styled-components';
import { Outlet } from 'react-router-dom';
import EventMain from './eventMain/EventMain';
import NavigationBar from './components/NavigationBar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function EventOutlet() {
  const [BodyComponent, setBodyComponent] = useState(<EventMain />);

  return (
    <Container>
      <Header />
      <Outlet context={{BodyComponent}}/>
      <NavigationBar onSelectedBody={setBodyComponent} />
    </Container>
  );
}
