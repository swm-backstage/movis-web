import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NoticeBox from './NoticeBox';
import { useNavigate } from 'react-router-dom';

const LandingPageContainer = styled.div`
    background-color: #0f0f23;
    color: white;
    font-family: 'Arial', sans-serif;
`;

const Section = styled.section``;

const Header = styled(Section)`
    display: flex;
    align-items: center;

    gap: 1rem;
    padding: 10px;
    background-color: #101032;
`;

const ServiceInfo = styled(Section)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 100px 0;
`;

const Introduce = styled(Section)``;

const Event = styled(Section)``;

const Partners = styled(Section)``;


// ----------------------------------------------

const HeaderTitle = styled.h1`
    font-size: 24px;
    font-weight: bold;
`;

const HeaderDescription = styled.p`
    color: #8b8b8b;
`;

const ServiceInfoTitle = styled.h2`
    font-size: 5rem;
    font-weight: bold;
`;

const ServiceInfoDescription = styled.p`
    font-size: 1.5rem;
    color: #b8b8b8;
`;

const EnterForm = styled.form`
    display: flex;
    gap: 1rem;
`;

const InputBox = styled.input`
    width: 20rem;
    height: 3rem;
    padding: 0 1rem;
    border: none;
    border-radius: 5px;
`;

const EnterButton = styled.button`
    width: 5rem;
    height: 3rem;
    border: none;
    border-radius: 5px;
    background-color: #ee5454;
    color: white;
`;

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
            alert("초대코드를 입력해주세요");
            return;
        }
        navigate(`/clubs/${clubId}`);
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
                    <InputBox placeholder="초대코드를 여기에 입력해주세요" onChange={handleInputChange}></InputBox>
                    <EnterButton onClick={handleEnterButton}>입장하기</EnterButton>
                </EnterForm>
            </ServiceInfo>
            <Introduce>~~ 서비스 간단 소개 ~~</Introduce>
            <Event>~~ 이벤트 임의 지정해서 넣기 ~~</Event>
            <Partners>~~ 파트너사로 과기부, 산업어쩌구, 소마 넣기 ~~</Partners>
        </LandingPageContainer>
    );
}