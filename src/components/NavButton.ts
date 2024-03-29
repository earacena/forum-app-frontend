import styled from 'styled-components';

const NavButton = styled.button`
  cursor: pointer;
  padding: 0.6em;
  margin: 10px;
  color: ${(props) => props.theme.button.fg};
  background: ${(props) => props.theme.button.bg};
  border: ${(props) => props.theme.button.border};
  border-radius: ${(props) => props.theme.button.borderRadius};

  font-size: 15px;
  font-weight: 500;

  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.4);
    border: 1px solid ${(props) => props.theme.colorAccent};
  }
  &:active {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.1);
    transform: translateY(2px);
  }
`;

export default NavButton;
