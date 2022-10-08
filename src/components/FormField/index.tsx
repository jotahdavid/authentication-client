import {
  ReactNode, HTMLInputTypeAttribute, InputHTMLAttributes, useId, forwardRef,
} from 'react';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  inputType?: HTMLInputTypeAttribute;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: string;
}

export const FormField = forwardRef<null, FormFieldProps>((
  {
    label, placeholder, inputType, leftIcon, rightIcon, error, ...inputProps
  },
  ref,
) => {
  const id = useId();

  return (
    <fieldset className="mb-6">
      <label
        htmlFor={id}
        className="font-medium text-base text-blue-900"
      >
        {label}

        <div className="mt-1 relative">
          {leftIcon && (
            <div className="absolute top-1/2 left-3 -translate-y-1/2">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            className="
              w-full font-normal text-black border-2 rounded-lg py-2 px-2 text-sm
              placeholder:text-black placeholder:text-opacity-50 pl-8
              focus:outline-none focus:border-blue-600 transition-colors
            "
            type={inputType}
            placeholder={placeholder}
            {...inputProps}
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
