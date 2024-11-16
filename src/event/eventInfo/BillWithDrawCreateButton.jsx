import styled from "styled-components";
import { messageToCreateTransactionWithdraw } from "../../constants/messageToRN";
import { sendMessageToNative } from "../../server/reactNative";
import { useParams } from "react-router-dom";

const CreateButton = styled.button`
    height: 50px;
    width: 100%;
    /* background-color: red; */
    border: 1px solid #6c5ce7;
    text-align: center;
    text-decoration: none;

    font-size: 16px;
    font-weight: bold;
    color: #6c5ce7;
    
    cursor: pointer;
    border-radius: 5px;
`


export default function BillWithDrawCreateButton(){
    const clubId = useParams().clubId;
    const eventId = useParams().eventId;
    return (
        <CreateButton onClick={() => sendMessageToNative(messageToCreateTransactionWithdraw(clubId, eventId))}>
            신규 출금 생성
        </CreateButton>
    );
}