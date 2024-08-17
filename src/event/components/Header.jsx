import { styled } from "styled-components"

const HeaderContainer = styled.header`
    display: flex;
    justify-content: start;
    align-items: center;

    height: 35px;
    padding: 15px 2rem;

    font-size: 1.2rem;
    font-weight: bold;
`

export default function Header({clubName}){

    return(
        <>
            <HeaderContainer>
                {clubName}
            </HeaderContainer>
            <hr style={{width: "calc( 100% - 5px )", margin: "0", padding: "0"}}/>
        </>
    )
}