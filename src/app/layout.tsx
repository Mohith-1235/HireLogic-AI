import type {Metadata} from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from "@/components/ui/toaster"
import { FirebaseClientProvider } from '@/firebase/client-provider';

export const metadata: Metadata = {
  title: 'HireLogic-AI',
  description: 'AI-powered hiring and candidate matching.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <ThemeProvider
            defaultTheme="system"
            storageKey="hirelogic-theme"
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
