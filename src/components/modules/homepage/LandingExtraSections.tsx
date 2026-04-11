import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Briefcase,
  CalendarCheck,
  CircleHelp,
  Clock3,
  GraduationCap,
  Mail,
  Megaphone,
  Rocket,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';

const categories = [
  'Mathematics',
  'Science',
  'English',
  'Programming',
  'Design',
  'Business',
  'Test Prep',
  'Languages',
];

const services = [
  {
    title: 'One-on-One Sessions',
    description: 'Personalized tutoring focused on your exact learning goals.',
    icon: Users,
  },
  {
    title: 'Exam Preparation',
    description:
      'Structured plans for board exams, admission tests, and finals.',
    icon: GraduationCap,
  },
  {
    title: 'Skill Building',
    description: 'Career-oriented lessons in coding, communication, and more.',
    icon: Briefcase,
  },
  {
    title: 'Flexible Scheduling',
    description: 'Book sessions around your class schedule and daily routine.',
    icon: CalendarCheck,
  },
];

const highlights = [
  'Verified tutor profiles and transparent ratings',
  'Instant booking with real-time availability',
  'Secure payment and smooth session management',
  'Progress-driven learning with clear milestones',
];

const offers = [
  {
    title: 'New Student Starter',
    detail: 'Get your first trial session at a reduced rate.',
  },
  {
    title: 'Weekly Study Pack',
    detail: 'Book 4 sessions together and unlock bundled pricing.',
  },
  {
    title: 'Referral Bonus',
    detail: 'Invite a friend and both receive learning credits.',
  },
];

const stats = [
  { label: 'Active Tutors', value: '1,200+' },
  { label: 'Subjects Covered', value: '85+' },
  { label: 'Sessions Booked', value: '50,000+' },
  { label: 'Average Rating', value: '4.9/5' },
];

const blogs = [
  {
    title: 'How To Choose The Right Tutor In 10 Minutes',
    tag: 'Guides',
  },
  {
    title: 'Study Plans That Actually Work For Busy Students',
    tag: 'Productivity',
  },
  {
    title: 'Top 7 Mistakes Students Make Before Exams',
    tag: 'Exam Tips',
  },
];

const faqs = [
  {
    q: 'How quickly can I book a tutor?',
    a: 'You can book instantly whenever a tutor has available slots.',
  },
  {
    q: 'Can I switch tutors later?',
    a: 'Yes, you can explore and switch tutors based on your preferences.',
  },
  {
    q: 'Do tutors set their own rates?',
    a: 'Yes. Each tutor profile clearly displays pricing and session details.',
  },
];

const LandingExtraSections = () => {
  return (
    <>
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-3xl font-bold">Popular Categories</h2>
          <p className="mb-8 text-muted-foreground">
            Explore top learning categories tailored for students and
            professionals.
          </p>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <Badge
                key={category}
                variant="secondary"
                className="px-4 py-2 text-sm"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-3xl font-bold">Services We Offer</h2>
          <p className="mb-8 text-muted-foreground">
            End-to-end support for personalized, flexible, and outcome-focused
            learning.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(service => (
              <article
                key={service.title}
                className="rounded-xl border bg-background p-5 shadow-sm"
              >
                <service.icon className="mb-3 h-5 w-5 text-primary" />
                <h3 className="mb-2 font-semibold">{service.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-3xl font-bold">Platform Highlights</h2>
          <p className="mb-8 text-muted-foreground">
            Built to simplify the entire tutor-student journey from discovery to
            progress.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {highlights.map(item => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl border p-4"
              >
                <Star className="mt-0.5 h-5 w-5 text-primary" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-3xl font-bold">Special Offers</h2>
          <p className="mb-8 text-muted-foreground">
            Save more while learning consistently and reaching your study goals.
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {offers.map(offer => (
              <article
                key={offer.title}
                className="rounded-xl border bg-background p-5 shadow-sm"
              >
                <Megaphone className="mb-3 h-5 w-5 text-primary" />
                <h3 className="mb-2 font-semibold">{offer.title}</h3>
                <p className="text-sm text-muted-foreground">{offer.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-3xl font-bold">SkillBridge In Numbers</h2>
          <p className="mb-8 text-muted-foreground">
            Real momentum from a growing learning community.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(stat => (
              <article
                key={stat.label}
                className="rounded-xl border p-6 text-center"
              >
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-3xl font-bold">From Our Blog</h2>
          <p className="mb-8 text-muted-foreground">
            Practical tips for students, parents, and tutors.
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {blogs.map(blog => (
              <article
                key={blog.title}
                className="rounded-xl border bg-background p-5 shadow-sm"
              >
                <Badge variant="outline" className="mb-3">
                  {blog.tag}
                </Badge>
                <h3 className="font-semibold">{blog.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl rounded-2xl border bg-background p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="mb-3 text-3xl font-bold">Newsletter</h2>
              <p className="text-muted-foreground">
                Get weekly tutor recommendations, study resources, and platform
                updates.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-10 min-w-60 rounded-md border bg-background px-3 text-sm"
              />
              <Button className="h-10">
                <Mail className="mr-2 h-4 w-4" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-3xl font-bold">
            Frequently Asked Questions
          </h2>
          <p className="mb-8 text-muted-foreground">
            Answers to common questions from new learners and tutors.
          </p>
          <div className="grid gap-4">
            {faqs.map(item => (
              <article
                key={item.q}
                className="rounded-xl border bg-background p-5"
              >
                <div className="mb-2 flex items-start gap-2 font-semibold">
                  <CircleHelp className="mt-0.5 h-5 w-5 text-primary" />
                  <h3>{item.q}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingExtraSections;
