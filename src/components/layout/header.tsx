import React from 'react';
import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import { Breadcrumbs } from '../breadcrumbs';
import { LanguageToggle } from './language-toggle';
import { getLocale } from 'next-intl/server';

export default async function Header() {
  const locale = await getLocale();

  return (
    <header className='border-border flex h-12 shrink-0 items-center justify-between gap-2 border-b transition-[width,height] ease-linear'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Breadcrumbs />
      </div>
      <div className='flex items-center gap-2 px-4'>
        <LanguageToggle locale={locale} />
      </div>
    </header>
  );
}
