import React from 'react';
import styled from 'styled-components';
import plus from '../images/plus.svg'
interface HeaderProps {
    createEvent: (event: React.MouseEvent<HTMLDivElement>) => void;
}


const HeaderWrapper = styled.header`
  height: 80px;
  position: sticky;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.calendar_bg};
`;

const HeaderText = styled.div`
  text-align: left;
  font-size: 24px;
  padding: 25px 0 0 50px;
  float: left;

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const HeaderAddWrapper = styled.div`
  text-align: right;
  font-size: 24px;
  padding: 25px 50px 0 0;
  float: right;
`;

const HeaderAdd = styled.div`
  width: 24px;
  height: 24px;
  background-image: url(${plus});
  background-size: contain;
  cursor: pointer;
`;

const Header: React.FC<HeaderProps> = ({ createEvent }) => {
    return (
        <HeaderWrapper>
            <HeaderText>Interview Calendar</HeaderText>
            <HeaderAddWrapper>
                <HeaderAdd onClick={createEvent} />
            </HeaderAddWrapper>
        </HeaderWrapper>
    );
};

export default Header;