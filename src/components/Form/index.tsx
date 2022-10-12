import { FormHTMLAttributes } from 'react';
import { FormField } from './FormField';

interface FormRootProps extends FormHTMLAttributes<HTMLFormElement> {}

function FormRoot(props: FormRootProps) {
  return (
    <form
      className="bg-white p-5 py-8 sm:p-10 mb-4 mx-auto rounded-xl max-w-md w-11/12"
      {...props}
    />
  );
}

export const Form = {
  Root: FormRoot,
  Field: FormField,
};
