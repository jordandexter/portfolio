import { SiGithub, SiGmail, SiLinkedin } from "react-icons/si";
import { SocialLink } from "./types";

export const socials: SocialLink[] = [
    {
        name: "Github",
        icon: SiGithub,
        link: 'https://github.com/jordandexter'
    },
    {
        name: "LinkedIn",
        icon: SiLinkedin,
        link: "https://linkedin.com/in/jordandexter"
    },
    {
        name: "Gmail",
        icon: SiGmail,
        link: "mailto:jdbdexter@gmail.com"
    }
]