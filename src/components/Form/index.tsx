import { FormHTMLAttributes } from 'react';

import { FormField } from './FormField';
import safeString from '@utils/safeString';

interface FormRootProps extends FormHTMLAttributes<HTMLFormElement> {}

function FormRoot({ className, ...props }: FormRootProps) {
  return (
    <form
      className={`
        bg-white p-5 py-8 sm:p-12 mb-4 mx-auto rounded-xl max-w-md w-11/12
        ${safeString(className)}
      `}
      {...props}
    />
  );
}

export const Form = {
  Root: FormRoot,
  Field: FormField,
};
