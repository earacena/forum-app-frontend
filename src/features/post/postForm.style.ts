import styled from 'styled-components';

interface VisibilityProps {
  readonly visible: boolean;
}

export const PostFormWrapper = styled.form<VisibilityProps>`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  border: 1px lightgrey solid;
  border-radius: 8px;
  padding: 1em;
  width: 500px;
  margin: 0 auto;
  margin-top: 1em;
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.3);
`;

export const TextArea = styled.textarea`
  resize: none;
  border: 1px black solid;
  padding: 1em;
  height: 150px;
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
`;

export const CloseFormButton = styled.button<VisibilityProps>`
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
