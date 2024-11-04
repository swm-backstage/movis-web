import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoticeBox from './NoticeBox';
import { LandingPageContainer } from './styles/LandingPage.styles';
import { Header, HeaderTitle, HeaderDescription } from './styles/Header.styles';
import { ServiceInfo, ServiceInfoTitle, ServiceInfoDescription, EnterForm, InputBox, EnterButton } from './styles/ServiceInfo.styles';
import { Introduce, IntroduceTitle, FeatureContainer, FeatureCard, FeatureIcon, FeatureTitle, FeatureDescription } from './styles/Introduce.styles';
import { Event, EventTitle, EventCardContainer, EventCard, EventImage, EventContent, EventName, EventDescription, EventDate } from './styles/Event.styles';

const mock = [
  {
    "type": "EVENT",
    "typeColor" : "#ee5454",
    "content": "여기에 이벤트 내용"
  },
  {
    "type": "NOTICE",
    "typeColor" : "#00eeff",
    "content": "여기에 공지 내용"
  },
  {
    "type": "EVENT",
    "typeColor" : "#ee5454",
    "content": "여기에 공지 내용1"
  }
];

const eventData = [
  {
    id: 1,
    name: "신규 가입자 이벤트",
    description: "첫 달 무료 사용과 추가 혜택을 드립니다!",
    date: "2024년 8월 1일 - 2024년 8월 31일",
    // image: "https://~~.jpg"
  },
  {
    id: 2,
    name: "여름 특별 할인",
    description: "모든 플랜 20% 할인된 가격으로 이용하세요.",
    date: "2024년 7월 1일 - 2024년 8월 15일",
    // image: "https://~~.jpg"
  }
];

const partnerLogos = [
  { name: "과학기술정보통신부", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQolUIZKbQ69rrhd8VgvM2rJj2jKXG0ayIwuw&s" },
  { name: "산업통상자원부", url: "https://www.fkii.org/openimg.jpg" },
  { name: "소프트웨어 마에스트로", url: "https://www.swmaestro.org/static/sw/img/common/logo.png" }
];

export default function LandingPage() {
  const [noticeData, setNoticeData] = useState(mock);
  const [noticeNow, setNoticeNow] = useState(0);
  const [clubId, setClubId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setNoticeNow(prevNoticeNow => (prevNoticeNow + 1) % noticeData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [noticeData]);

  const handleEnterButton = () => {
    if (clubId === "") {
      alert("입장코드를 입력해주세요");
      return;
    }
    navigate(`/entry/${clubId}`);
  }

  const handleInputChange = (event) => {
    setClubId(event.target.value);
  }

  return (
    <LandingPageContainer>
      <Header>
        <HeaderTitle>Movis</HeaderTitle>
        <HeaderDescription>모임들을 위한 비서 서비스</HeaderDescription>
      </Header>
      <ServiceInfo>
        <ServiceInfoTitle>Movis</ServiceInfoTitle>
        <ServiceInfoDescription>모임과 회비, 그 끝엔 모비스</ServiceInfoDescription>
        <NoticeBox
          type={noticeData[noticeNow].type}
          typeColor={noticeData[noticeNow].typeColor}
          content={noticeData[noticeNow].content}/>
        <EnterForm>
          <InputBox placeholder="입장코드를 여기에 입력해주세요" onChange={handleInputChange}></InputBox>
          <EnterButton onClick={handleEnterButton}>입장하기</EnterButton>
        </EnterForm>
      </ServiceInfo>
      <Introduce>
        <IntroduceTitle>Why Movis?</IntroduceTitle>
        <FeatureContainer>
          <FeatureCard>
            <FeatureIcon>📅</FeatureIcon>
            <FeatureTitle>회비 관리 간편화</FeatureTitle>
            <FeatureDescription>모든 회비 정보를 모비스에서 쉽게 확인하세요.</FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>💰</FeatureIcon>
            <FeatureTitle>투명한 회비 관리</FeatureTitle>
            <FeatureDescription>회비 납부와 사용 내역을 투명하게 관리합니다.</FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>⚒️</FeatureIcon>
            <FeatureTitle>회비 관리 자동화</FeatureTitle>
            <FeatureDescription>매번 힘들게 관리한 회비 정보를 자동화해보세요!</FeatureDescription>
          </FeatureCard>
        </FeatureContainer>
        {/* <CTAButton>더 알아보기</CTAButton> */}
      </Introduce>
      <Event>
        <EventTitle>지금 진행 중인 이벤트</EventTitle>
        <EventCardContainer>
          {eventData.map(event => (
            <EventCard key={event.id}>
              {/* <EventImage src={event.image} alt={event.name} /> */}
              <EventContent>
                <EventName>{event.name}</EventName>
                <EventDescription>{event.description}</EventDescription>
                <EventDate>{event.date}</EventDate>
                {/* <EventButton>참여하기</EventButton> */}
              </EventContent>
            </EventCard>
          ))}
        </EventCardContainer>
      </Event>
    </LandingPageContainer>
  );
}