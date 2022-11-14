import React, { useState, useEffect, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { ThemeContext } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setAuthenticatedUser } from '../auth';
import loginService from '../../services/loginService';
import { notify } from '../Notification';
import {
  LoginFormWrapper,
  LoginFormTitle,
  InputWrapper,
  LoginFormDescription,
} from './styles/loginForm.style';
import {
  FormSubmitButton,
  FormInput,
  ErrorMessage,
  FormLabel,
  Spin,
} from '../../components';

type Inputs = {
  username: string;
  password: string;
};

function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const auth = useAppSelector((state) => state.auth);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isUserLoggedIn = auth.user?.token !== '';

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

  useEffect(() => {
    // If user is already logged in, and they go to login page, redirect the user to previous page
    if (auth.user?.token) {
      navigate(-1);
    }
  }, [navigate, auth.user]);

  const onSubmit: SubmitHandler<Inputs> = async (credentials) => {
    try {
      setIsSubmitting(true);
      const token = await loginService.login(credentials);

      if (token) {
        const message = token.name
          ? `Successfully signed in, welcome ${token.name}`
          : `Successfully signed in, welcome ${token.username}`;

        dispatch(setAuthenticatedUser({ user: token }));

        // Save user session
        window.localStorage.setItem('forumAppUser', JSON.stringify(token));

        reset({
          username: '',
          password: '',
        });
        notify('message', message, 4);
        navigate(-1);
      }
    } catch (error) {
      notify('error', 'Incorrect username or password, try again.', 4);
      setIsSubmitting(false);
    }
  };

  return (
    <LoginFormWrapper onSubmit={handleSubmit(onSubmit)} style={{ visibility: isUserLoggedIn ? 'hidden' : 'visible' }}>
      <LoginFormTitle>Sign in</LoginFormTitle>
      <LoginFormDescription>
        to continue
      </LoginFormDescription>
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

      <FormSubmitButton primary type="submit">
        { isSubmitting ? <Spin><AiOutlineLoading3Quarters style={{ color: theme.bg, fontSize: '40px' }} /></Spin> : 'Log In' }
      </FormSubmitButton>
    </LoginFormWrapper>
  );
}

export default LoginForm;
