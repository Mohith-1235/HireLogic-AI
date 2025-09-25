import { generateInitialHomepageContent } from "@/ai/flows/generate-initial-homepage-content";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu, ShieldCheck, Target } from "lucide-react";

export default async function Home() {
  const content = await generateInitialHomepageContent({
    prompt:
      "HireLogic-AI is a recruiting startup that uses AI for candidate screening and matching to streamline the hiring process.",
  });

  const aboutItems = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Our Mission",
      description: content.aboutUsMission,
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "AI-Driven Screening",
      description: content.aboutUsScreening,
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "Trusted Hiring",
      description: content.aboutUsHiring,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative w-full py-24 lg:py-40">
           <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--muted)),transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          <div className="container relative flex max-w-[64rem] flex-col items-center gap-6 text-center">
            <h1 className="font-headline text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
              {content.headline}
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              {content.subtext}
            </p>
            <div className="flex gap-4">
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
              {aboutItems.map((item) => (
                <Card key={item.title} className="bg-background">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {item.icon}
                    <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
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
