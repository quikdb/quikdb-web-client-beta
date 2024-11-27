import { createMetadata } from '@repo/design-system/lib/metadata';
import type { Metadata } from 'next';

const title = 'Create an account';
const description = 'Enter your details to get started.';

export const metadata: Metadata = createMetadata({ title, description });

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
