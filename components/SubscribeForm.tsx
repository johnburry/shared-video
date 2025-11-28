"use client";

import { useState, FormEvent } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Bell, Check, Loader2 } from "lucide-react";

interface SubscribeFormProps {
  realtorId: Id<"realtors">;
}

export function SubscribeForm({ realtorId }: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const subscribe = useMutation(api.subscribers.subscribe);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      await subscribe({ realtorId, email });
      setStatus("success");
      setEmail("");

      // Reset to idle after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
      console.error("Subscribe error:", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4">
          <Bell className="w-8 h-8" />
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Never Miss a Video
        </h2>

        <p className="text-gray-600 mb-6">
          Subscribe to get notified when new videos are posted across YouTube,
          Instagram, and TikTok.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={status === "loading" || status === "success"}
            className="flex-1 px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />

          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {status === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
            {status === "success" && <Check className="w-5 h-5" />}
            {status === "success"
              ? "Subscribed!"
              : status === "loading"
              ? "Subscribing..."
              : "Subscribe"}
          </button>
        </form>

        {status === "error" && (
          <p className="mt-3 text-red-600 text-sm">{errorMessage}</p>
        )}

        {status === "success" && (
          <p className="mt-3 text-green-600 text-sm font-medium">
            You&apos;re all set! We&apos;ll notify you of new videos.
          </p>
        )}
      </div>
    </div>
  );
}
