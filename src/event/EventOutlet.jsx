import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import { styled } from 'styled-components';
import { Outlet, useParams } from 'react-router-dom';
import EventMain from './eventMain/EventMain';
import NavigationBar from './components/NavigationBar';
import { getClubInfo } from '../server/club';

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
  const [clubName, setClubName] = useState("모임 이름 불러오는 중...");
  const clubId = useParams().clubId;

  useEffect(() => {
    const fetchClubName = async () => {
      try {
        const response = await getClubInfo(clubId)
        setClubName(response.name);
      } catch (e) {
        console.error(e);
      }
    };
    fetchClubName();
  }, []);

  return (
    <Container>
      <Header clubName={clubName}/>
      <BodyContainer>
        <Outlet context={{BodyComponent}}/>
      </BodyContainer>
      <NavigationBar handleSelectedBody={setBodyComponent} />
    </Container>
  );
}
