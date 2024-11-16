import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Wrapper from './Wrapper';
import { getEventList } from '../../../server/event';
import { useNavigate, useParams } from 'react-router-dom';

const SectionTitle = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0 0 15px;
`;

const EventList = styled.div`
  margin-bottom: 15px;
`;

const EventItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f4f4f4;
`;

const EventInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const EventName = styled.p`
  font-size: 14px;
  margin: 0;
  color: #333;
`;

const EventDate = styled.span`
  font-size: 12px;
  color: #999;
`;

const Amount = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin: 0;
  color: ${({ color }) => color};
`;

const MoreOptions = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #888;
  cursor: pointer;
`;

const MoreIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f4;
  border-radius: 50%;
  margin-right: 8px;
`;

function RecentEvents() {
  const [eventList, setEventList] = useState([]);
  const navigate = useNavigate();
  const clubId = useParams().clubId;

  useEffect(() => {
    const fetchData = async () => {
      const response = await getEventList(clubId, 3);
      setEventList(response?.eventList);
    }
    fetchData();
  }, []);

  return (
    <Wrapper>
      <SectionTitle>최근 이벤트</SectionTitle>
      <EventList>
        {eventList.map((event, index) => {
          const diffTime = Math.abs(new Date() - new Date(event.createdAt));
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          const eventDate = diffDays === 0 ? '오늘' : `${diffDays}일 전`;

          return (
            <EventItem key={index}>
              <EventInfo>
                <EventName>{event.name}</EventName>
                <EventDate>{eventDate}</EventDate>
              </EventInfo>
              <Amount color={event.balance === 0 ? 'black' : event.balance >= 0 ? '#007bff' : '#dc3545'}>{event?.balance?.toLocaleString('ko-KR')}</Amount>
            </EventItem>
          )
        })}
      </EventList>
      <MoreOptions onClick={() => navigate(`/clubs/${clubId}/events`)}>
        <MoreIcon>...</MoreIcon>
        이벤트 전체보기
      </MoreOptions>
    </Wrapper>
  );
}

export default RecentEvents;