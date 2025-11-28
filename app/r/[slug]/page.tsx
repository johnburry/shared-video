"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { RealtorHero } from "@/components/RealtorHero";
import { VideoGrid } from "@/components/VideoGrid";
import { SubscribeForm } from "@/components/SubscribeForm";
import { Loader2 } from "lucide-react";

export default function RealtorPage() {
  const params = useParams();
  const slug = params.slug as string;

  const realtor = useQuery(api.realtors.getBySlug, { slug });
  const videos = useQuery(
    api.videos.getByRealtor,
    realtor ? { realtorId: realtor._id } : "skip"
  );

  if (realtor === undefined || videos === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (realtor === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Realtor Not Found
          </h1>
          <p className="text-gray-600">
            We couldn&apos;t find a realtor with the slug &quot;{slug}&quot;
          </p>
        </div>
      </div>
    );
  }

  // Group videos by platform
  const youtubeVideos = videos.filter((v) => v.platform === "youtube");
  const instagramVideos = videos.filter((v) => v.platform === "instagram");
  const tiktokVideos = videos.filter((v) => v.platform === "tiktok");

  return (
    <div className="min-h-screen">
      <RealtorHero realtor={realtor} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Subscribe Section */}
        <div className="mb-16">
          <SubscribeForm realtorId={realtor._id} />
        </div>

        {/* YouTube Section */}
        {youtubeVideos.length > 0 && (
          <div className="mb-16">
            <VideoGrid
              platform="youtube"
              videos={youtubeVideos.slice(0, 6)}
              title="Latest on YouTube"
            />
          </div>
        )}

        {/* Instagram Section */}
        {instagramVideos.length > 0 && (
          <div className="mb-16">
            <VideoGrid
              platform="instagram"
              videos={instagramVideos.slice(0, 6)}
              title="Latest on Instagram"
            />
          </div>
        )}

        {/* TikTok Section */}
        {tiktokVideos.length > 0 && (
          <div className="mb-16">
            <VideoGrid
              platform="tiktok"
              videos={tiktokVideos.slice(0, 6)}
              title="Latest on TikTok"
            />
          </div>
        )}

        {/* No Videos State */}
        {videos.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No videos yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
