import styled from 'styled-components';

interface VisibilityProps {
  readonly visible: boolean;
}

export const PostFormWrapper = styled.form<VisibilityProps>`
  display: flex;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  background: ${(props) => (props.theme.post.bg)};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border: 1px lightgrey solid;
  border-radius: 8px;
  padding: 1em;
  width: 100%;
  margin: 0 auto;
  margin-top: 1em;
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.3);
  min-width: 300px;
  max-width: 800px;
`;

export const TextArea = styled.textarea`
  resize: none;
  border: 3px black solid;
  border-radius: 8px;
  padding: 1em;
  height: 200px;
  flex: 1;
`;

export const PostButton = styled.button`
  cursor: pointer;
  font-size: 15px;
  background: black;
  color: lightgrey;
  border: none;
  padding: 1em;
  margin: auto;
  margin-top: 1em;
  border-radius: 30px;
  
`;

export const AddPostButton = styled.button<VisibilityProps>`
  display: ${(props) => (props.visible ? '' : 'none')};
  cursor: pointer;
  font-size: 15px;
  background: black;
  color: lightgrey;
  border: none;
  padding: 1em;
  margin: auto;
  margin-top: 1em;
  border-radius: 30px;
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.4);
  }

  &:active {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.3);
    transform: translateY(2px);
  }
`;

export const CloseFormButton = styled.button<VisibilityProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  cursor: pointer;
  font-size: 15px;
  background: ${(props) => (props.theme.post.bg)};
  color: red;
  border: 2px solid ${(props) => props.theme.colorAccent};
  padding: 1em;
  border-radius: 30px;
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.4);
  }

  &:active {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.3);
    transform: translateY(2px);
`;

export const Label = styled.label`
  padding: 1em;
`;

export const CenteredDiv = styled.div`
  text-align: center;
`;

export const ErrorMessage = styled.span`
  color: red;
`;
