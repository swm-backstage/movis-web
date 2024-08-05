import { useState } from "react";
import { styled } from "styled-components";
import ModalForLog from "../eventInfo/components/ModalForLog";

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
`;

const ElementLog = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    font-size: 1.2rem;

    border-bottom: 1px solid #ccc;
    padding: 10px;

    &:last-child {
        border-bottom: none;
    }
`

const ElementLeft = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap : 10px;
`

const ElementRight = styled.p`
    color: ${props => props.$color || "green"};
    font-weight: bold;
`

const CircleForType = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 2.5rem;
    height: 2.5rem;
    border-radius: 100%;

    background-color: ${props => props.$color || "green"};
    color : white;
`

const Title = styled.h3`
    margin-right: 10px;
    font-weight: bold;
`;

const TitleDescription = styled.p`
    font-size: 14px;
    color: #A0A0A0;
`

export default function EventLog({e}) {
    const [showModal, setShowModal] = useState(false);

    const colorSet = {
        "deposit" : "#3182F6",
        "withdraw" : "#FF4E4E"
    }

    return (
        <>
            <ElementLog onClick={() => setShowModal(true)}>
                <ElementLeft>
                    {
                        e.amount >= 0 ? (
                            <CircleForType $color={colorSet.deposit}>입</CircleForType>
                        ) : (
                            <CircleForType $color={colorSet.withdraw}>출</CircleForType>
                        )
                    }

                    <TitleContainer>
                        <Title>{e.name}</Title>
                        <TitleDescription>{e.paidAt.slice(0, -1)}</TitleDescription>
                    </TitleContainer>
                </ElementLeft>
                <ElementRight 
                    $color={e.amount >= 0 
                        ? `${colorSet.deposit}` : `${colorSet.withdraw}`}
                    >
                    {e.amount?.toLocaleString()} 원
                </ElementRight>
            </ElementLog>
            
            <ModalForLog
                logId={e.id}
                onModal={{enabled: showModal, enable: setShowModal}}
            />
            
        </>
    )
}