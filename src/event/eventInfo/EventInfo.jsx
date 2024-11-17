import React from 'react';
import styled from 'styled-components';
import EventHeader from './EventHeader';
import BillList from './BillList';
import BillDepositCreateButton from './BillDepositCreateButton';
import BillWithDrawCreateButton from './BillWithDrawCreateButton';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  gap: 10px;
`;

function EventInfo() {
  return (
    <PageWrapper>
      <EventHeader />
      <ButtonContainer>
        <BillDepositCreateButton />
        <BillWithDrawCreateButton />
      </ButtonContainer>
      <BillList />
    </PageWrapper>
  );
}

export default EventInfo;