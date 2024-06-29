import { styled } from "styled-components"

const HeaderContainer = styled.header`
    display: flex;

    padding: 10px;
    background-color: gray;
`

export default function Header(){

    return(
        <HeaderContainer>
            SW마에스트로~~~~헤더~~~~
        </HeaderContainer>
    )
}