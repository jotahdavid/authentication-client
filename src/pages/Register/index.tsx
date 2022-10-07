import { useState } from 'react';
import { Link } from 'react-router-dom';

import { FormField } from '@components/FormField';

import illustrationImg from '@assets/images/illustration-register.png';

export function Register() {
  const [showPassword] = useState(false);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 h-full">
      <main className="flex flex-col items-center justify-center bg-blue-100 font-poppins">
        <form
          className="bg-white p-5 py-8 sm:p-10 mb-4 mx-auto rounded-xl max-w-md w-11/12"
          onSubmit={(e) => e.preventDefault()}
        >
          <h2
            className="font-semibold text-3xl text-blue-900 text-center mb-11"
          >
            Create new account
          </h2>

          <FormField
            label="Name"
            placeholder="Enter your name"
            icon={(
              <i className="fa-solid fa-envelope text-blue-500 text-opacity-80" />
            )}
          />

          <FormField
            label="Email"
            placeholder="Enter your email"
            icon={(
              <i className="fa-solid fa-envelope text-blue-500 text-opacity-80" />
            )}
          />

          <FormField
            inputType="password"
            label="Password"
            placeholder="Enter your password"
            icon={(
              <i className="fa-solid fa-lock text-blue-500 text-opacity-80" />
            )}
            rightIcon={(
              <button
                type="button"
                className="text-blue-600 hover:text-blue-700"
              >
                {showPassword ? (
                  <i className="fa-solid fa-eye-slash" />
                ) : (
                  <i className="fa-solid fa-eye" />
                )}
              </button>
            )}
          />

          <FormField
            inputType="password"
            label="Re-type password"
            placeholder="Re-type your password"
            icon={(
              <i className="fa-solid fa-lock text-blue-500 text-opacity-80" />
            )}
            rightIcon={(
              <button
                type="button"
                className="text-blue-600 hover:text-blue-700"
              >
                {showPassword ? (
                  <i className="fa-solid fa-eye-slash" />
                ) : (
                  <i className="fa-solid fa-eye" />
                )}
              </button>
            )}
          />

          <button
            type="submit"
            className="
              w-full font-semibold text-lg py-3 mt-2 bg-blue-600 hover:bg-blue-700 transition-colors
              text-white rounded-lg shadow-md
            "
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
