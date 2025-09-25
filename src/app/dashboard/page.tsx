'use client';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { useEffect, useState } from 'react';

type DocumentStatus = 'Not Uploaded' | 'Ready to Verify' | 'Verifying...' | 'Genuine' | 'Fraud' | 'Error';
interface DocumentState {
  id: string;
  title: string;
  mandatory: boolean;
  status: DocumentStatus;
}
const mandatoryDocIds = ['tenth', 'twelfth', 'degree'];


export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const codingImage = PlaceHolderImages.find(p => p.id === 'document-verification-image');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // If user is not logged in and we're done loading, redirect to home
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    // This effect runs only on the client side
    try {
      const savedState = localStorage.getItem('hirelogic_doc_verification_state');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        const savedDocs: DocumentState[] = parsedState.documents || [];
        
        const allMandatoryVerified = mandatoryDocIds.every(id => {
            const doc = savedDocs.find(d => d.id === id);
            return doc?.status === 'Genuine';
        });

        setIsVerified(allMandatoryVerified);
      }
    } catch (e) {
      console.error("Failed to read verification state from localStorage", e);
    }
  }, []);

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
                {isVerified 
                    ? "Your documents have been successfully verified."
                    : "Ready to get started? Let's verify your documents to complete your profile."
                }
            </p>
        </div>
        <Button asChild={!isVerified} size="lg" disabled={isVerified}>
            {isVerified ? (
                <span>You're Verified</span>
            ) : (
                <Link href="/document-verification">Start Verification</Link>
            )}
        </Button>
      </div>
    </div>
  );
}
