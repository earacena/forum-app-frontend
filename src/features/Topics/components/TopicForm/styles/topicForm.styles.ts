import styled from 'styled-components';

interface VisibilityProps {
  readonly visible: boolean;
}

export const TopicFormWrapper = styled.form<VisibilityProps>`
  display: ${((props) => (props.visible ? 'flex' : 'none'))};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1em;
  min-width: 300px;
  width: 100%;
  max-width: 800px;
`;

export const TopicFormTitle = styled.title``;

export const CloseButton = styled.button<VisibilityProps>`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  cursor: pointer;
  border-radius: 30px;
  padding: 0.5em;
  color: ${(props) => props.theme.colorAccent};
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

export const CreateButton = styled.button<VisibilityProps>`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  cursor: pointer;
  border-radius: 50%;
  padding: 0.6em;
  color: black;
  background: hsla(1, 83%, 63%, 1);
  border: none;
  width: auto;
  height: auto;
  font-size: 20px;
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.4);
  }

  &:active {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.3);
    transform: translateY(2px);
`;

export const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export const ColumnDiv = styled.div`
    display: flex;
    flex-direction: column;
`;
