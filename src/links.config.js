import avatarImg from "./assets/avatar.jpeg";
import verifiedGif from "./assets/764230-verified.gif";
import githubCover from "./assets/github.png";
import discordCover from "./assets/communication.png";
import userProfileCover from "./assets/user-profile.png";
import tiktokCover from "./assets/tik-tok.png";

export const profileConfig = {
  name: "Naell",
  avatar: avatarImg,
  verifiedBadge: verifiedGif,
  socialLinks: [
    {
      id: "github",
      title: "GitHub",
      subtitle: "@naells",
      url: "https://github.com/naells",
      cover: githubCover,
      coverFit: "cover",
    },
    {
      id: "discord-user",
      title: "Discord",
      subtitle: "@bytecodev",
      url: "https://discord.com/users/bytecodev",
      copyValue: "@bytecodev",
      cover: userProfileCover,
      coverFit: "contain",
    },
    {
      id: "discord-server",
      title: "Stealth-X",
      subtitle: "discord.gg/stealth-x",
      url: "https://discord.gg/stealth-x-1426911756424319089",
      cover: discordCover,
      coverFit: "contain",
    },
    {
      id: "tiktok",
      title: "TikTok",
      subtitle: "@bytecodev",
      url: "https://www.tiktok.com/@bytecodev",
      cover: tiktokCover,
      coverFit: "contain",
    },
  ],
};
