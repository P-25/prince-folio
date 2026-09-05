import {
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

const icons: Record<string, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  x: FaXTwitter,
  email: FaEnvelope,
};

interface SocialIconProps {
  id: string;
  className?: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ id, className }) => {
  const Icon = icons[id];
  if (!Icon) return null;
  return <Icon className={className} aria-hidden="true" focusable="false" />;
};

export default SocialIcon;
