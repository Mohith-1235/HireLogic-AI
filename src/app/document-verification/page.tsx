import { DocumentVerification } from "@/components/document-verification";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function DocumentVerificationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <DocumentVerification />
      </main>
      <Footer />
    </div>
  );
}
