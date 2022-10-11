import styled from 'styled-components';

const FormInput = styled.input`
  padding: 1em;
  margin: 1em;
  margin-top: 0;
  border: 3px black solid;
  border-radius: 7px;
  background: ${(props) => props.theme.form.inputBg};
  color: ${(props) => props.theme.fg};
  ::placeholder {
    color: ${(props) => props.theme.fg}
  }
`;

export default FormInput;
