import { useEffect } from 'react';

interface MetaOptions {
  title: string;
  description: string;
  image: string;
}

export function useProfileMeta({ title, description, image }: MetaOptions) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.name = name;
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta('description', description);

    const og = (
      property: string,
      content: string,
    ) => {
      let el = document.querySelector(`meta[property="og:${property}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', `og:${property}`);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    og('title', title);
    og('description', description);
    og('image', image);
  }, [title, description, image]);
}
