import React from 'react';
import styled from 'styled-components';
import Header from './components/Header.jsx';
import Summary from './components/Summary.jsx';
import UnClassifiedList from './components/UnClassifiedList.jsx';
import RecentEvents from './components/RecentEvents.jsx';
import UnpaidFee from './components/UnpaidFee.jsx';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  background: #F5F6F6;
  padding: 30px;
  min-height: calc(100vh - 100px);
`;

function MainContainer() {
  const clubId = useParams().clubId;
  const isChongmu = sessionStorage.getItem('isChongmu') || 'false';
  
  return (
    <Container>
        <Header clubId={clubId}/>
        <UnpaidFee clubId={clubId}/>
        <Summary clubId={clubId}/>
        {
          isChongmu === 'true' &&
          <UnClassifiedList clubId={clubId}/>
        }
        <RecentEvents clubId={clubId}/>
    </Container>
  );
}

export default MainContainer;