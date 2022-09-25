import styled from 'styled-components';

const ThemeSwitcher = styled.button`
  display: flex;
  border: none;
  padding: 10px;
  font-size: 20px;
  border-radius: 50%;
  color: ${(props) => props.theme.button.fg};
  background: black;

  &:hover {
    background: ${(props) => props.theme.button.fg};
    color: ${(props) => props.theme.button.bg};
  }
`;

export default ThemeSwitcher;
