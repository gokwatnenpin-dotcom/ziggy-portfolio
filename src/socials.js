import { ExternalLink, Send, MessageCircle, Globe, MessageSquareText } from "lucide-react";

export const DEFAULT_SOCIALS = [
  {
    label: "GitHub",
    handle: "@gokwatnenpin-dotcom",
    url: "https://github.com/gokwatnenpin-dotcom",
    Icon: ExternalLink,
  },
  {
    label: "Email",
    handle: "gokwatnenpin@gmail.com",
    url: "mailto:gokwatnenpin@gmail.com?subject=Hello%20Ziggy",
    Icon: Send,
  },
  {
    label: "WhatsApp",
    handle: "Chat directly",
    url: "https://wa.me/2348026977877?text=Hello%20Ziggy",
    Icon: MessageCircle,
  },
  {
    label: "X",
    handle: "@ziggy_dev",
    url: "https://x.com/ziggy_dev",
    Icon: Globe,
  },
  {
    label: "LinkedIn",
    handle: "ziggy-dev",
    url: "https://www.linkedin.com/in/ziggy-dev",
    Icon: Globe,
  },
  {
    label: "Discord",
    handle: "ziggy.dev",
    url: "https://discord.com",
    Icon: MessageSquareText,
  },
  {
    label: "Telegram",
    handle: "@ziggy_2958Bot",
    url: "https://t.me/ziggy_2958Bot",
    Icon: Send,
  },
];
