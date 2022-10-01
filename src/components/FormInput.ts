import styled from 'styled-components';

const FormInput = styled.input`
  padding: 1em;
  margin-top: 0;
  margin: 1em;
  border: 1px black solid;
  border-radius: 7px;
  background: ${(props) => props.theme.form.inputBg};

  ::placeholder {
    color: ${(props) => props.theme.fg}
  }
`;

export default FormInput;
