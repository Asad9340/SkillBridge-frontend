import { cn } from '@/lib/utils';
import Link from 'next/link';

interface SkillBridgeLogoProps {
  className?: string;
  textSize?: 'sm' | 'md' | 'lg';
  href?: string;
}

const SkillBridgeLogo = ({
  className,
  textSize = 'md',
  href = '/',
}: SkillBridgeLogoProps) => {
  const textSizeClass = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }[textSize];

  const content = (
    <span className={cn('flex items-center gap-2 font-bold', className)}>
      {/* SVG Icon: graduation cap over an arc (bridge) */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Bridge arc */}
        <path
          d="M4 24 Q8 14 16 14 Q24 14 28 24"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          className="text-primary"
        />
        {/* Bridge pillars */}
        <line
          x1="10"
          y1="24"
          x2="10"
          y2="18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-primary"
        />
        <line
          x1="22"
          y1="24"
          x2="22"
          y2="18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-primary"
        />
        {/* Graduation cap base */}
        <polygon
          points="16,6 24,10 16,14 8,10"
          fill="currentColor"
          className="text-primary"
        />
        {/* Cap top */}
        <line
          x1="16"
          y1="6"
          x2="16"
          y2="3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-primary"
        />
        <circle
          cx="16"
          cy="2.5"
          r="1.5"
          fill="currentColor"
          className="text-primary"
        />
      </svg>

      <span className={cn('tracking-tight', textSizeClass)}>
        <span className="text-primary">Skill</span>
        <span className="text-foreground">Bridge</span>
      </span>
    </span>
  );

  return href ? <Link href={href}>{content}</Link> : content;
};

export default SkillBridgeLogo;
