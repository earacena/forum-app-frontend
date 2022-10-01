import styled from 'styled-components';

interface ButtonProps {
  readonly primary?: boolean;
}

const FormSubmitButton = styled.button<ButtonProps>`
  cursor: pointer;
  background: ${(props) => (props.theme.colorAccent)};
  color: ${(props) => (props.theme.form.inputBg)};
  border-radius: 30px;
  font-size: 1em;
  padding: 1em;
  border: 1px black solid;
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.2);
  width: 70%;
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

export default FormSubmitButton;
