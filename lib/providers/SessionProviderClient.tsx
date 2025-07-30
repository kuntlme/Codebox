"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

interface Props {
  session: Session | null;
  children: React.ReactNode;
}

export function SessionProviderClient({ session, children }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
