import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ThemeContext } from 'styled-components';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
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
  Spin,
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
  const theme = useContext(ThemeContext);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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

  const isUserLoggedIn = auth.user?.token !== '';

  useEffect(() => {
    // If user is already logged in, and they go to login page, redirect the user to previous page
    if (auth.user?.token) {
      navigate(-1);
    }
  }, [navigate, auth.user?.token]);

  const onSubmit: SubmitHandler<Inputs> = async (credentials) => {
    try {
      setIsSubmitting(true);
      await userService.create(credentials);

      const userAuth = await loginService.login({
        username: credentials.username,
        password: credentials.password,
      });

      dispatch(setAuthenticatedUser({ user: userAuth }));
      window.localStorage.setItem('forumAppUser', JSON.stringify(userAuth));
      reset({
        name: '',
        username: '',
        password: '',
      });
      notify('message', 'New account registered.', 4);
      navigate('/');
    } catch (error) {
      notify('error', 'Error registering user credentials', 4);
      setIsSubmitting(false);
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

      <FormSubmitButton
        primary
        type="submit"
        disabled={isSubmitting}
      >
        { isSubmitting ? <Spin><AiOutlineLoading3Quarters style={{ color: theme.bg, fontSize: '40px' }} /></Spin> : 'Register' }
      </FormSubmitButton>
    </RegisterFormWrapper>
  );
}

export default RegisterForm;
