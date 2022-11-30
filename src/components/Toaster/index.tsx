import ReactDOM from 'react-dom';
import { Toaster as BaseToaster } from 'react-hot-toast';

export function Toaster() {
  return ReactDOM.createPortal(
    <BaseToaster position="bottom-center" />,
    document.getElementById('toast-root')!,
  );
}
