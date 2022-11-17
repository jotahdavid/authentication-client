import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { UserCredential } from '@services/UsersService';
import { usePageTitle } from '@hooks/usePageTitle';
import { useAuth } from '@hooks/useAuth';

import { Form } from '@components/Form';
import { InvalidLink } from '@components/InvalidLink';
import { PasswordVisibility } from '@components/PasswordVisibility';

import illustrationImg from '@assets/images/illustration-login.png';

const loginSchema = yup.object({
  email: yup.string().email('Email format is invalid').required().label('Email'),
  password: yup.string().required().label('Password'),
}).required();

type LoginSchema = yup.InferType<typeof loginSchema>;

export function Login() {
  usePageTitle('Auth | Login');

  const { isAuthenticated, isLoading, handleLogin } = useAuth();

  const {
    register, handleSubmit, formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    mode: 'all',
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      const userCredential: UserCredential = {
        email: data.email,
        password: data.password,
      };

      await handleLogin(userCredential);

      navigate('/profile');
    } catch (err) {
      if (err instanceof axios.AxiosError) {
        alert(err.response?.data.error ?? 'Something went wrong!');
      }
    }
  };

  const handlePasswordVisibility = useCallback(() => {
    setShowPassword((prevState) => !prevState);
  }, []);

  if ((isLoading || isAuthenticated) && !isSubmitting) {
    return null;
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 h-full">
      <main className="flex flex-col items-center justify-center bg-blue-100 font-poppins">
        <Form.Root onSubmit={handleSubmit(onSubmit)}>
          <h2
            className="font-semibold text-3xl text-blue-900 text-center mb-2"
          >
            Welcome back!
          </h2>
          <p
            className="font-medium text-base text-black text-opacity-50 text-center mb-8"
          >
            Enter your credentials to acess your account.
          </p>

          <Form.Field
            {...register('email')}
            label="Email"
            placeholder="Enter your email"
            error={errors.email?.message}
            leftIcon={<i className="fa-solid fa-envelope" />}
          />

          <Form.Field
            {...register('password')}
            label="Password"
            placeholder="Enter your password"
            inputType={showPassword ? 'text' : 'password'}
            error={errors.password?.message}
            leftIcon={<i className="fa-solid fa-lock" />}
            rightIcon={(
              <PasswordVisibility
                variant={errors.password && 'error'}
                show={showPassword}
                onClick={handlePasswordVisibility}
              />
            )}
          />

          <div className="mb-5 font-medium text-xs sm:text-sm flex justify-between">
            <label
              htmlFor="remember"
              className="flex items-center gap-2 text-black text-opacity-80"
            >
              <input
                type="checkbox"
                name="remember"
                id="remember"
                className="checkbox"
              />
              Remember me
            </label>

            <InvalidLink
              className="text-blue-600 hover:text-blue-800"
            >
              Forgot password?
            </InvalidLink>
          </div>

          <button
            type="submit"
            className="
              w-full font-semibold text-lg py-3 bg-blue-600 hover:bg-blue-700 transition-colors
              text-white rounded-lg shadow-md disabled:bg-gray-500
            "
            disabled={!isValid}
          >
            Sign In
          </button>
        </Form.Root>

        <p
          className="text-sm text-black text-opacity-80"
        >
          Don&apos;t have an account?&nbsp;
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-800"
          >
            Sign up for free&nbsp;
            <i className="fa-solid fa-arrow-up-right-from-square" />
          </Link>
        </p>
      </main>
      <section
        className="hidden bg-blue-600 md:flex items-center justify-center"
      >
        <img
          src={illustrationImg}
          alt="Illustration"
          className="block max-w-lg w-11/12"
        />
      </section>
    </section>
  );
}
