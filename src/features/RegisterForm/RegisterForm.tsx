import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { notify } from '../Notification';
import userService from '../../services/userService';
import loginService from '../../services/loginService';
import { setAuthenticatedUser } from '../auth';
import {
  FormSubmitButton,
  FormInput,
  ErrorMessage,
  FormLabel,
} from '../../components';
import {
  RegisterFormTitle,
  RegisterFormWrapper,
  InputWrapper,
} from './styles/registerForm.style';

type Inputs = {
  name: string;
  username: string;
  password: string;
};

function RegisterForm() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
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

  const isUserLoggedIn = auth.token !== '';

  useEffect(() => {
    // If user is already logged in, and they go to login page, redirect the user to previous page
    if (auth.token) {
      navigate(-1);
    }
  }, [navigate, auth.token]);

  const onSubmit: SubmitHandler<Inputs> = async (credentials) => {
    try {
      await userService.create(credentials);

      const token = await loginService.login({
        username: credentials.username,
        password: credentials.password,
      });

      dispatch(setAuthenticatedUser(token));
      window.localStorage.setItem('forumAppUser', JSON.stringify(token));
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
    <RegisterFormWrapper onSubmit={handleSubmit(onSubmit)} style={{ visibility: isUserLoggedIn ? 'hidden' : 'visible' }}>
      <RegisterFormTitle>Register</RegisterFormTitle>
      <InputWrapper>
        <FormLabel htmlFor="name">Display Name</FormLabel>
        {errors.name?.type === 'maxLength' && (
          <ErrorMessage>Name is too long</ErrorMessage>
        )}
        {errors.name?.type === 'required' && (
          <ErrorMessage>This field is required</ErrorMessage>
        )}
        <FormInput
          id="name"
          type="text"
          placeholder="Name"
          {...register('name', { required: true, maxLength: 50 })}
        />

        <FormLabel htmlFor="username">Username</FormLabel>
        {errors.username?.type === 'minLength' && (
          <ErrorMessage>Username is too short</ErrorMessage>
        )}
        {errors.username?.type === 'maxLength' && (
          <ErrorMessage>Username is too long</ErrorMessage>
        )}
        {errors.username?.type === 'required' && (
          <ErrorMessage>This field is required</ErrorMessage>
        )}
        <FormInput
          id="username"
          type="text"
          placeholder="Username"
          {...register('username', {
            required: true,
            minLength: 5,
            maxLength: 20,
          })}
        />

        <FormLabel htmlFor="password">Password</FormLabel>
        {errors.password?.type === 'minLength' && (
          <ErrorMessage>Password is too short</ErrorMessage>
        )}
        {errors.password?.type === 'required' && (
          <ErrorMessage>This field is required</ErrorMessage>
        )}
        <FormInput
          id="password"
          type="password"
          placeholder="Password"
          {...register('password', { required: true, minLength: 8 })}
        />
      </InputWrapper>

      <FormSubmitButton primary type="submit">Register User</FormSubmitButton>
    </RegisterFormWrapper>
  );
}

export default RegisterForm;
