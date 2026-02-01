import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-sm shadow-lg rounded-2xl">
        <CardContent className="flex flex-col items-center justify-center py-10 space-y-6">
          <div className="relative flex items-center justify-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold">Loading</h2>
            <p className="text-sm text-muted-foreground">
              Please wait while we prepare your content
            </p>
          </div>

          <Progress value={70} className="w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
