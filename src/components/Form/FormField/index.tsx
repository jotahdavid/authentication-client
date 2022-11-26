import {
  forwardRef, HTMLInputTypeAttribute, ReactNode, useId,
} from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import cs from 'classnames';

type RegisterProps = Partial<Omit<UseFormRegisterReturn, 'ref'>>;

interface FormFieldProps extends RegisterProps {
  label: string;
  placeholder?: string;
  inputType?: HTMLInputTypeAttribute;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: string;
  children?: ReactNode;
}

export const FormField = forwardRef<null, FormFieldProps>((
  {
    label, placeholder, inputType, leftIcon, rightIcon, error, children, disabled, ...register
  },
  ref,
) => {
  const id = useId();

  const iconColors = {
    'text-red-500': error,
    'text-blue-500': !error,
    'text-gray-500': disabled,
  };

  return (
    <fieldset className="mb-6 last:mb-0">
      <label
        htmlFor={id}
        className={cs(
          'font-medium text-base',
          {
            'text-red-600': error,
            'text-blue-900': !error,
          },
        )}
      >
        {label}

        <div className="mt-[2px] relative">
          {leftIcon && (
            <div
              className={cs(
                'absolute top-1/2 left-3 -translate-y-1/2 text-opacity-80',
                iconColors,
              )}
            >
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            className={cs(
              'w-full border-2 rounded-lg py-2 font-medium placeholder:font-normal',
              'text-sm text-black placeholder:text-black placeholder:text-opacity-50',
              'focus:outline-none focus:border-blue-600 disabled:bg-gray-200 transition-colors',
              {
                'border-red-200 focus:border-red-500': error,
                'pl-8': leftIcon,
                'pl-2': !leftIcon,
                'pr-8': rightIcon,
                'pr-2': !rightIcon,
              },
            )}
            type={inputType}
            placeholder={placeholder}
            disabled={disabled}
            {...register}
          />

          {rightIcon && (
            <div
              className={cs(
                'absolute top-1/2 right-3 -translate-y-1/2 text-opacity-80',
                iconColors,
              )}
            >
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
      {children}
    </fieldset>
  );
});

FormField.defaultProps = {
  placeholder: '',
  inputType: 'text',
  leftIcon: null,
  rightIcon: null,
  children: null,
  error: '',
};
