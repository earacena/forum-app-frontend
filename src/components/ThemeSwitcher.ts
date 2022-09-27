import styled from 'styled-components';

const ThemeSwitcher = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
  font-size: 20px;
  border-radius: 50%;
  color: ${(props) => props.theme.button.fg};
  background: ${(props) => props.theme.button.bg};
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.button.fg};
    color: ${(props) => props.theme.button.bg};
  }
`;

export default ThemeSwitcher;
