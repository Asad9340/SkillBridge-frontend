import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import SkillBridgeLogo from '../ui/SkillBridgeLogo';

const Footer = () => {
  return (
    <footer className="bg-background/95 backdrop-blur-lg border-t">
      <div className="container mx-auto px-6 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <SkillBridgeLogo textSize="md" className="mb-1" />
            <p className="text-sm text-muted-foreground">
              Connect with expert tutors instantly
            </p>
            <div className="flex gap-2">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <span>Platform</span>
            </h4>
            <div className="space-y-3 text-sm">
              <Link
                href="/"
                className="block text-muted-foreground hover:text-foreground transition-colors group"
              >
                <span className="group-hover:-translate-x-1 transition-transform duration-200">
                  Home
                </span>
              </Link>
              <Link
                href="/about"
                className="block text-muted-foreground hover:text-foreground transition-colors group"
              >
                <span className="group-hover:-translate-x-1 transition-transform duration-200">
                  About
                </span>
              </Link>
              <Link
                href="/blog"
                className="block text-muted-foreground hover:text-foreground transition-colors group"
              >
                <span className="group-hover:-translate-x-1 transition-transform duration-200">
                  Blog
                </span>
              </Link>
              <Link
                href="/support"
                className="block text-muted-foreground hover:text-foreground transition-colors group"
              >
                <span className="group-hover:-translate-x-1 transition-transform duration-200">
                  Support
                </span>
              </Link>
              <Link
                href="/tutors"
                className="block text-muted-foreground hover:text-foreground transition-colors group"
              >
                <span className="group-hover:-translate-x-1 transition-transform duration-200">
                  Find Tutors
                </span>
              </Link>
              <Link
                href="/contact"
                className="block text-muted-foreground hover:text-foreground transition-colors group"
              >
                <span className="group-hover:-translate-x-1 transition-transform duration-200">
                  Contact
                </span>
              </Link>
            </div>
          </div>

          {/* Tutor Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <span>Tutors</span>
            </h4>
            <div className="space-y-3 text-sm">
              <Link
                href="/join-as-tutor"
                className="block text-muted-foreground hover:text-foreground transition-colors group"
              >
                <span className="group-hover:-translate-x-1 transition-transform duration-200">
                  Join as Tutor
                </span>
              </Link>
              <Link
                href="/dashboard"
                className="block text-muted-foreground hover:text-foreground transition-colors group"
              >
                <span className="group-hover:-translate-x-1 transition-transform duration-200">
                  Dashboard
                </span>
              </Link>
              <Link
                href="/dashboard/manage-availability"
                className="block text-muted-foreground hover:text-foreground transition-colors group"
              >
                <span className="group-hover:-translate-x-1 transition-transform duration-200">
                  Schedule
                </span>
              </Link>
              <Link
                href="/dashboard/my-bookings"
                className="block text-muted-foreground hover:text-foreground transition-colors group"
              >
                <span className="group-hover:-translate-x-1 transition-transform duration-200">
                  My Bookings
                </span>
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Get in touch</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <Mail className="w-5 h-5 mt-0.5 text-primary shrink-0" />
                <span className="text-muted-foreground">
                  asadulimran1999@gmail.com
                </span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <Phone className="w-5 h-5 mt-0.5 text-primary shrink-0" />
                <span className="text-muted-foreground">01710101984</span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <MapPin className="w-5 h-5 mt-0.5 text-primary shrink-0" />
                <span className="text-muted-foreground max-w-50">
                  123 Learning Street, Education City, EDU 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-muted-foreground">
            <p>© 2026 SkillBridge. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/support"
                className="hover:text-foreground transition-colors"
              >
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
