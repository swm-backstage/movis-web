import React from 'react';
import styled from 'styled-components';
import EventHeader from './EventHeader';
import EventList from './EventList';
import EventUnClassified from './EventUnClassified';
import EventCreateButton from './EventCreateButton';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 30px;
  gap: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

function EventPage() {
  const isChongmu = sessionStorage.getItem('isChongmu') || 'false';
  return (
    <PageWrapper>
      <EventHeader />
      {
        isChongmu === 'true' &&
        <ButtonContainer>
          <EventCreateButton />
          <EventUnClassified />
        </ButtonContainer>
      }
      <EventList />
    </PageWrapper>
  );
}

export default EventPage;