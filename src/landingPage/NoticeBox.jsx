import React from 'react';
import styled from 'styled-components';

const NoticeBoxWrapper = styled.div`
    display: flex;
    align-items: center;

    border: 1px solid white;
    border-radius: 5px;

    width: 20rem;
    padding: 10px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.1);
`;

const TypeIndicator = styled.div`
    width: 3rem;
    font-weight: bold;
    margin-right: 10px;
    color: ${props => props.typeColor};
`;

const Separator = styled.div`
    margin: 0 10px;
`;

const Content = styled.div`
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const NoticeBox = ({ type, typeColor, content }) => {
    return (
        <NoticeBoxWrapper>
            <TypeIndicator typeColor={typeColor}>{type}</TypeIndicator>
            <Separator>|</Separator>
            <Content>{content.length > 10 ? `${content.slice(0, 10)}...` : content}</Content>
            
        </NoticeBoxWrapper>
    );
};

export default NoticeBox;