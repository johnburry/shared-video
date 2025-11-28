"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";

interface RealtorHeroProps {
  realtor: Doc<"realtors">;
}

export function RealtorHero({ realtor }: RealtorHeroProps) {
  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Photo */}
          {realtor.photo ? (
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden ring-4 ring-white/20 shadow-2xl flex-shrink-0">
              <Image
                src={realtor.photo}
                alt={realtor.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white/10 ring-4 ring-white/20 shadow-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-5xl font-bold text-white/80">
                {realtor.name.charAt(0)}
              </span>
            </div>
          )}

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold mb-3 tracking-tight">
              {realtor.name}
            </h1>

            {realtor.bio && (
              <p className="text-lg sm:text-xl text-blue-100 mb-6 max-w-2xl">
                {realtor.bio}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {realtor.email && (
                <a
                  href={`mailto:${realtor.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
                >
                  <Mail className="w-5 h-5" />
                  Email Me
                </a>
              )}

              {realtor.phone && (
                <a
                  href={`tel:${realtor.phone}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-colors ring-1 ring-white/30"
                >
                  <Phone className="w-5 h-5" />
                  Call Me
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
