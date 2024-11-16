import React from 'react';
import styled from 'styled-components';
import EventHeader from './EventHeader';
import BillList from './BillList';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 30px;
`;

function EventInfo() {
  return (
    <PageWrapper>
      <EventHeader />
      <BillList />
    </PageWrapper>
  );
}

export default EventInfo;