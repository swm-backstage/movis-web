import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    flex: 1;
    text-align: center;
    padding: 0.5rem;
    gap: 5px;

    cursor: pointer;
    color: #333;

    &:hover {
        background-color: #f0f0f0;
    }

    &.active {
        color: #ff4b4b;
        border-bottom: 2px solid #ff4b4b;
    }
`;

const NavItem = ({ now, Icon, active, clubId, children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        active.setItem(now); 
        if(location.pathname !== "/events/" + clubId) {
            navigate("/events/" + clubId);
        }
    }

    return (
        <StyledNavItem 
            onClick={handleClick}
            className={active.item === now ? 'active' : ''}
            >
            <Icon size="30px"/>
            {children}
        </StyledNavItem>
    );
};

export default NavItem;
