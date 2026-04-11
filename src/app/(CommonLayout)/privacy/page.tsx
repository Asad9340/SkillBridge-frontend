import { LockKeyhole, Database, ShieldCheck } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-20">
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <LockKeyhole className="h-4 w-4" />
            Privacy Policy
          </div>
          <h1 className="mt-5 text-4xl font-bold md:text-5xl">
            Your Data, Protected
          </h1>
          <p className="mt-4 max-w-3xl text-muted-foreground md:text-lg">
            This page explains what information SkillBridge collects, how it is
            used, and the controls available to you.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="container mx-auto max-w-5xl space-y-5">
          <article className="rounded-2xl border bg-background/70 p-6 backdrop-blur-sm">
            <div className="mb-2 flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Information We Collect</h2>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              We collect account information (name, email, role profile),
              session activity, and booking-related details required to operate
              the platform and provide tutoring services.
            </p>
          </article>

          <article className="rounded-2xl border bg-background/70 p-6 backdrop-blur-sm">
            <div className="mb-2 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">How We Use Data</h2>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Data is used for account authentication, booking management,
              platform analytics, role-based dashboard functionality, and
              support operations. We do not sell your personal data.
            </p>
          </article>

          <article className="rounded-2xl border bg-background/70 p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold">Your Controls</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              You can update profile information from your dashboard and request
              support for account-related privacy actions. If you need
              assistance, contact us through the support or contact page.
            </p>
          </article>

          <p className="pt-2 text-xs text-muted-foreground">
            Last updated: April 11, 2026
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
