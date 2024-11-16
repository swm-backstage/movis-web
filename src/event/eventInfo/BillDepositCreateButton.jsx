import styled from "styled-components";
import { messageToCreateTransactionDeposit } from "../../constants/messageToRN";
import { sendMessageToNative } from "../../server/reactNative";
import { useParams } from "react-router-dom";

const CreateButton = styled.button`
    height: 50px;
    width: 100%;
    /* background-color: red; */
    border: 1px solid red;
    text-align: center;
    text-decoration: none;

    font-size: 16px;
    font-weight: bold;
    color: red;
    
    cursor: pointer;
    border-radius: 5px;
`


export default function BillDepositCreateButton(){
    const clubId = useParams().clubId;
    const eventId = useParams().eventId;
    return (
        <CreateButton onClick={() => sendMessageToNative(messageToCreateTransactionDeposit(clubId, eventId))}>
            신규 입금 생성
        </CreateButton>
    );
}