import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import AppDownloadButtons from './AppDownloadButtons';

const TitleSection = () => (
  <SectionWrapper>
    <Subtitle>모임들을 위한 비서 서비스</Subtitle>
    <div>
        <MainTitle>모임과 회비, </MainTitle>
        <MainTitle>그 끝엔 <Highlight>모비스</Highlight> </MainTitle>
    </div>
    <Description>
      <ListItem>
        <CheckIcon />
        회비 관리 간편화로 모든 회비 정보를 쉽게 확인
      </ListItem>
      <ListItem>
        <CheckIcon />
        회비 납부와 내역을 투명하게 관리
      </ListItem>
      <ListItem>
        <CheckIcon />
        회비 관리 자동화로 북키핑을 쉽게 기록
      </ListItem>
    </Description>
    <AppDownloadButtons/>
  </SectionWrapper>
);

const SectionWrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: start;
    background-color: #f4f4f4;

    gap: 20px;
    padding: 60px 20px;
`;

const Subtitle = styled.p`
    color: #5e3bf5;
    font-size: 1rem;
    font-weight: bold;
`;

const MainTitle = styled.h1`
    font-size: 2.5rem;
    line-height: 1.2;
    font-weight: bold;
    color: #000;
`;

const Highlight = styled.span`
    color: #5e3bf5;
`;

const Description = styled.ul`
    list-style: none;
    line-height: 2rem;
    padding: 0;
    margin: 0;
`;

const ListItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: start;
    font-size: 16px;
    color: #666;
`;

const CheckIcon = styled(FaCheck)`
    color: #5e3bf5;
    margin-right: 8px;
    width: 16px;
    height: 16px;
`;

export default TitleSection;