import { useNavigate } from "react-router-dom"
import { styled } from "styled-components"

const ElementContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: 20px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;

    &:last-child{
        border-bottom: 0px;
    }
`

const CashContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
`

const HeaderText = styled.p`
    font-size: 16px;
`

const CashText = styled.p`
    font-size: 18px;
    font-weight: bold;
`

export default function EventElement({title, cash, eventId}){
    const navigate = useNavigate();

    return(
        <ElementContainer
            onClick={() => navigate(`/events/${eventId}`)}
        >
            <HeaderText>{title}</HeaderText>
            <CashContainer>
                <CashText>{cash}</CashText>원
            </CashContainer>
        </ElementContainer>
    )
}