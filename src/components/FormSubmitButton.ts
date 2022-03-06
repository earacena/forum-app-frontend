import styled from 'styled-components';

interface ButtonProps {
  readonly primary?: boolean;
}

const FormSubmitButton = styled.button<ButtonProps>`
  cursor: pointer;
  background: ${(props) => (props.primary ? 'black' : 'white')};
  color: ${(props) => (props.primary ? 'lightgrey' : 'black')};
  border-radius: 30px;
  font-size: 1em;
  padding: 1em;
  margin: 1em auto;
  border: 1px black solid;
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

export default FormSubmitButton;
