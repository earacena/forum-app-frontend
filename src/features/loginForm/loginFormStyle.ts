import styled from 'styled-components';

export const LoginFormTitle = styled.h2`
  color: ${(props) => props.theme.fg};
  font-size: 1.5em;
  text-align: center;
`;

export const LoginFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.form.bg};
  border: 1px solid black;
  border-radius: 10px;
  padding: 2em;
  padding-top: 0.4em;
  margin: 0 auto;
  width: 400px;
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.4)
`;

export const Label = styled.label`
  font-size: 17px;
  margin: 1em;
  margin-bottom: 0;
`;
