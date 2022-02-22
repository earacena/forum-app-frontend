import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { setAuthenticatedUser } from '../auth/authSlice';
import loginService from '../../services/loginService';
import { notify } from '../notification/Notification';
import {
  Input,
  Button,
  LoginFormWrapper,
  LoginFormTitle,
  ErrorMessage,
  Label,
} from './loginFormStyle';

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
      <Label htmlFor="username">Username</Label>
      {errors.username && <ErrorMessage>This field is required</ErrorMessage>}
      <Input
        id="username"
        type="text"
        placeholder="Username"
        {...register('username', { required: true })}
      />

      <Label htmlFor="password">Password</Label>
      {errors.password && <ErrorMessage>This field is required</ErrorMessage>}
      <Input
        id="password"
        type="password"
        placeholder="Password"
        {...register('password', { required: true })}
      />

      <Button type="submit">Log In</Button>
    </LoginFormWrapper>
  );
}

export default LoginForm;
