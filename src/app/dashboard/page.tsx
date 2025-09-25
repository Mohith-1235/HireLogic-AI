'use client';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const codingImage = PlaceHolderImages.find(p => p.id === 'document-verification-image');

  useEffect(() => {
    // If user is not logged in and we're done loading, redirect to home
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  // Don't render anything until we know the user's auth state
  if (isUserLoading || !user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center p-4">
      <div className="flex flex-col items-center gap-8 max-w-md">
        {codingImage && (
          <div className="relative h-48 w-48">
            <Image
              src={codingImage.imageUrl}
              alt={codingImage.description}
              data-ai-hint={codingImage.imageHint}
              fill
              className="object-cover rounded-full shadow-lg"
            />
          </div>
        )}
        <div className="space-y-4">
            <h1 className="font-headline text-3xl font-bold sm:text-4xl">
                Welcome, {user.displayName || 'User'}!
            </h1>
            <p className="text-muted-foreground sm:text-lg">
                Ready to get started? Let's verify your documents to complete your profile.
            </p>
        </div>
        <Button asChild size="lg">
          <Link href="/document-verification">Start Verification</Link>
        </Button>
      </div>
    </div>
  );
}
