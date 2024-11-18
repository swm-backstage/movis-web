import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getClubInfo } from '../../../server/club';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-direction: column;
  background-color: #f4f4f4;
  gap: 20px;
  padding: 10px 0px;
`;

const ClubContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`

const Logo = styled.img`
  height: 24px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  color: #333;
`;

const Subtitle = styled.p`
  font-size: 12px;
  margin: 0;
  color: #777;
`;

const CodeBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  background-color: #fff;
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 12px;
  color: #333;

  gap: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CodeText = styled.p`
  color: #ACB2B5;
`

const CodeNumber = styled.p`
`

function Header({clubId}) {
  const [clubInfo, setClubInfo] = useState({});

  useEffect(() => {
    const fetchClubInfo = async () => {
      const result = await getClubInfo(clubId);
      setClubInfo(result);
    }
    fetchClubInfo();
  }, [])
  return (
    <HeaderWrapper>
      <Logo src={"/logo.svg"} alt="Logo" />
      <ClubContainer>
        <TitleSection>
          <Title>{clubInfo.name}</Title>
          <Subtitle>{clubInfo.description}</Subtitle>
        </TitleSection>
        <CodeBox>
          <CodeText>입장코드</CodeText>
          <CodeNumber>{clubInfo.entryCode}</CodeNumber>
        </CodeBox>
      </ClubContainer>
    </HeaderWrapper>
  );
}

export default Header;