import { useState } from "react";
import { styled } from "styled-components";
import Modal from "../../components/Modal";
import ModalForLog from "../eventInfo/components/ModalForLog";

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
                        e.billType === "deposit" ? (
                            <CircleForType $color={colorSet.deposit}>입</CircleForType>
                        ) : (
                            <CircleForType $color={colorSet.withdraw}>출</CircleForType>
                        )
                    }
                    <p>{e.name}</p>
                </ElementLeft>
                <ElementRight 
                    $color={e.billType === "deposit" 
                        ? `${colorSet.deposit}` : `${colorSet.withdraw}`}
                    >
                    {e.cash.toLocaleString()} 원
                </ElementRight>
            </ElementLog>
            
            <ModalForLog
                logId={e.id}
                onModal={{enabled: showModal, enable: setShowModal}}
            />
            
        </>
    )
}