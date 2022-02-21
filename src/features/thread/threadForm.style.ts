import styled from 'styled-components';

export const ThreadFormTitle = styled.h2`
  font-size: 1.5em;
  text-align: center;
`;

export const ThreadFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px black solid;
  padding: 1em;
  margin: 1em;
`;

export const Input = styled.input`
  padding: 1em;
  margin: 1em;
  margin-top: 0;
`;

export const TextArea = styled.textarea`
  padding: 1em;
  margin: 1em;
  margin-top: 0em;
  resize: none;
  height: 300px;
`;

interface ButtonProps {
  readonly primary?: boolean;
}

export const Button = styled.button<ButtonProps>`
  cursor: pointer;
  background: ${(props) => (props.primary ? 'black' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'black')};
  border-radius: 30px;
  font-size: 1em;
  padding: 1em;
  margin: auto;
  border: 2px solid black;
  box-shadow: 1px 1px 4px 2px grey;

  &:hover {
    background: ${(props) => (props.primary ? 'darkgrey' : 'grey')};
    color: ${(props) => (props.primary ? 'black' : 'white')};
  }
`;

export const Label = styled.label`
  font-size: 17px;
  margin: 1em;
  margin-bottom: 0;
`;

export const ErrorMessage = styled.p`
  color: red;
  padding-left: 1em;
`;
