import { JetBrains_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono'
});

export const fontVariables = cn(fontMono.variable);
