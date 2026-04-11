import Link from 'next/link';
import { ArrowRight, CalendarDays, BookOpenText, Sparkles } from 'lucide-react';

const blogPosts = [
  {
    title: 'How to Choose the Right Tutor for Your Learning Style',
    excerpt:
      'A practical framework to evaluate tutor profiles, session formats, and outcomes before booking.',
    date: 'April 08, 2026',
    readTime: '6 min read',
    tag: 'Learning Strategy',
  },
  {
    title: 'From First Session to Consistent Progress: A 4-Week Plan',
    excerpt:
      'Use this weekly structure to turn tutoring sessions into measurable academic momentum.',
    date: 'April 02, 2026',
    readTime: '8 min read',
    tag: 'Student Success',
  },
  {
    title: 'Tutor Playbook: Building Trust in Online 1-on-1 Sessions',
    excerpt:
      'Actionable communication techniques tutors can apply to improve retention and learning quality.',
    date: 'March 27, 2026',
    readTime: '7 min read',
    tag: 'Tutor Growth',
  },
];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-20">
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <BookOpenText className="h-4 w-4" />
            SkillBridge Blog
          </div>
          <h1 className="mt-5 text-4xl font-bold md:text-5xl">
            Insights for Smarter Learning
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
            Short, practical reads for students, tutors, and parents to get
            better results from every learning session.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="container mx-auto grid max-w-5xl gap-5">
          {blogPosts.map(post => (
            <article
              key={post.title}
              className="rounded-2xl border bg-background/70 p-6 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {post.date}
                </span>
                <span>{post.readTime}</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary">
                  {post.tag}
                </span>
              </div>

              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>

              <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80">
                Read article
                <ArrowRight className="h-4 w-4" />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t px-6 py-12">
        <div className="container mx-auto max-w-5xl rounded-2xl border bg-background/70 p-6 text-center">
          <div className="mb-2 inline-flex items-center gap-2 text-primary">
            <Sparkles className="h-4 w-4" />
            Weekly Learning Notes
          </div>
          <p className="text-sm text-muted-foreground">
            New practical guides are published regularly. Explore tutors and
            apply these ideas directly in your next session.
          </p>
          <Link
            href="/tutors"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-md"
          >
            Browse Tutors
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
