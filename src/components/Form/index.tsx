import { FormHTMLAttributes } from 'react';
import cs from 'classnames';

import { FormField } from './FormField';

interface FormRootProps extends FormHTMLAttributes<HTMLFormElement> {}

function FormRoot({ className, ...props }: FormRootProps) {
  return (
    <form
      className={cs(
        'bg-white p-5 py-8 sm:p-12 mx-auto rounded-xl max-w-md w-11/12',
        className,
      )}
      {...props}
    />
  );
}

export const Form = {
  Root: FormRoot,
  Field: FormField,
};
