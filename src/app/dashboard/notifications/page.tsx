
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function NotificationsPage() {
  return (
    <>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
                <p className="text-muted-foreground">Manage your notification settings.</p>
            </div>
        </div>
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Email Notifications</CardTitle>
                    <CardDescription>Choose which email notifications you want to receive.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="job-alerts">Job Alerts</Label>
                        <Switch id="job-alerts" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="application-updates">Application Updates</Label>
                        <Switch id="application-updates" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="newsletter">Newsletter</Label>
                        <Switch id="newsletter" />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Push Notifications</CardTitle>
                    <CardDescription>Manage push notifications on your devices.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="push-job-alerts">Job Alerts</Label>
                        <Switch id="push-job-alerts" />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="push-application-updates">Application Updates</Label>
                        <Switch id="push-application-updates" defaultChecked />
                    </div>
                </CardContent>
            </Card>
        </div>
    </>
  );
}
