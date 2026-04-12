import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
  MailOpen,
  Clock,
  ArrowRight,
} from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-20">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent mb-4">
              Get In Touch
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Ready to start your learning journey? Contact us for support,
              partnerships, or tutor inquiries.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/tutors"
                className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Find Tutor Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Email */}
            <div className="group bg-background/50 backdrop-blur-sm rounded-2xl p-8 border hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-foreground">
                Email Us
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Fastest response time
              </p>
              <a
                href="mailto:asadulimran1999@gmail.com"
                className="font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                asadulimran1999@gmail.com
              </a>
            </div>

            {/* Phone */}
            <div className="group bg-background/50 backdrop-blur-sm rounded-2xl p-8 border hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-foreground">
                Call Us
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Mon-Fri 9AM-6PM
              </p>
              <a
                href="tel:+8801710101984"
                className="font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                01710101984
              </a>
            </div>

            {/* Location */}
            <div className="group bg-background/50 backdrop-blur-sm rounded-2xl p-8 border hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-foreground">
                Visit Us
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Learning Street HQ
              </p>
              <div className="font-semibold text-foreground text-sm leading-tight">
                123 Learning St
                <br />
                Education City, EDU 12345
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Form Info */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold text-sm w-fit">
                <Clock className="w-4 h-4" />
                Response within 24 hours
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Send us a message
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Have questions about our platform, tutor opportunities, or
                  need help getting started?
                </p>
                <p>Our team responds to all inquiries within 24 hours.</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-3 p-3 bg-background rounded-xl border">
                  <MailOpen className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">Email Support</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background rounded-xl border">
                  <Send className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">Contact Form</span>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-background/50 backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-background/50 backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <textarea
                    rows={4}
                    placeholder="Tell us about your inquiry..."
                    className="w-full pl-10 pt-8 pr-4 py-3 border border-border rounded-xl bg-background/50 backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-vertical"
                  />
                </div>
              </div>

              <button className="group w-full bg-primary text-primary-foreground py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                Send Message
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 px-6 border-t border-border">
        <div className="container mx-auto text-center">
          <div className="max-w-md mx-auto space-y-4">
            <h3 className="text-xl font-bold text-foreground">
              Need help immediately?
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Link
                href="/tutors"
                className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-semibold hover:shadow-md transition-all w-full sm:w-auto"
              >
                Browse Tutors
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/support"
                className="inline-flex items-center gap-2 border border-border bg-background px-6 py-2.5 rounded-xl font-semibold hover:bg-accent transition-all w-full sm:w-auto"
              >
                View Help Center
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
