import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getEventList } from '../../server/event';
import { useNavigate, useParams } from 'react-router-dom';

const ListWrapper = styled.div`
  padding: 10px;
`;

const EventItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f4f4f4;
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
`;

const TitleItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  color: black;
  padding: 10px 0;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
`;

const EventInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const EventName = styled.p`
  font-size: 16px;
  margin: 0;
  color: #333;
`;

const EventDate = styled.span`
  font-size: 14px;
  color: #999;
`;

const Amount = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  color: ${({ color }) => color};
`;

function EventList() {
  const [events, setEvents] = useState([]);
  const clubId = useParams().clubId;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const events = await getEventList(clubId, 999);
      setEvents(events.eventList);
    }
    fetchData();
  }, []);

  const onClickEvent = (eventId) => {
    navigate(`/clubs/${clubId}/events/${eventId}`);
  }
  
  if (events.length === 0) {
    return (
      <div>
        아직 모임에 이벤트가 없습니다.
      </div>
    );
  }

  return (
    <ListWrapper>

      <TitleItem>
        <p>이벤트명</p>
        <p color='black'>총 합계</p>
      </TitleItem>

      {events.map((event, index) => {
          const originDate = new Date(event.createdAt);
          const diffTime = Math.abs(new Date() - originDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          const eventDate = diffDays === 0 ? '오늘' : `${diffDays}일 전`;

          return (
            <EventItem 
              key={index} onClick={() => 
              onClickEvent(event.eventId)}>
              <EventInfo>
                <EventName>{event.name}</EventName>
                <EventDate>{eventDate}</EventDate>
              </EventInfo>
              <Amount color={event.balance == 0 ? 'black' : event.balance >= 0 ? '#007bff' : '#dc3545'}>{event?.balance?.toLocaleString('ko-KR')} 원</Amount>
            </EventItem>
          )
        })}
    </ListWrapper>
  );
}

export default EventList;