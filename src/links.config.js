import avatarImg from "./assets/avatar.jpeg";

export const profileConfig = {
  name: "Naell",
  tagline: "Developer & Tech Enthusiast",
  bio: "Welcome to my official links! Explore my GitHub projects, join the Stealth-X community, or connect on Discord and TikTok.",
  avatar: avatarImg,
  avatarFallback: "N",
  verified: true,
  status: {
    online: true,
    text: "Building cool stuff",
  },
  socialLinks: [
    {
      id: "github",
      title: "GitHub",
      subtitle: "@naells • Explore code & open-source projects",
      url: "https://github.com/naells",
      type: "github",
      badge: "Follow",
      featured: false,
    },
    {
      id: "discord-account",
      title: "Discord Account",
      subtitle: "@bytecodev • Click to copy or connect",
      url: "https://discord.com/users/bytecodev",
      type: "discord",
      copyValue: "@bytecodev",
      badge: "Copy Tag",
      featured: false,
    },
    {
      id: "discord-server",
      title: "Stealth-X Community",
      subtitle: "Official Discord Server • Join our community!",
      url: "https://discord.gg/stealth-x-1426911756424319089",
      type: "discord-server",
      badge: "Join Server",
      featured: true,
    },
    {
      id: "tiktok",
      title: "TikTok",
      subtitle: "@bytecodev • Short videos, coding & updates",
      url: "https://www.tiktok.com/@bytecodev",
      type: "tiktok",
      badge: "Watch",
      featured: false,
    },
  ],
};
