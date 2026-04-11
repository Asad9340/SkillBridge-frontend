import { VerifyEmailForm } from '@/components/modules/authentication/verify-email-form';

interface VerifyEmailPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const resolvedSearchParams = await searchParams;
  const emailParam = resolvedSearchParams?.email;
  const initialEmail = Array.isArray(emailParam) ? emailParam[0] : emailParam;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <VerifyEmailForm initialEmail={initialEmail} />
      </div>
    </div>
  );
}
