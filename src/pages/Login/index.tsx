import { ReactNode, useState } from 'react';

import illustrationImg from '@assets/images/illustration-login.png';

function InvalidLink({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <a
      href="/"
      className={className}
      onClick={(e) => e.preventDefault()}
    >
      {children}
    </a>
  );
}

InvalidLink.defaultProps = {
  className: '',
};

export function Login() {
  const [showPassword] = useState(false);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 h-full">
      <main className="flex flex-col items-center justify-center bg-blue-100 font-poppins">
        <form
          className="bg-white p-5 py-8 sm:p-10 mb-4 mx-auto rounded-xl max-w-md w-11/12"
          onSubmit={(e) => e.preventDefault()}
        >
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
          <fieldset className="mb-6">
            <label
              htmlFor="email"
              className="font-medium text-base text-blue-900"
            >
              Email
              <div className="mt-0.5 relative">
                <i
                  className="
                    fa-solid fa-envelope text-blue-500 text-opacity-80
                    absolute top-1/2 left-3 -translate-y-1/2
                  "
                />
                <input
                  id="email"
                  className="
                    w-full font-normal text-black border-2 rounded-lg py-2 px-2 text-sm
                    placeholder:text-black placeholder:text-opacity-50 pl-8
                    focus:outline-none focus:border-blue-600 transition-colors
                  "
                  type="text"
                  placeholder="Enter your email"
                />
              </div>
            </label>
          </fieldset>

          <fieldset className="mb-5">
            <label
              htmlFor="password"
              className="font-medium text-base text-blue-900"
            >
              Password
              <div className="mt-0.5 relative">
                <i
                  className="
                    fa-solid fa-lock text-blue-500 text-opacity-80
                    absolute top-1/2 left-3 -translate-y-1/2
                  "
                />
                <input
                  id="password"
                  className="
                    w-full font-normal text-black border-2 rounded-lg py-2 px-2 text-sm
                    placeholder:text-black placeholder:text-opacity-50 pl-8
                    focus:outline-none focus:border-blue-600 transition-colors
                  "
                  type="password"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="
                    absolute top-1/2 right-3 -translate-y-1/2 text-blue-600 hover:text-blue-700
                  "
                >
                  {showPassword ? (
                    <i className="fa-solid fa-eye-slash" />
                  ) : (
                    <i className="fa-solid fa-eye" />
                  )}
                </button>
              </div>
            </label>
          </fieldset>

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
              text-white rounded-lg shadow-md
            "
          >
            Sign In
          </button>
        </form>

        <p
          className="text-sm text-black text-opacity-80"
        >
          Don&apos;t have an account?&nbsp;
          <InvalidLink
            className="font-medium text-blue-600 hover:text-blue-800"
          >
            Sign up for free&nbsp;
            <i className="fa-solid fa-arrow-up-right-from-square" />
          </InvalidLink>
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
