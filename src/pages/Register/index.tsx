import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { MessageParams } from 'yup/lib/types';

import capitalize from '@utils/capitalize';
import { FormField } from '@components/FormField';
import { PasswordVisibility } from '@components/PasswordVisibility';

import illustrationImg from '@assets/images/illustration-register.png';

const handleRequireError = (params: MessageParams) => {
  const fieldName = params.label ?? capitalize(params.path);
  return `${fieldName} is required`;
};

const registerSchema = yup.object({
  name: yup.string().required(handleRequireError).label('Name'),
  email: yup.string().email('Email format is invalid').required(handleRequireError).label('Email'),
  password: yup.string().required(handleRequireError).label('Password'),
  reTypePassword: yup.string().equals<string>(
    [yup.ref<string>('password')],
    'Re-type password must be the equals password',
  ).required(handleRequireError).label('Re-type password'),
}).required();

type RegisterSchema = yup.InferType<typeof registerSchema>;

const isString = (value: any): value is string => (
  typeof value === 'string'
);

export function Register() {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<RegisterSchema>({
    mode: 'all',
    resolver: yupResolver(registerSchema),
  });

  const [showPassword] = useState(false);

  const onSubmit: SubmitHandler<RegisterSchema> = (data) => {
    console.log(data);
  };

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
            leftIcon={(
              <i className="fa-solid fa-envelope text-blue-500 text-opacity-80" />
            )}
          />

          <FormField
            {...register('email')}
            label="Email"
            placeholder="Enter your email"
            error={errors.email?.message}
            leftIcon={(
              <i className="fa-solid fa-envelope text-blue-500 text-opacity-80" />
            )}
          />

          <FormField
            {...register('password', { deps: ['reTypePassword'] })}
            inputType="password"
            label="Password"
            placeholder="Enter your password"
            error={errors.password?.message}
            leftIcon={(
              <i className="fa-solid fa-lock text-blue-500 text-opacity-80" />
            )}
            rightIcon={(
              <PasswordVisibility show={showPassword} />
            )}
          />

          <FormField
            {...register('reTypePassword')}
            inputType="password"
            label="Re-type password"
            placeholder="Re-type your password"
            error={isString(errors.reTypePassword?.message) ? errors.reTypePassword?.message : ''}
            leftIcon={(
              <i className="fa-solid fa-lock text-blue-500 text-opacity-80" />
            )}
            rightIcon={(
              <PasswordVisibility show={showPassword} />
            )}
          />

          <button
            type="submit"
            className="
              w-full font-semibold text-lg py-3 mt-2 bg-blue-600 hover:bg-blue-700 transition-colors
              text-white rounded-lg shadow-md disabled:bg-gray-500
            "
            disabled={Object.keys(errors).length > 0}
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
