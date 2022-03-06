import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { setAuthenticatedUser } from '../auth/auth.slice';
import loginService from '../../services/loginService';
import { notify } from '../notification/Notification';
import {
  LoginFormWrapper,
  LoginFormTitle,
  Label,
} from './loginFormStyle';
import FormSubmitButton from '../../components/FormSubmitButton';
import FormInput from '../../components/FormInput';
import ErrorMessage from '../../components/ErrorMessage';

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
      <Label htmlFor="username">Username</Label>
      {errors.username && <ErrorMessage>This field is required</ErrorMessage>}
      <FormInput
        id="username"
        type="text"
        placeholder="Username"
        {...register('username', { required: true })}
      />

      <Label htmlFor="password">Password</Label>
      {errors.password && <ErrorMessage>This field is required</ErrorMessage>}
      <FormInput
        id="password"
        type="password"
        placeholder="Password"
        {...register('password', { required: true })}
      />

      <FormSubmitButton primary type="submit">Log In</FormSubmitButton>
    </LoginFormWrapper>
  );
}

export default LoginForm;
