import styled from 'styled-components';

const NavButton = styled.button`
  cursor: pointer;
  padding: 0.6em;
  margin-left: 0.1em;
  color: ${(props) => props.theme.button.fg};
  background: ${(props) => props.theme.button.bg};
  border: ${(props) => props.theme.button.border};
  border-radius: ${(props) => props.theme.button.borderRadius};
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.2);
  &:hover {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.4);
  }
  &:active {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.1);
    transform: translateY(2px);
  }
`;

export default NavButton;
