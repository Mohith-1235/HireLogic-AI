import { generateInitialHomepageContent } from "@/ai/flows/generate-initial-homepage-content";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export default async function Home() {
  const content = await generateInitialHomepageContent({
    prompt:
      "HireLogic-AI is a recruiting startup that uses AI for candidate screening and matching to streamline the hiring process.",
  });

  const heroImage = PlaceHolderImages.find(p => p.id === "hero-background");
  const missionImage = PlaceHolderImages.find(p => p.id === "about-mission");
  const aiImage = PlaceHolderImages.find(p => p.id === "about-ai-screening");
  const trustedImage = PlaceHolderImages.find(p => p.id === "about-trusted-hiring");

  const aboutItems = [
    {
      image: missionImage,
      title: "Our Mission",
      description: content.aboutUsMission,
    },
    {
      image: aiImage,
      title: "AI-Driven Screening",
      description: content.aboutUsScreening,
    },
    {
      image: trustedImage,
      title: "Trusted Hiring",
      description: content.aboutUsHiring,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative w-full py-24 lg:py-40">
           {heroImage && <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover -z-10 opacity-20"
           />}
           <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--muted)),transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          <div className="container relative flex max-w-[64rem] flex-col items-center gap-6 text-center">
            <h1 className="font-headline text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up">
              {content.headline}
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 animate-fade-in-up [animation-delay:200ms]">
              {content.subtext}
            </p>
            <div className="flex gap-4 animate-fade-in-up [animation-delay:400ms]">
              <Button asChild size="lg">
                <a href="#contact">Get Started</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </section>

        <section id="about-us" className="w-full bg-secondary/50 py-12 md:py-24 lg:py-32">
          <div className="container">
            <div className="mx-auto mb-12 flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="font-headline text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
                Revolutionizing Recruitment
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                We blend cutting-edge AI with a commitment to human-centric hiring, creating a seamless and effective process for finding top talent.
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
              {aboutItems.map((item, index) => (
                <div key={item.title} className="animate-fade-in-up" style={{animationDelay: `${index * 150}ms`}}>
                    <Card className="bg-background overflow-hidden h-full">
                    {item.image && (
                        <div className="relative h-48 w-full">
                            <Image
                                src={item.image.imageUrl}
                                alt={item.image.description}
                                data-ai-hint={item.image.imageHint}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                    </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
             <h2 className="font-headline text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">Contact Us</h2>
             <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Have questions or want to get started? We'd love to hear from you.
             </p>
          </div>
          <div className="mx-auto mt-12 max-w-xl">
            <ContactForm />
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
