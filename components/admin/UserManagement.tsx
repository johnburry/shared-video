"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { Shield, UserPlus } from "lucide-react";

interface UserManagementProps {
  realtors: Doc<"realtors">[] | undefined;
}

export function UserManagement({ realtors }: UserManagementProps) {
  // TODO: Implement user management functionality
  // This will allow super admins to:
  // 1. Create new admin users
  // 2. Assign realtors to admin users
  // 3. Promote/demote super admin status
  // 4. Delete admin users

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Admin Users</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
          <UserPlus className="w-5 h-5" />
          Add Admin User
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
          <Shield className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          User Management Coming Soon
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          This feature will allow super admins to create and manage admin user
          accounts and assign them to specific realtor pages.
        </p>
      </div>
    </div>
  );
}
