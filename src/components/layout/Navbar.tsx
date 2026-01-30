'use client';

import Image from 'next/image';
import { Menu, User, LogOut, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { ThemeToggle } from '../ui/theme-toggler';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export interface UserType {
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  role: string;
  phone: string;
  status: string;
  id: string;
  bio?: string;
}

interface NavbarProps {
  user: UserType | null;
}

const Navbar = ({ user, className }: NavbarProps & { className?: string }) => {
  const isLoggedIn = !!user;
  console.log(isLoggedIn);
  const menu = [
    { title: 'Home', url: '/' },
    { title: 'Tutors', url: '/tutors' },
    { title: 'About', url: '/about' },
    { title: 'Contact', url: '/contact' },
  ];

  const renderMenuItem = (item: { title: string; url: string }) => (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground"
      >
        <Link href={item.url}>{item.title}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );

  const renderMobileMenuItem = (item: { title: string; url: string }) => (
    <Link
      key={item.title}
      href={item.url}
      className="block py-3 px-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
    >
      {item.title}
    </Link>
  );

  const renderUserAvatar = (
    userImage: string | null,
    userName: string,
    size = 32,
  ) => {
    if (userImage) {
      return (
        <div
          className="relative shrink-0 overflow-hidden rounded-full"
          style={{ width: size, height: size }}
        >
          <Image
            src={userImage}
            alt={`${userName}'s profile`}
            fill
            className="object-cover"
            sizes={`${size}px`}
            unoptimized
          />
        </div>
      );
    }

    return (
      <div
        className="flex items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground min-w-[36px]"
        style={{ width: size, height: size}}
      >
        {userName.charAt(0).toUpperCase()}
      </div>
    );
  };

  const router = useRouter();
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login');
        },
      },
    });
  };

  return (
    <header
      className={cn(
        'border-b bg-background/95 backdrop-blur supports-[backdrop-filter:blur(20px)]',
        className,
      )}
    >
      <div className="container flex h-16 items-center">
        {/* Desktop */}
        <div className="hidden w-full flex-1 items-center justify-between lg:flex">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            SkillBridge
          </Link>

          <NavigationMenu className="flex">
            <NavigationMenuList>{menu.map(renderMenuItem)}</NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Profile Icon - Only if user exists */}
            {isLoggedIn && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-10 w-10 rounded-full hover:bg-accent"
                  >
                    {renderUserAvatar(user.image, user.name, 36)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80" align="end" forceMount>
                  {' '}
                  {/* Increased from w-56 to w-80 */}
                  <div className="flex items-center gap-3 p-4 border-b">
                    {' '}
                    {/* Increased padding */}
                    {renderUserAvatar(user.image, user.name, 48)}
                    <div className="space-y-1 min-w-0">
                      <p className="font-medium text-sm leading-none truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {user.role}
                      </p>
                    </div>
                  </div>
                  <div className="p-2">
                    <DropdownMenuItem asChild>
                      <Link
                        href={'/dashboard'}
                        className="flex w-full items-center gap-2"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    {user.role !== 'ADMIN' && (
                      <DropdownMenuItem asChild>
                        <Link
                          href="/profile"
                          className="flex w-full items-center gap-2"
                        >
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                  </div>
                  <DropdownMenuItem
                    className="flex items-center gap-2 border-t cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Show Login/Signup ONLY if not logged in */}
            {!isLoggedIn && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="hidden md:flex"
                >
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile */}
        <div className="flex w-full flex-1 items-center lg:hidden">
          <Link href="/" className="mr-4 text-xl font-bold tracking-tight">
            SkillBridge
          </Link>

          <div className="flex flex-1 items-center justify-end space-x-2">
            <ThemeToggle />

            {/* Mobile Profile Icon */}
            {isLoggedIn && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full"
                  >
                    {renderUserAvatar(user.image, user.name, 36)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72" align="end">
                  {' '}
                  {/* Wider mobile dropdown */}
                  <div className="flex items-center gap-3 p-3 border-b">
                    {renderUserAvatar(user.image, user.name, 44)}
                    <div className="space-y-1 min-w-0">
                      <p className="font-medium text-sm leading-none truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/dashboard?role=${user.role}`}
                      className="flex items-center gap-2 w-full"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center gap-2 w-full"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-2 w-full cursor-pointer border-t"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Show Login ONLY if not logged in (mobile) */}
            {!isLoggedIn && (
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Log In</Link>
              </Button>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="pr-0">
                <SheetHeader className="px-4 pb-4">
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 p-4">
                  <div className="flex flex-col space-y-2">
                    {menu.map(renderMobileMenuItem)}
                  </div>
                  {!isLoggedIn && (
                    <Button asChild>
                      <Link href="/register">Sign Up</Link>
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Navbar };
