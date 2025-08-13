import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { getLangFromUrl } from '@/i18n/utils';

export default function LangToggle() {
  const [open, setOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const rootRef = useRef<HTMLDivElement>(null);

  // Update current language when component mounts or URL changes
  useEffect(() => {
    setCurrentLang(getCurrentLang());
  }, []);

  const handleClick = (lang: string) => {
    const currentPathname = window.location.pathname;
    console.log(currentPathname);

    // Remove existing language prefix if present
    const pathWithoutLang = currentPathname.replace(/^\/(cn|en)(\/|$)/, '/');
    const cleanPath = pathWithoutLang === '/' ? '' : pathWithoutLang;

    if (lang === 'en') {
      // English is default locale, no prefix needed
      window.location.replace(`/${cleanPath}`.replace('//', '/'));
    } else {
      // Other languages need prefix
      window.location.replace(`/${lang}${cleanPath}`);
    }
  };

  // Get current language from URL
  const getCurrentLang = () => {
    try {
      return getLangFromUrl(new URL(window.location.href));
    } catch {
      return 'en'; // fallback
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    if (!open) return;
    const onDocClick = (event: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onDocClick, { capture: true });
    return () =>
      document.removeEventListener('click', onDocClick, {
        capture: true,
      } as any);
  }, [open]);

  return (
    <div className='relative' ref={rootRef}>
      <button
        id='lang-toggle'
        className='hover:bg-accent-soft flex cursor-pointer items-center justify-center rounded-sm p-2 transition-colors duration-300 ease-in-out'
        aria-label='Toggle language'
        title='Toggle language'
        onClick={(event) => {
          event.stopPropagation();
          setOpen((isOpen) => !isOpen);
        }}
      >
        <span className='relative h-5 w-5'>
          <Icon
            icon='material-symbols:translate-rounded'
            width={20}
            height={20}
            className={'absolute'}
          />
        </span>
      </button>

      <div
        id='lang-menu'
        className={
          'card absolute top-12 right-0 z-50 min-w-[120px] px-1 py-1 ' +
          (open ? '' : 'hidden')
        }
      >
        <button
          className={`hover:bg-accent-soft flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-left text-sm ${
            currentLang === 'en' ? 'bg-accent-soft' : ''
          }`}
          onClick={() => {
            handleClick('en');
            setOpen(false);
          }}
        >
          {currentLang === 'en' && (
            <Icon icon='material-symbols:check' width={16} height={16} />
          )}
          <span className={currentLang !== 'en' ? 'ml-6' : ''}>English</span>
        </button>
        <button
          className={`hover:bg-accent-soft flex w-full cursor-pointer items-center gap-2 rounded-md mt-0.5 px-3 py-2 text-left text-sm ${
            currentLang === 'cn' ? 'bg-accent-soft' : ''
          }`}
          onClick={() => {
            handleClick('cn');
            setOpen(false);
          }}
        >
          {currentLang === 'cn' && (
            <Icon icon='material-symbols:check' width={16} height={16} />
          )}
          <span className={currentLang !== 'cn' ? 'ml-6' : ''}>简体中文</span>
        </button>
      </div>
    </div>
  );
}
