"use client";

import { useState, FormEvent } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Plus, Loader2, Trash2, Youtube, Instagram } from "lucide-react";

interface VideoManagementProps {
  realtors: Doc<"realtors">[] | undefined;
}

export function VideoManagement({ realtors }: VideoManagementProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedRealtorId, setSelectedRealtorId] = useState<Id<"realtors"> | "">(
    ""
  );
  const [formData, setFormData] = useState({
    platform: "youtube" as "youtube" | "instagram" | "tiktok",
    videoId: "",
    title: "",
    description: "",
    thumbnail: "",
    url: "",
    publishedAt: new Date().toISOString().split("T")[0],
  });

  const createVideo = useMutation(api.videos.create);
  const deleteVideo = useMutation(api.videos.remove);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const videos = useQuery(
    api.videos.getByRealtor,
    selectedRealtorId ? { realtorId: selectedRealtorId } : "skip"
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedRealtorId) {
      alert("Please select a realtor");
      return;
    }

    setIsSubmitting(true);

    try {
      await createVideo({
        realtorId: selectedRealtorId,
        platform: formData.platform,
        videoId: formData.videoId,
        title: formData.title,
        description: formData.description || undefined,
        thumbnail: formData.thumbnail,
        url: formData.url,
        publishedAt: new Date(formData.publishedAt).getTime(),
      });

      // Reset form
      setFormData({
        platform: "youtube",
        videoId: "",
        title: "",
        description: "",
        thumbnail: "",
        url: "",
        publishedAt: new Date().toISOString().split("T")[0],
      });
      setIsCreating(false);
    } catch (error) {
      console.error("Error creating video:", error);
      alert("Failed to create video. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (videoId: Id<"videos">) => {
    if (!confirm("Are you sure you want to delete this video?")) return;

    try {
      await deleteVideo({ id: videoId });
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Failed to delete video. Please try again.");
    }
  };

  if (realtors === undefined) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Videos</h2>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Video
        </button>
      </div>

      {/* Realtor Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Realtor
        </label>
        <select
          value={selectedRealtorId}
          onChange={(e) =>
            setSelectedRealtorId(e.target.value as Id<"realtors"> | "")
          }
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          <option value="">-- Select a realtor --</option>
          {realtors.map((realtor) => (
            <option key={realtor._id} value={realtor._id}>
              {realtor.name}
            </option>
          ))}
        </select>
      </div>

      {/* Create Form */}
      {isCreating && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            New Video
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Platform *
              </label>
              <select
                value={formData.platform}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    platform: e.target.value as "youtube" | "instagram" | "tiktok",
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="youtube">YouTube</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video ID *
                </label>
                <input
                  type="text"
                  value={formData.videoId}
                  onChange={(e) =>
                    setFormData({ ...formData, videoId: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Platform-specific video ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Published Date *
                </label>
                <input
                  type="date"
                  value={formData.publishedAt}
                  onChange={(e) =>
                    setFormData({ ...formData, publishedAt: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Amazing property tour"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Video description..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thumbnail URL *
              </label>
              <input
                type="url"
                value={formData.thumbnail}
                onChange={(e) =>
                  setFormData({ ...formData, thumbnail: e.target.value })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="https://example.com/thumbnail.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Video URL *
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating..." : "Create Video"}
              </button>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                disabled={isSubmitting}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Videos List */}
      {selectedRealtorId && (
        <div className="bg-white rounded-lg border border-gray-200">
          {videos === undefined ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : videos.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No videos for this realtor yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {videos.map((video) => (
                <div
                  key={video._id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-video bg-gray-200">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      {video.platform === "youtube" && (
                        <div className="bg-red-500 text-white p-1 rounded">
                          <Youtube className="w-4 h-4" />
                        </div>
                      )}
                      {video.platform === "instagram" && (
                        <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-1 rounded">
                          <Instagram className="w-4 h-4" />
                        </div>
                      )}
                      {video.platform === "tiktok" && (
                        <div className="bg-black text-white p-1 rounded text-xs font-bold">
                          TT
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-2">
                      {video.title}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {new Date(video.publishedAt).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => handleDelete(video._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
