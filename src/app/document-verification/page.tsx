import { DocumentVerification } from "@/components/document-verification";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export default function DocumentVerificationPage() {
  const bgImage = PlaceHolderImages.find(p => p.id === 'dashboard-background');
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
       {bgImage && (
            <Image
                src={bgImage.imageUrl}
                alt={bgImage.description}
                data-ai-hint={bgImage.imageHint}
                fill
                className="object-cover -z-10 opacity-5"
            />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent -z-10"></div>
      <main className="flex-1">
        <DocumentVerification />
      </main>
    </div>
  );
}
