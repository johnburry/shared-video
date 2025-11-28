"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Authenticated, Unauthenticated } from "convex/react";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { SignInForm } from "@/components/admin/SignInForm";

export default function AdminPage() {
  return (
    <>
      <Unauthenticated>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
          <SignInForm />
        </div>
      </Unauthenticated>

      <Authenticated>
        <AdminDashboard />
      </Authenticated>
    </>
  );
}
