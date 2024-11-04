import React, { useEffect } from 'react';
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

const NavItem = ({ now, Icon, active, children, path}) => {
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (location.path !== path && active.item === now) {
    //         active.setItem(-1);
    //     }
    // },[navigate])

    const handleClick = () => {
        active.setItem(now); 
        navigate(path, {replace: true});
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
