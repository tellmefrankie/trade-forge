'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Button } from '@/components/ui/button';

function setLocaleCookie(locale: string) {
  document.cookie = `locale=${locale}; path=/; max-age=31536000; SameSite=Lax`;
}

export function LanguageToggle({ locale }: { locale: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const toggleLocale = () => {
    const newLocale = locale === 'ko' ? 'en' : 'ko';
    setLocaleCookie(newLocale);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={toggleLocale}
      disabled={isPending}
      className='text-muted-foreground hover:text-foreground h-8 gap-1 px-2 font-mono text-xs'
    >
      {locale === 'ko' ? '🇰🇷 KO' : '🇺🇸 EN'}
    </Button>
  );
}
