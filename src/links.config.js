import avatarImg from "./assets/avatar.jpeg";
import verifiedGif from "./assets/764230-verified.gif";

import githubIcon from "./assets/github.svg";
import browserIcon from "./assets/browser.png";
import discordIcon from "./assets/discord.svg";
import tiktokIcon from "./assets/tik-tok.png";

export const profileConfig = {
  name: "Naell",
  username: "@bytecodev",
  avatar: avatarImg,
  verifiedBadge: verifiedGif,
  socialLinks: [
    {
      id: "github",
      title: "GitHub",
      subtitle: "@naells",
      url: "https://github.com/naells",
      type: "github",
      icon: githubIcon,
    },
    {
      id: "website",
      title: "Website",
      subtitle: "bytecode.my.id",
      url: "https://bytecode.my.id",
      type: "website",
      icon: browserIcon,
    },
    {
      id: "discord-server",
      title: "Stealth-X",
      subtitle: "discord.gg/stealth-x",
      url: "https://discord.gg/stealth-x-1426911756424319089",
      type: "discord",
      icon: discordIcon,
    },
    {
      id: "tiktok",
      title: "TikTok",
      subtitle: "@bytecodev",
      url: "https://www.tiktok.com/@bytecodev",
      type: "tiktok",
      icon: tiktokIcon,
    },
  ],
};
