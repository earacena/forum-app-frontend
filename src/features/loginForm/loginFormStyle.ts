import styled from 'styled-components';

export const LoginFormTitle = styled.h2`
  font-size: 1.5em;
  text-align: center;
`;

export const LoginFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px black solid;
  padding: 2em;
  padding-top: 0.4em;
  margin: 0 auto;
  width: 400px;
`;

export const Input = styled.input`
  padding: 1em;
  margin-top: 0;
  margin: 1em;
  border: 1px black solid;
  border-radius: 3px;
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
  width: 50%;
  &:hover {
    background: ${(props) => (props.primary ? 'darkgrey' : 'grey')};
    color: ${(props) => (props.primary ? 'black' : 'white')};
  }
`;

export const ErrorMessage = styled.span`
  color: red;
  padding-left: 1em
`;

export const Label = styled.label`
  font-size: 17px;
  margin: 1em;
  margin-bottom: 0;
`;
