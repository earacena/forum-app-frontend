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
  color: ${(props) => (props.primary ? 'lightgrey' : 'black')};
  border-radius: 30px;
  font-size: 1em;
  padding: 1em;
  margin: auto;
  border: 1px lightgrey solid;
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.2);
  width: 50%;
  &:hover {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.4);
    background: ${(props) => (props.primary ? 'black' : 'lightgrey')};
    color: ${(props) => (props.primary ? 'white' : 'black')};
  }

  &:active {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.3);
    transform: translateY(2px);
    color: ${(props) => (props.primary ? 'lightgrey' : 'black')};
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
