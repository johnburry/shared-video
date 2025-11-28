"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { Youtube, Instagram } from "lucide-react";
import Image from "next/image";

interface VideoGridProps {
  platform: "youtube" | "instagram" | "tiktok";
  videos: Doc<"videos">[];
  title: string;
}

const platformConfig = {
  youtube: {
    icon: Youtube,
    color: "bg-red-500",
    hoverColor: "hover:bg-red-600",
  },
  instagram: {
    icon: Instagram,
    color: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500",
    hoverColor: "hover:from-purple-600 hover:via-pink-600 hover:to-orange-600",
  },
  tiktok: {
    icon: ({ className }: { className?: string }) => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
    color: "bg-black",
    hoverColor: "hover:bg-gray-900",
  },
};

export function VideoGrid({ platform, videos, title }: VideoGridProps) {
  const config = platformConfig[platform];
  const Icon = config.icon;

  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${config.color} text-white`}>
          <Icon className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <a
            key={video._id}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-gray-200 overflow-hidden">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div
                  className={`w-14 h-14 rounded-full ${config.color} ${config.hoverColor} text-white flex items-center justify-center opacity-90 group-hover:opacity-100 transition-all transform group-hover:scale-110 shadow-lg`}
                >
                  <svg
                    className="w-6 h-6 ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                {video.title}
              </h3>

              {video.description && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {video.description}
                </p>
              )}

              <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                <Icon className="w-4 h-4" />
                <span>
                  {new Date(video.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
