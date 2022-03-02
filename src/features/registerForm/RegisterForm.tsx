import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../../hooks';
import {
  ErrorMessage,
  Label,
  Input,
  RegisterFormTitle,
  RegisterFormWrapper,
} from './registerForm.style';
import { Button } from '../loginForm/loginFormStyle';
import { notify } from '../notification/Notification';
import userService from '../../services/userService';
import loginService from '../../services/loginService';
import { setAuthenticatedUser } from '../auth/auth.slice';

type Inputs = {
  name: string;
  username: string;
  password: string;
};

function RegisterForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: '',
      username: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (credentials) => {
    try {
      await userService.create(credentials);

      const token = await loginService.login({
        username: credentials.username,
        password: credentials.password,
      });

      dispatch(setAuthenticatedUser(token));
      reset({
        name: '',
        username: '',
        password: '',
      });
      notify('message', 'New account registered.', 4);
      navigate('/');
    } catch (error) {
      notify('error', 'Error registering user credentials', 4);
    }
  };

  return (
    <RegisterFormWrapper onSubmit={handleSubmit(onSubmit)}>
      <RegisterFormTitle>Register</RegisterFormTitle>
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        type="text"
        placeholder="Name"
        {...register('name', { required: true, maxLength: 50 })}
      />
      {errors.name?.type === 'maxLength' && (
        <ErrorMessage>Name is too long</ErrorMessage>
      )}
      {errors.name?.type === 'required' && (
        <ErrorMessage>This field is required</ErrorMessage>
      )}

      <Label htmlFor="username">Username</Label>
      <Input
        id="username"
        type="text"
        placeholder="Username"
        {...register('username', {
          required: true,
          minLength: 5,
          maxLength: 20,
        })}
      />
      {errors.username?.type === 'minLength' && (
        <ErrorMessage>Username is too short</ErrorMessage>
      )}
      {errors.username?.type === 'maxLength' && (
        <ErrorMessage>Username is too long</ErrorMessage>
      )}
      {errors.username?.type === 'required' && (
        <ErrorMessage>This field is required</ErrorMessage>
      )}

      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        type="password"
        placeholder="Password"
        {...register('password', { required: true, minLength: 8 })}
      />
      {errors.password?.type === 'minLength' && (
        <ErrorMessage>Password is too short</ErrorMessage>
      )}
      {errors.password?.type === 'required' && (
        <ErrorMessage>This field is required</ErrorMessage>
      )}

      <Button type="submit">Register User</Button>
    </RegisterFormWrapper>
  );
}

export default RegisterForm;
