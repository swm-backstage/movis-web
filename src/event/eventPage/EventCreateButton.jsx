import styled from "styled-components";
import { messageToCreateEvent } from "../../constants/messageToRN";

const CreateButton = styled.button`
    height: 50px;
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


export default function EventCreateButton(){
    return (
        <CreateButton onClick={() => sendMessageToNative(messageToCreateEvent(clubId))}>
            신규 이벤트 생성
        </CreateButton>
    );
}