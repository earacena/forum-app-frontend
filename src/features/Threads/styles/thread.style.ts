import styled from 'styled-components';

export const ThreadTitle = styled.h3`
  color: ${(props) => props.theme.fg};
  font-weight: 400;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  color: ${(props) => props.theme.button.fg};
  background: ${(props) => props.theme.button.bg};
  border: 1px black solid;
  border-radius: 20px;
  padding: 12px;
  margin: 0.5em;
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.2);
  font-size: 20px;

  &:hover {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.4);
    border: 1px solid ${(props) => props.theme.colorAccent};
  }
  &:active {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.1);
    transform: translateY(2px);
  }
`;

export const TopOfThread = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Spacer = styled.span`
  flex: 1;
`;
