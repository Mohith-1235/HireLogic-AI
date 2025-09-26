
'use client';

import { ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function CertificationsPage() {
  return (
    <>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">certification you completed</h1>
                <p className="text-muted-foreground">Manage your external skill certifications.</p>
            </div>
            <Button>Add New Certification</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Content cleared as requested */}
        </div>
    </>
  );
}
