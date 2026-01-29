import Link from 'next/link';
import {
  Users,
  GraduationCap,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  Video,
  Calendar,
  Shield,
} from 'lucide-react';

import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-20">
      {/* Hero Section - Smaller */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent mb-4">
              Your Bridge to Expert Learning
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Connecting students with world-class tutors for instant booking and personalized learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/tutors"
                className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                Find Tutor
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/tutor/register"
                className="inline-flex items-center gap-2 border border-border bg-background px-6 py-3 rounded-xl font-semibold hover:bg-accent transition-all duration-200"
              >
                Become Tutor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Smaller Cards */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2 p-6 bg-background/50 backdrop-blur-sm rounded-2xl border">
              <div className="text-2xl font-bold text-primary flex items-center gap-2">
                <Users className="w-8 h-8" />
                50K+
              </div>
              <p className="text-lg font-semibold text-foreground">Happy Students</p>
              <p className="text-xs text-muted-foreground">50+ countries</p>
            </div>
            <div className="space-y-2 p-6 bg-background/50 backdrop-blur-sm rounded-2xl border">
              <div className="text-2xl font-bold text-primary flex items-center gap-2">
                <GraduationCap className="w-8 h-8" />
                2K+
              </div>
              <p className="text-lg font-semibold text-foreground">Expert Tutors</p>
              <p className="text-xs text-muted-foreground">Certified pros</p>
            </div>
            <div className="space-y-2 p-6 bg-background/50 backdrop-blur-sm rounded-2xl border">
              <div className="text-2xl font-bold text-primary flex items-center gap-2">
                <Clock className="w-8 h-8" />
                24/7
              </div>
              <p className="text-lg font-semibold text-foreground">Available</p>
              <p className="text-xs text-muted-foreground">Instant booking</p>
            </div>
            <div className="space-y-2 p-6 bg-background/50 backdrop-blur-sm rounded-2xl border">
              <div className="text-2xl font-bold text-primary flex items-center gap-2">
                <Star className="w-8 h-8" />
                4.9
              </div>
              <p className="text-lg font-semibold text-foreground">Rating</p>
              <p className="text-xs text-muted-foreground">5K+ reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - Minimal */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold text-sm w-fit">
                <Shield className="w-4 h-4" />
                Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Democratizing world-class education
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>Every student deserves exceptional tutors. We connect learners with verified experts instantly.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 bg-background/50 rounded-xl border hover:shadow-md transition-all">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">Verified Tutors</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-background/50 rounded-xl border hover:shadow-md transition-all">
                  <Video className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">Live Sessions</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-[280px]">
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm rounded-2xl p-6 border flex flex-col justify-end">
                <Calendar className="w-10 h-10 text-primary mb-3" />
                <h3 className="font-bold text-lg mb-1">Instant Booking</h3>
                <p className="text-sm text-muted-foreground">Schedule in seconds</p>
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm rounded-2xl p-6 border flex flex-col justify-end">
                <Users className="w-10 h-10 text-primary mb-3" />
                <h3 className="font-bold text-lg mb-1">1-on-1 Learning</h3>
                <p className="text-sm text-muted-foreground">Personal attention</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Minimal */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Ready to start learning?
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/tutors" className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all w-full sm:w-auto">
                Browse Tutors
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
              </Link>
              <Link href="/tutor/register" className="inline-flex items-center gap-2 border border-border bg-background px-6 py-3 rounded-xl font-semibold hover:bg-accent transition-all w-full sm:w-auto">
                Teach Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
