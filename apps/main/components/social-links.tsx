import { createElement } from "react";
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from "react-icons/fi";

const socialLinks = [
  {
    path: "https://github.com/mupinnn",
    label: "GitHub",
    icon: FiGithub,
  },
  {
    path: "https://x.com/itsmupinnn",
    label: "X/Twitter",
    icon: FiTwitter,
  },
  {
    path: "https://www.linkedin.com/in/ahmad-muwaffaq/",
    label: "LinkedIn",
    icon: FiLinkedin,
  },
  {
    path: "mailto:itsmupin@gmail.com",
    label: "Email",
    icon: FiMail,
  },
];

export default function SocialLinks() {
  return (
    <div className="flex gap-4">
      {socialLinks.map(link => (
        <a key={link.path} href={link.path} rel="noopener noreferrer" target="_blank">
          <span className="sr-only">{link.label}</span>
          {link.icon &&
            createElement(link.icon, {
              size: 24,
            })}
        </a>
      ))}
    </div>
  );
}
