import { ReactNode, HTMLInputTypeAttribute, useId } from 'react';

interface FormFieldProps {
  inputType?: HTMLInputTypeAttribute;
  label: string;
  placeholder: string;
  icon?: ReactNode;
  rightIcon?: ReactNode;
}

export function FormField({
  inputType, label, placeholder, icon: Icon, rightIcon: RightIcon,
}: FormFieldProps) {
  const id = useId();

  return (
    <fieldset className="mb-6">
      <label
        htmlFor={id}
        className="font-medium text-base text-blue-900"
      >
        {label}
        <div className="mt-0.5 relative">
          {Icon && (
            <div className="absolute top-1/2 left-3 -translate-y-1/2">
              {Icon}
            </div>
          )}
          <input
            id={id}
            className="
              w-full font-normal text-black border-2 rounded-lg py-2 px-2 text-sm
              placeholder:text-black placeholder:text-opacity-50 pl-8
              focus:outline-none focus:border-blue-600 transition-colors
            "
            type={inputType}
            placeholder={placeholder}
          />
          {RightIcon && (
            <div className="absolute top-1/2 right-3 -translate-y-1/2">
              {RightIcon}
            </div>
          )}
        </div>
      </label>
    </fieldset>
  );
}

FormField.defaultProps = {
  icon: null,
  inputType: 'text',
  rightIcon: null,
};
