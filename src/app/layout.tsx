import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/sonner';
import { fontVariables } from '@/components/themes/font.config';
import { DEFAULT_THEME } from '@/components/themes/theme.config';
import ThemeProvider from '@/components/themes/theme-provider';
import { cn } from '@/lib/utils';
import type { Metadata, Viewport } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'TradeForge — 자동매매 모니터링 대시보드',
  description:
    'Crypto Trading Bot Dashboard — 자동매매 트레이딩 모니터링 대시보드'
};

export const viewport: Viewport = {
  themeColor: '#0d1117'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='ko'
      className='dark'
      suppressHydrationWarning
      data-theme={DEFAULT_THEME}
    >
      <body
        className={cn(
          'bg-background overflow-x-hidden overscroll-none font-sans antialiased',
          fontVariables
        )}
      >
        <NextTopLoader color='#00d4ff' showSpinner={false} />
        <NuqsAdapter>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            forcedTheme='dark'
            disableTransitionOnChange
            enableColorScheme
          >
            <Providers activeThemeValue={DEFAULT_THEME}>
              <Toaster />
              {children}
            </Providers>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
