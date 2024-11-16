import styled from "styled-components";

const Button = styled.button`
    height: 50px;
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


export default function EventUnClassified(){
    return (
        <Button onClick={() => sendMessageToNative(messageToUnClassified(clubId))}>
            미분류 내역 조회
        </Button>
    );
}