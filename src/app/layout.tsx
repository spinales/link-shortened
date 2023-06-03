import './globals.css'
import "server-only";
import SupabaseAuthProvider from "@/Components/providers/supabase-auth-provider";
import SupabaseProvider from "@/Components/providers/supabase-provider";
import {createClient} from "../../utils/supabase-server";
import { Open_Sans } from 'next/font/google';
import React from "react";


const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'Link Shortened',
  description: 'Project for short links',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
      <html lang="en">
      <body className={openSans.className}>
      <SupabaseProvider>
        <SupabaseAuthProvider serverSession={session}>
          {children}
        </SupabaseAuthProvider>
      </SupabaseProvider>
      </body>
      </html>
  )
}
