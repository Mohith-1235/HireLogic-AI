
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/firebase';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const passwordSchema = z.object({
  currentPassword: z.string().min(1, { message: "Current password is required." }),
  newPassword: z.string().min(8, { message: "New password must be at least 8 characters." }),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});

type PasswordSchema = z.infer<typeof passwordSchema>;

export default function SecurityPage() {
    const auth = useAuth();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<PasswordSchema>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: PasswordSchema) => {
        setIsSubmitting(true);
        const user = auth.currentUser;

        if (!user || !user.email) {
            toast({ variant: 'destructive', title: 'Error', description: 'User not found.' });
            setIsSubmitting(false);
            return;
        }

        const credential = EmailAuthProvider.credential(user.email, data.currentPassword);

        try {
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, data.newPassword);
            toast({ title: 'Success', description: 'Your password has been changed.' });
            form.reset();
        } catch (error: any) {
            let description = 'An unexpected error occurred.';
            if (error.code === 'auth/wrong-password') {
                description = 'The current password you entered is incorrect.';
            } else if (error.code === 'auth/too-many-requests') {
                description = 'Too many attempts. Please try again later.';
            }
            toast({ variant: 'destructive', title: 'Error', description });
        } finally {
            setIsSubmitting(false);
        }
    };

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
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardHeader>
                            <CardTitle>Change Password</CardTitle>
                            <CardDescription>Choose a strong password and don't reuse it for other accounts.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm New Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Changing Password...' : 'Change Password'}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
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
