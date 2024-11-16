import React from 'react';
import styled from 'styled-components';
import { sendMessageToNative } from '../../server/reactNative';
import { messageToCreateEvent, messageToUnClassified } from '../../constants/messageToRN';
import { useParams } from 'react-router-dom';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AddButton = styled.div`
  width: 32px;
  height: 32px;
  background-color: #6c5ce7;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
`;

function EventHeader() {
  const clubId = useParams().clubId;

  return (
    <HeaderWrapper>
      <Title>이벤트</Title>
      {/* <ActionButtons>
        <AddButton onClick={() => sendMessageToNative(messageToCreateEvent(clubId))}>+</AddButton>
      </ActionButtons> */}
    </HeaderWrapper>
  );
}

export default EventHeader;