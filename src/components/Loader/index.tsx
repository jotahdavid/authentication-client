import { Spinner } from './Spinner';

export function Loader() {
  return (
    <div className="flex justify-center items-center h-full w-full absolute inset-0">
      <Spinner size="lg" />
    </div>
  );
}
