
'use client';

export default function CertificationsPage() {
  return (
    <>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">certification you completed</h1>
                <p className="text-muted-foreground">Manage your external skill certifications.</p>
            </div>
        </div>
        <div className="flex flex-col justify-center items-center py-8">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h2 className="text-2xl font-semibold leading-none tracking-tight">Google UX Design</h2>
            </div>
        </div>
    </>
  );
}
