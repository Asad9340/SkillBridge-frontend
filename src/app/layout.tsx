import type { Metadata } from 'next';
import { Montserrat, Geist_Mono } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/providers/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import GlobalChatbot from '@/components/modules/chatbot/GlobalChatbot';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SkillBridge - Learn From Expert Tutors',
  description:
    'SkillBridge connects students with expert tutors for instant booking and personalized learning sessions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <GlobalChatbot />
        </ThemeProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
