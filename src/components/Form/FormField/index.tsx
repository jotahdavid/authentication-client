import {
  forwardRef, HTMLInputTypeAttribute, ReactNode, useId,
} from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type RegisterProps = Partial<Omit<UseFormRegisterReturn, 'ref'>>;

interface FormFieldProps extends RegisterProps {
  label: string;
  placeholder: string;
  inputType?: HTMLInputTypeAttribute;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: string;
}

export const FormField = forwardRef<null, FormFieldProps>((
  {
    label, placeholder, inputType, leftIcon, rightIcon, error, ...register
  },
  ref,
) => {
  const id = useId();

  return (
    <fieldset className="mb-6">
      <label
        htmlFor={id}
        className={`font-medium text-base ${error ? 'text-red-600' : 'text-blue-900'}`}
      >
        {label}

        <div className="mt-1 relative">
          {leftIcon && (
            <div
              className={`
                absolute top-1/2 left-3 -translate-y-1/2 text-opacity-80
                ${error ? 'text-red-500' : 'text-blue-500'}
              `}
            >
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            className={`
              ${leftIcon ? 'pl-8' : 'pl-2'} ${rightIcon ? 'pr-8' : 'pr-2'}
              w-full font-medium placeholder:font-normal text-black border-2 rounded-lg py-2
              text-sm placeholder:text-black placeholder:text-opacity-50
              focus:outline-none focus:border-blue-600 transition-colors
              ${error && 'border-red-200 focus:border-red-500'}
            `}
            type={inputType}
            placeholder={placeholder}
            {...register}
          />

          {rightIcon && (
            <div className="absolute top-1/2 right-3 -translate-y-1/2">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="pl-1 mt-1 text-xs text-red-500">
            <i className="fa-solid fa-circle-xmark mr-1" />
            {error}
          </p>
        )}
      </label>
    </fieldset>
  );
});

FormField.defaultProps = {
  inputType: 'text',
  leftIcon: null,
  rightIcon: null,
  error: '',
};
