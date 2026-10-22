import { Phone, MapPin, Globe, MessageCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact Us",
  description:
    "Contact RISE to ask questions, request support, discuss partnerships, volunteer, donate, or get involved with community programs.",
  path: "/contact",
  keywords: ["contact RISE", "nonprofit partnership", "community support contact"],
});

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      {/* Hero Section */}
      <section
        className="relative w-full bg-primary-900 pt-24 pb-32 overflow-hidden"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=2000&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-primary-900/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-primary/20" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8 mt-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-sm text-sm font-medium">
            <MessageCircle size={16} className="text-accent" />
            <span>We&apos;d love to hear from you</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-[1.15] text-balance">
            Let&apos;s build a stronger <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">community together.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Have questions, want to partner, need support, or looking to get involved? The RISE team is here and ready to help.
          </p>
        </div>
      </section>

      <section id="contact-form" className="py-12 md:py-24 bg-background relative -mt-10 min-h-[calc(100vh-80px)] flex items-center scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="bg-background rounded-3xl shadow-2xl shadow-primary/5 border border-border p-6 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

              {/* Left Column: Contact Info */}
              <div className="lg:col-span-5 space-y-10">
                <div>
                  <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Get in Touch</h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Whether you&apos;re looking for assistance or offering to help, we are always open to connecting with neighbors and partners.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="group flex items-start gap-5 p-6 bg-muted rounded-2xl border border-border hover:bg-primary/5 hover:border-primary/20 transition-all duration-300">
                    <div className="bg-background shadow-sm p-4 rounded-xl text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 text-lg">Call Us</h4>
                      <a href="tel:9725233544" className="text-muted-foreground hover:text-primary transition-colors font-medium">(972) 523-3544</a>
                      <p className="text-sm text-muted-foreground mt-1">Mon-Fri, 9am - 5pm CST</p>
                    </div>
                  </div>

                  <div className="group flex items-start gap-5 p-6 bg-muted rounded-2xl border border-border hover:bg-primary/5 hover:border-primary/20 transition-all duration-300">
                    <div className="bg-background shadow-sm p-4 rounded-xl text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Globe size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 text-lg">Online</h4>
                      <a href="https://riseandserve.org" className="text-muted-foreground hover:text-primary transition-colors font-medium">riseandserve.org</a>
                    </div>
                  </div>

                  <div className="group flex items-start gap-5 p-6 bg-muted rounded-2xl border border-border hover:bg-primary/5 hover:border-primary/20 transition-all duration-300">
                    <div className="bg-background shadow-sm p-4 rounded-xl text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 text-lg">Headquarters</h4>
                      <p className="text-muted-foreground font-medium">539 W Commerce St<br/>Suite 6954<br/>Dallas, Texas 75208</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="lg:col-span-7">
                <div className="bg-muted p-8 md:p-12 rounded-3xl border border-border h-full flex flex-col justify-center">
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-8">Send a Message</h3>

                  <ContactForm />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
