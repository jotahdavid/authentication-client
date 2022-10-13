import {
  ChangeEvent,
  Children, cloneElement, MouseEvent, ReactElement, useCallback, useRef,
} from 'react';

interface FileUploaderProps {
  children: ReactElement;
  onFileChange: (file: File) => void;
}

export function FileUploader({ onFileChange, children }: FileUploaderProps) {
  Children.only(children);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fileInputRef.current?.click();
  }, []);

  const childrenWithProps = Children.map(children, (child) => (
    cloneElement(child, {
      onClick: handleClick,
    })
  ));

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    if (!files || !files[0]) return;
    onFileChange(files[0]);
  }

  return (
    <>
      {childrenWithProps}

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
}
