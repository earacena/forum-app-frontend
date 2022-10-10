import styled from 'styled-components';

interface VisibilityProps {
  readonly visible?: boolean;
}

export const ThreadFormTitle = styled.h2`
  font-size: 1.5em;
  text-align: center;
`;

export const ThreadFormWrapper = styled.form<VisibilityProps>`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  padding: 1em;
  margin: 1em auto;
  width: 600px;
  border: 1px black solid;
  background: ${(props) => props.theme.form.bg};
  border-radius: 8px;
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.2);
`;

export const TextArea = styled.textarea`
  padding: 1em;
  margin: 1em;
  margin-top: 0em;
  resize: none;
  height: 300px;
  border-radius: 8px;
  border: 3px black solid;
  background: ${(props) => props.theme.form.inputBg};
  color: ${(props) => props.theme.fg};
  ::placeholder {
    color: ${(props) => props.theme.fg}
  }
`;

export const Label = styled.label`
  font-size: 17px;
  margin: 1em;
  margin-bottom: 0;
`;

export const CreateButton = styled.button<VisibilityProps>`
  display: ${(props) => (props.visible ? '' : 'none')};
  cursor: pointer;
  border-radius: 20px;
  padding: 0.6em;
  color: lightgrey;
  background: black;
  border: 1px black solid;
  width: 80%;
  height: auto;
  font-size: 16px;
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.4);
  }

  &:active {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.3);
    transform: translateY(2px);
`;

export const CloseButton = styled.button<VisibilityProps>`
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  cursor: pointer;
  border-radius: 30px;
  padding: 0.5em;
  color: red;
  background: darkred;
  border: 1px darkred solid;
  width: auto;
  height: auto;
  font-size: 16px;
  margin: auto;
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.4);
  }

  &:active {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.3);
    transform: translateY(2px);
`;

export const CenteredDiv = styled.div`
  text-align: center;
`;
