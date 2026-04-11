import { FileText, Users, Scale } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-20">
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <FileText className="h-4 w-4" />
            Terms of Service
          </div>
          <h1 className="mt-5 text-4xl font-bold md:text-5xl">
            Platform Usage Terms
          </h1>
          <p className="mt-4 max-w-3xl text-muted-foreground md:text-lg">
            These terms define the responsibilities and expectations for
            students, tutors, and admin users on SkillBridge.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="container mx-auto max-w-5xl space-y-5">
          <article className="rounded-2xl border bg-background/70 p-6 backdrop-blur-sm">
            <div className="mb-2 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Accounts and Roles</h2>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Users must provide accurate profile details. Role-based access is
              enforced by system policies, and misuse of elevated permissions
              may result in suspension.
            </p>
          </article>

          <article className="rounded-2xl border bg-background/70 p-6 backdrop-blur-sm">
            <div className="mb-2 flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Acceptable Use</h2>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              You agree not to submit fraudulent bookings, abuse communication
              channels, or disrupt platform services. We reserve the right to
              moderate and remove harmful activity.
            </p>
          </article>

          <article className="rounded-2xl border bg-background/70 p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold">Service Availability</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              SkillBridge continuously improves platform reliability, but uptime
              is not guaranteed. Planned maintenance and emergency updates may
              temporarily impact service availability.
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

export default TermsPage;
