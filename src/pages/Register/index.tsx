import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';

import UsersService, { User } from '@services/UsersService';
import safeString from '@utils/safeString';

import { FormField } from '@components/FormField';
import { PasswordVisibility } from '@components/PasswordVisibility';

import illustrationImg from '@assets/images/illustration-register.png';

const registerSchema = yup.object({
  name: yup.string().required().label('Name'),
  email: yup.string().email('Email format is invalid').required().label('Email'),
  password: yup.string().required().label('Password'),
  retypePassword: yup.string().equals<string>(
    [yup.ref<string>('password')],
    'Re-type password must be equals password',
  ).required().label('Re-type password'),
}).required();

type RegisterSchema = yup.InferType<typeof registerSchema>;

export function Register() {
  const {
    register, handleSubmit, trigger, watch, formState: { errors, isValid },
  } = useForm<RegisterSchema>({
    mode: 'all',
    resolver: yupResolver(registerSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    const newUser: User = {
      email: data.email,
      name: data.name,
      password: data.password,
    };

    try {
      await UsersService.createUser(newUser);
      alert('Your account was created sucessfully!');
    } catch (err) {
      if (err instanceof axios.AxiosError) {
        alert(err.response?.data.error ?? 'Something went wrong!');
      }
    }
  };

  const handlePasswordVisibility = useCallback(() => {
    setShowPassword((prevState) => !prevState);
  }, []);

  const handleRetypePasswordVisibility = useCallback(() => {
    setShowRetypePassword((prevState) => !prevState);
  }, []);

  function handlePasswordChange() {
    if (watch('retypePassword')) {
      trigger('retypePassword');
    }
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 h-full">
      <main className="flex flex-col items-center justify-center bg-blue-100 font-poppins">
        <form
          className="bg-white p-5 py-8 sm:p-10 mb-4 mx-auto rounded-xl max-w-md w-11/12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2
            className="font-semibold text-3xl text-blue-900 text-center mb-11"
          >
            Create new account
          </h2>

          <FormField
            {...register('name')}
            label="Name"
            placeholder="Enter your name"
            error={errors.name?.message}
            leftIcon={<i className="fa-solid fa-user" />}
          />

          <FormField
            {...register('email')}
            label="Email"
            placeholder="Enter your email"
            error={errors.email?.message}
            leftIcon={<i className="fa-solid fa-envelope" />}
          />

          <FormField
            {...register('password', { deps: ['reTypePassword'], onChange: handlePasswordChange })}
            inputType={showPassword ? 'text' : 'password'}
            label="Password"
            placeholder="Enter your password"
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

          <FormField
            {...register('retypePassword')}
            inputType={showRetypePassword ? 'text' : 'password'}
            label="Re-type password"
            placeholder="Re-type your password"
            error={safeString(errors.retypePassword?.message)}
            leftIcon={<i className="fa-solid fa-lock" />}
            rightIcon={(
              <PasswordVisibility
                variant={errors.retypePassword && 'error'}
                show={showRetypePassword}
                onClick={handleRetypePasswordVisibility}
              />
            )}
          />

          <button
            type="submit"
            className="
              w-full font-semibold text-lg py-3 mt-2 bg-blue-600 hover:bg-blue-700 transition-colors
              text-white rounded-lg shadow-md disabled:bg-gray-500
            "
            disabled={!isValid}
          >
            Sign Up
          </button>
        </form>

        <p
          className="text-sm text-black text-opacity-80"
        >
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-800"
          >
            Login In&nbsp;
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
          className="block max-w-sm w-11/12"
        />
      </section>
    </section>
  );
}
