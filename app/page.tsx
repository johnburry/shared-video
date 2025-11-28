import { Video } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
      <div className="text-center px-4">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white text-blue-600 rounded-full mb-6 shadow-2xl">
          <Video className="w-10 h-10" />
        </div>

        <h1 className="text-5xl font-bold text-white mb-4">
          Realtor Video Showcase
        </h1>

        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
          Aggregated video content from YouTube, Instagram, and TikTok
        </p>

        <div className="mt-8 text-blue-200">
          <p>Visit /r/[realtor-slug] to view a realtor&apos;s video showcase</p>
        </div>
      </div>
    </div>
  );
}
