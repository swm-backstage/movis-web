import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
`;

const InfoContainer = styled.div`
    display: flex;
    align-items: center;
`;

const InfoDescriptionBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5rem;
    height: 1.4rem;

    color: white;
    font-weight: bold;

    border-radius: 5px;
    background-color: ${ props => props.$state ? "#4CAF50" : "#FF4E4E" };
`;

const Title = styled.h3`
    margin-right: 10px;
    font-weight: bold;
`;

const TitleDescription = styled.p`
    font-size: 14px;
    color: #A0A0A0;
`

const Info = styled.p`
    margin-right: 10px;
    font-size: 1.2rem;
    font-weight: bold;
`;

const RemainedFee = ({$title, $duedate, $amount, $state}) => {
    const currentDate = new Date();
    const dueDate = new Date($duedate);
    const daysRemaining = Math.ceil((dueDate - currentDate) / (1000 * 60 * 60 * 24));

    const formattedDate = dueDate.toLocaleDateString();
    
    return (
        <Container>
            <TitleContainer>
                <Title>{$title}</Title>
                <TitleDescription>~{formattedDate.slice(0, -1)} | {daysRemaining}일 남음</TitleDescription>
            </TitleContainer>
            <InfoContainer>
                <Info>{$amount} 원</Info>
                <InfoDescriptionBox $state={$state} >{$state === 0 ? "납부 전" : "납부 완료"}</InfoDescriptionBox>
            </InfoContainer>
        </Container>
    );
};

export default RemainedFee;