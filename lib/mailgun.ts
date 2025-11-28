import formData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "",
});

export interface VideoEmailData {
  realtorName: string;
  realtorPhoto?: string;
  newVideo: {
    title: string;
    thumbnail: string;
    url: string;
    platform: "youtube" | "instagram" | "tiktok";
  };
  recentVideos: {
    youtube: Array<{ title: string; thumbnail: string; url: string }>;
    instagram: Array<{ title: string; thumbnail: string; url: string }>;
    tiktok: Array<{ title: string; thumbnail: string; url: string }>;
  };
}

function generateEmailHtml(data: VideoEmailData): string {
  const platformEmoji = {
    youtube: "📺",
    instagram: "📷",
    tiktok: "🎵",
  };

  const platformColor = {
    youtube: "#FF0000",
    instagram: "#E4405F",
    tiktok: "#000000",
  };

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Video from ${data.realtorName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); padding: 40px 30px; text-align: center;">
              ${
                data.realtorPhoto
                  ? `<img src="${data.realtorPhoto}" alt="${data.realtorName}" style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 16px; border: 4px solid rgba(255,255,255,0.3);">`
                  : ""
              }
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">${
                data.realtorName
              }</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px;">just posted a new video!</p>
            </td>
          </tr>

          <!-- New Video -->
          <tr>
            <td style="padding: 30px;">
              <div style="background-color: #f9fafb; border-radius: 8px; overflow: hidden; margin-bottom: 30px;">
                <a href="${data.newVideo.url}" style="text-decoration: none; color: inherit; display: block;">
                  <img src="${data.newVideo.thumbnail}" alt="${data.newVideo.title}" style="width: 100%; display: block;">
                  <div style="padding: 20px;">
                    <div style="display: inline-block; background-color: ${
                      platformColor[data.newVideo.platform]
                    }; color: white; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: bold; margin-bottom: 12px;">
                      ${platformEmoji[data.newVideo.platform]} ${data.newVideo.platform.toUpperCase()}
                    </div>
                    <h2 style="margin: 0 0 12px 0; font-size: 20px; color: #111827; line-height: 1.4;">${
                      data.newVideo.title
                    }</h2>
                    <a href="${data.newVideo.url}" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                      Watch Now →
                    </a>
                  </div>
                </a>
              </div>

              <!-- Recent Videos Section -->
              <h3 style="color: #111827; font-size: 18px; margin: 30px 0 20px 0;">Recent Videos</h3>

              <!-- YouTube -->
              ${
                data.recentVideos.youtube.length > 0
                  ? `
              <div style="margin-bottom: 24px;">
                <p style="color: #6b7280; font-size: 14px; font-weight: 600; margin: 0 0 12px 0;">📺 YOUTUBE</p>
                ${data.recentVideos.youtube
                  .map(
                    (video) => `
                <div style="margin-bottom: 12px;">
                  <a href="${video.url}" style="display: flex; text-decoration: none; color: inherit; background-color: #f9fafb; border-radius: 6px; overflow: hidden; transition: background-color 0.2s;">
                    <img src="${video.thumbnail}" alt="${video.title}" style="width: 120px; height: 68px; object-fit: cover;">
                    <div style="padding: 12px; flex: 1;">
                      <p style="margin: 0; color: #111827; font-size: 14px; line-height: 1.4;">${video.title}</p>
                    </div>
                  </a>
                </div>
                `
                  )
                  .join("")}
              </div>
              `
                  : ""
              }

              <!-- Instagram -->
              ${
                data.recentVideos.instagram.length > 0
                  ? `
              <div style="margin-bottom: 24px;">
                <p style="color: #6b7280; font-size: 14px; font-weight: 600; margin: 0 0 12px 0;">📷 INSTAGRAM</p>
                ${data.recentVideos.instagram
                  .map(
                    (video) => `
                <div style="margin-bottom: 12px;">
                  <a href="${video.url}" style="display: flex; text-decoration: none; color: inherit; background-color: #f9fafb; border-radius: 6px; overflow: hidden;">
                    <img src="${video.thumbnail}" alt="${video.title}" style="width: 120px; height: 68px; object-fit: cover;">
                    <div style="padding: 12px; flex: 1;">
                      <p style="margin: 0; color: #111827; font-size: 14px; line-height: 1.4;">${video.title}</p>
                    </div>
                  </a>
                </div>
                `
                  )
                  .join("")}
              </div>
              `
                  : ""
              }

              <!-- TikTok -->
              ${
                data.recentVideos.tiktok.length > 0
                  ? `
              <div style="margin-bottom: 24px;">
                <p style="color: #6b7280; font-size: 14px; font-weight: 600; margin: 0 0 12px 0;">🎵 TIKTOK</p>
                ${data.recentVideos.tiktok
                  .map(
                    (video) => `
                <div style="margin-bottom: 12px;">
                  <a href="${video.url}" style="display: flex; text-decoration: none; color: inherit; background-color: #f9fafb; border-radius: 6px; overflow: hidden;">
                    <img src="${video.thumbnail}" alt="${video.title}" style="width: 120px; height: 68px; object-fit: cover;">
                    <div style="padding: 12px; flex: 1;">
                      <p style="margin: 0; color: #111827; font-size: 14px; line-height: 1.4;">${video.title}</p>
                    </div>
                  </a>
                </div>
                `
                  )
                  .join("")}
              </div>
              `
                  : ""
              }
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px;">
                You're receiving this because you subscribed to ${data.realtorName}'s video updates.
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                Don't want these emails? You can unsubscribe at any time.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function sendVideoNotification(
  to: string,
  data: VideoEmailData
): Promise<{ success: boolean; error?: string }> {
  try {
    const domain = process.env.MAILGUN_DOMAIN;
    const from = process.env.MAILGUN_FROM_EMAIL;

    if (!domain || !from) {
      throw new Error("Mailgun configuration missing");
    }

    await mg.messages.create(domain, {
      from,
      to: [to],
      subject: `🎬 ${data.realtorName} posted a new video!`,
      html: generateEmailHtml(data),
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
