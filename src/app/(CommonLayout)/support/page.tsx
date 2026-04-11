import Link from 'next/link';
import {
  LifeBuoy,
  MessageCircleQuestion,
  ShieldCheck,
  ArrowRight,
  Clock,
} from 'lucide-react';

const faqs = [
  {
    q: 'How do I book a tutor session?',
    a: 'Go to the Tutors page, open a tutor profile, choose availability, and confirm your booking.',
  },
  {
    q: 'Can I reschedule a booked session?',
    a: 'Yes. Use your dashboard booking section to request an updated session slot.',
  },
  {
    q: 'How are tutors verified?',
    a: 'Tutor profiles are reviewed by role-based admins before going live on the platform.',
  },
];

const SupportPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-20">
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <LifeBuoy className="h-4 w-4" />
            Help & Support
          </div>
          <h1 className="mt-5 text-4xl font-bold md:text-5xl">
            We Are Here to Help
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
            Get quick answers, contact support, and keep your learning flow
            uninterrupted.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="container mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          <div className="rounded-2xl border bg-background/70 p-5 backdrop-blur-sm">
            <MessageCircleQuestion className="mb-3 h-6 w-6 text-primary" />
            <h2 className="font-semibold">FAQ Knowledge Base</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Fast answers for common booking, profile, and dashboard questions.
            </p>
          </div>
          <div className="rounded-2xl border bg-background/70 p-5 backdrop-blur-sm">
            <Clock className="mb-3 h-6 w-6 text-primary" />
            <h2 className="font-semibold">Response Time</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Typical support response window is within 24 business hours.
            </p>
          </div>
          <div className="rounded-2xl border bg-background/70 p-5 backdrop-blur-sm">
            <ShieldCheck className="mb-3 h-6 w-6 text-primary" />
            <h2 className="font-semibold">Account Safety</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Security and account access issues are prioritized immediately.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="container mx-auto max-w-5xl rounded-2xl border bg-background/70 p-6 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
          <div className="mt-5 space-y-4">
            {faqs.map(item => (
              <div key={item.q} className="rounded-xl border bg-muted/20 p-4">
                <h3 className="font-medium">{item.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-md"
            >
              Contact Support
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all hover:bg-accent"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;
