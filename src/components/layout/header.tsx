"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle';
import { LoginModal } from '@/components/modals/login-modal';
import { SignupModal } from '@/components/modals/signup-modal';
import { Separator } from '../ui/separator';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  const navItems = [
    { name: 'About Us', href: '#about-us' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-lg">HireLogic-AI</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                {item.name}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {isClient && (
            <>
              <div className="hidden md:flex md:items-center md:space-x-2">
                <LoginModal />
                <SignupModal />
              </div>
              <ThemeToggle />
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon" aria-label="Open menu">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <div className="p-4">
                      <Link href="/" className="font-bold text-lg" onClick={() => setIsMobileMenuOpen(false)}>
                        HireLogic-AI
                      </Link>
                    </div>
                    <Separator />
                    <nav className="flex flex-col space-y-2 p-4">
                      {navItems.map((item) => (
                        <a key={item.name} href={item.href} className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                          {item.name}
                        </a>
                      ))}
                    </nav>
                    <Separator />
                    <div className="flex flex-col space-y-2 p-4">
                      <LoginModal afterOpen={() => setIsMobileMenuOpen(false)} isMobile={true} />
                      <SignupModal afterOpen={() => setIsMobileMenuOpen(false)} isMobile={true} />
                    </div>
                </SheetContent>
              </Sheet>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
