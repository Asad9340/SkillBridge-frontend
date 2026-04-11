'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Bookmark, ExternalLink, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface TutorDetailsActionsProps {
  tutorId: string;
  tutorName: string;
  hasAvailableSlot: boolean;
  isLoggedIn: boolean;
  userRole: string;
}

const WISHLIST_KEY = 'skillbridge:wishlistTutors';

const TutorDetailsActions = ({
  tutorId,
  tutorName,
  hasAvailableSlot,
  isLoggedIn,
  userRole,
}: TutorDetailsActionsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const raw = localStorage.getItem(WISHLIST_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    setIsWishlisted(list.includes(tutorId));
  }, [tutorId]);

  const profileUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return `${window.location.origin}${pathname}`;
  }, [pathname]);

  const toggleWishlist = () => {
    if (typeof window === 'undefined') return;

    const raw = localStorage.getItem(WISHLIST_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];

    const updated = list.includes(tutorId)
      ? list.filter(id => id !== tutorId)
      : [...list, tutorId];

    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
    const nowWishlisted = updated.includes(tutorId);
    setIsWishlisted(nowWishlisted);

    toast.success(
      nowWishlisted
        ? `${tutorName} added to wishlist`
        : `${tutorName} removed from wishlist`,
    );
  };

  const handleShare = async () => {
    try {
      if (!profileUrl) return;

      if (navigator.share) {
        await navigator.share({
          title: `${tutorName} on SkillBridge`,
          text: 'Check out this tutor profile on SkillBridge',
          url: profileUrl,
        });
        return;
      }

      await navigator.clipboard.writeText(profileUrl);
      toast.success('Profile link copied to clipboard');
    } catch {
      toast.error('Unable to share right now.');
    }
  };

  const handleBookNow = () => {
    if (!isLoggedIn) {
      router.push(`/login?redirect=${encodeURIComponent(pathname || '/')}`);
      return;
    }

    const slotsSection = document.getElementById('available-slots');
    if (slotsSection) {
      slotsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="rounded-2xl border bg-background p-5 md:p-6">
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleBookNow} disabled={!hasAvailableSlot}>
          {hasAvailableSlot ? 'Book Session' : 'No Slots Available'}
        </Button>

        {userRole !== 'TUTOR' && (
          <Button variant="secondary" asChild>
            <Link href="/join-as-tutor">
              <ExternalLink className="mr-2 h-4 w-4" />
              Join as Tutor
            </Link>
          </Button>
        )}

        <Button variant="outline" onClick={toggleWishlist}>
          <Bookmark className="mr-2 h-4 w-4" />
          {isWishlisted ? 'Saved' : 'Save to Wishlist'}
        </Button>

        <Button variant="outline" onClick={handleShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Share Profile
        </Button>
      </div>
    </section>
  );
};

export default TutorDetailsActions;
