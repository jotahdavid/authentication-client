import { useEffect, useState } from 'react';

let defaultTitle = document.title;

export function usePageTitle(initialTitle: string = document.title) {
  const [pageTitle, setPageTitle] = useState(initialTitle);

  useEffect(() => {
    document.title = pageTitle;

    return () => {
      document.title = defaultTitle;
    };
  }, [pageTitle]);

  return {
    pageTitle,
    setPageTitle,
  };
}

export function setDefaultPageTitle(title: string) {
  defaultTitle = title;
}
