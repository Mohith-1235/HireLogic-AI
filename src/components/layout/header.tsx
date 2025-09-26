
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';
import { LoginModal } from '@/components/modals/login-modal';
import { SignupModal } from '@/components/modals/signup-modal';
import { Separator } from '../ui/separator';
import { useUser } from '@/firebase';
import { signOutUser } from '@/firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Skeleton } from '../ui/skeleton';
import { ThemeToggle } from '../theme-toggle';

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path d="M10.5 13.5C12.9853 13.5 15 11.4853 15 9C15 6.51472 12.9853 4.5 10.5 4.5C8.01472 4.5 6 6.51472 6 9C6 10.0577 6.35373 11.0255 6.93888 11.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M19 19L14.65 14.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.5 13.5C8.01472 13.5 6 15.5147 6 18C6 19.0577 6.35373 20.0255 6.93888 20.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10.5 4.5C12.9853 4.5 15 2.48528 15 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10.5 24C12.9853 24 15 21.9853 15 19.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <span className="font-bold text-lg">HireLogic-AI</span>
    </div>
  );
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isUserLoading } = useUser();

  const navItems = [
    { name: 'About Us', href: '#about-us' },
    { name: 'Contact', href: '#contact' },
  ];
  
  if (user) {
    navItems.push({ name: 'Dashboard', href: '/dashboard' });
    navItems.push({ name: 'Certifications', href: '/dashboard/certifications' });
  }

  const UserMenu = () => {
    if (isUserLoading) {
      return <Skeleton className="h-8 w-8 rounded-full" />;
    }

    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                <AvatarFallback>{user.displayName?.charAt(0) || user.email?.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.displayName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOutUser()}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <div className="hidden md:flex md:items-center md:space-x-2">
        <LoginModal />
        <SignupModal />
      </div>
    );
  };
  
  const MobileUserMenu = () => {
     if (isUserLoading) {
      return (
        <div className="flex items-center gap-2 p-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className='space-y-2'>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      );
    }

    if (user) {
      return (
        <div className="flex flex-col space-y-2 p-4">
           <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
              <AvatarFallback>{user.displayName?.charAt(0) || user.email?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{user.displayName}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
           </div>
          <Button variant="secondary" onClick={() => { signOutUser(); setIsMobileMenuOpen(false); }}>Log out</Button>
        </div>
      )
    }

    return (
       <div className="flex flex-col space-y-2 p-4">
          <LoginModal afterOpen={() => setIsMobileMenuOpen(false)} isMobile={true} />
          <SignupModal afterOpen={() => setIsMobileMenuOpen(false)} isMobile={true} />
        </div>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
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
          <ThemeToggle />
          <UserMenu />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                <div className="p-4">
                  <Link href="/" className="font-bold text-lg" onClick={() => setIsMobileMenuOpen(false)}>
                    <Logo />
                  </Link>
                </div>
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                <Separator />
                <nav className="flex flex-col space-y-2 p-4">
                  {navItems.map((item) => (
                      <SheetClose asChild key={item.name}>
                      <a href={item.href} className="text-lg font-medium">
                        {item.name}
                      </a>
                    </SheetClose>
                  ))}
                </nav>
                <Separator />
                <MobileUserMenu />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
