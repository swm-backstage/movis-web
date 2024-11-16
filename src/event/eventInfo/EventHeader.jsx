import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getEventInfo } from '../../server/event';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  gap: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2`
  font-size: 20px;
  color: #333;
  margin: 0;
`;

const EventName = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

function EventHeader() {
  const [eventInfo, setEventInfo] = useState({});
  const eventId = useParams().eventId;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventInfo = async () => {
      const eventInfo = await getEventInfo(eventId);
      setEventInfo(eventInfo);
    }
    fetchEventInfo();
  }, []);

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <IoIosArrowBack onClick={() => navigate(-1)} cursor={"pointer"}/>
        <Title>이벤트 내역</Title>
      </HeaderContainer>
      <EventName>{eventInfo.name}</EventName>
    </HeaderWrapper>
  );
}

export default EventHeader;