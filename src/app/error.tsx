'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="text-center space-y-3">
          <div className="flex justify-center">
            <AlertTriangle className="w-14 h-14 text-destructive" />
          </div>

          <CardTitle className="text-2xl">Something went wrong</CardTitle>
          <CardDescription>
            An unexpected error occurred while processing your request.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Development Error Info */}
          {process.env.NODE_ENV === 'development' && error.message && (
            <Alert variant="destructive">
              <AlertTitle>Error Details</AlertTitle>
              <AlertDescription className="space-y-2 text-xs font-mono wrap-break-words">
                <p>{error.message}</p>
                {error.digest && <p>Digest: {error.digest}</p>}
              </AlertDescription>
            </Alert>
          )}

          <Separator />

          {/* Actions */}
          <div className="space-y-3">
            <Button onClick={reset} className="w-full flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Try Again
            </Button>

            <Link href="/" className="block">
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Go Home
              </Button>
            </Link>
          </div>

          {/* Footer */}
          <p className="text-xs text-muted-foreground text-center">
            If the issue continues, please{' '}
            <Link
              href="/contact"
              className="underline text-primary hover:opacity-80"
            >
              contact support
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
