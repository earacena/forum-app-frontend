import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch } from '../../hooks';
import { setAuthenticatedUser } from '../auth';
import loginService from '../../services/loginService';
import { notify } from '../notification';
import {
  LoginFormWrapper,
  LoginFormTitle,
} from './loginFormStyle';
import {
  FormSubmitButton, FormInput, ErrorMessage, FormLabel,
} from '../../components';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-bottom: 30px;
`;

type Inputs = {
  username: string;
  password: string;
};

function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (credentials) => {
    try {
      const token = await loginService.login(credentials);

      if (token) {
        const message = token.name
          ? `Successfully signed in, welcome ${token.name}`
          : `Successfully signed in, welcome ${token.username}`;

        dispatch(setAuthenticatedUser(token));

        // Save user session
        window.localStorage.setItem('forumAppUser', JSON.stringify(token));

        reset({
          username: '',
          password: '',
        });
        notify('message', message, 4);
        navigate('/');
      }
    } catch (error) {
      notify('error', 'Incorrect username or password, try again.', 4);
    }
  };

  return (
    <LoginFormWrapper onSubmit={handleSubmit(onSubmit)}>
      <LoginFormTitle>Login</LoginFormTitle>
      <InputWrapper>
        <FormLabel htmlFor="username">Username</FormLabel>
        {errors.username && <ErrorMessage>This field is required</ErrorMessage>}
        <FormInput
          id="username"
          type="text"
          placeholder="Username"
          {...register('username', { required: true })}
        />

        <FormLabel htmlFor="password">Password</FormLabel>
        {errors.password && <ErrorMessage>This field is required</ErrorMessage>}
        <FormInput
          id="password"
          type="password"
          placeholder="Password"
          {...register('password', { required: true })}
        />
      </InputWrapper>

      <FormSubmitButton primary type="submit">Log In</FormSubmitButton>
    </LoginFormWrapper>
  );
}

export default LoginForm;
