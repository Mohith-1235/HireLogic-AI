
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SecurityPage() {
  return (
    <>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Security</h1>
                <p className="text-muted-foreground">Manage your account's security settings.</p>
            </div>
        </div>
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Choose a strong password and don't reuse it for other accounts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Input id="current-password" type="password" placeholder="Current Password" />
                    </div>
                    <div className="space-y-2">
                        <Input id="new-password" type="password" placeholder="New Password" />
                    </div>
                    <div className="space-y-2">
                        <Input id="confirm-password" type="password" placeholder="Confirm New Password" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Change Password</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>Add an extra layer of security to your account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Two-factor authentication is not enabled.</p>
                </CardContent>
                <CardFooter>
                    <Button>Enable 2FA</Button>
                </CardFooter>
            </Card>
        </div>
    </>
  );
}
