import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { getTheme, setTheme, applyTheme, type Theme } from '@/lib/theme';
import { getLangFromUrl, useTranslations } from '@/i18n/utils';

export default function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme>('system');
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const lang = getLangFromUrl(new URL(window.location.href));
  const translation = useTranslations(lang);

  // Initialize from storage and apply
  useEffect(() => {
    const theme = getTheme();
    setThemeState(theme);
    applyTheme(theme);

    // If system theme changes while using system preference, re-apply
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (getTheme() === 'system') applyTheme('system');
    };
    matchMedia.addEventListener('change', onChange);
    return () => matchMedia.removeEventListener('change', onChange);
  }, []);

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

  function updateTheme(next: Theme) {
    setTheme(next);
    setThemeState(next);
  }

  return (
    <div className='relative' ref={rootRef}>
      <button
        id='theme-toggle'
        className='hover:bg-accent-soft flex cursor-pointer items-center justify-center rounded-sm p-2 transition-colors duration-300 ease-in-out'
        aria-label='Toggle theme'
        title='Toggle theme'
        onClick={(event) => {
          event.stopPropagation();
          setOpen((isOpen) => !isOpen);
        }}
      >
        <span className='relative h-5 w-5'>
          <Icon
            icon='material-symbols:light-mode-outline'
            width={20}
            height={20}
            className={
              'absolute transition-opacity ' +
              (theme === 'light' ? 'opacity-100' : 'opacity-0')
            }
          />
          <Icon
            icon='material-symbols:dark-mode-outline'
            width={20}
            height={20}
            className={
              'absolute transition-opacity ' +
              (theme === 'dark' ? 'opacity-100' : 'opacity-0')
            }
          />
          <Icon
            icon='material-symbols:computer-outline'
            width={20}
            height={20}
            className={
              'absolute transition-opacity ' +
              (theme === 'system' ? 'opacity-100' : 'opacity-0')
            }
          />
        </span>
      </button>

      <div
        id='theme-menu'
        className={
          'card absolute top-12 right-0 z-50 min-w-[120px] px-1 py-1 ' +
          (open ? '' : 'hidden')
        }
      >
        <button
          data-theme-option='light'
          className='hover:bg-accent-soft flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-left text-sm'
          onClick={() => {
            updateTheme('light');
            setOpen(false);
          }}
        >
          <Icon
            icon='material-symbols:light-mode-outline'
            width={16}
            height={16}
          />
          {translation('nav.themeToggle.light')}
        </button>
        <button
          data-theme-option='dark'
          className='hover:bg-accent-soft flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-left text-sm'
          onClick={() => {
            updateTheme('dark');
            setOpen(false);
          }}
        >
          <Icon
            icon='material-symbols:dark-mode-outline'
            width={16}
            height={16}
          />
          {translation('nav.themeToggle.dark')}
        </button>
        <button
          data-theme-option='system'
          className='hover:bg-accent-soft flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-left text-sm'
          onClick={() => {
            updateTheme('system');
            setOpen(false);
          }}
        >
          <Icon
            icon='material-symbols:computer-outline'
            width={16}
            height={16}
          />
          {translation('nav.themeToggle.system')}
        </button>
      </div>
    </div>
  );
}
