import { Project } from "./types";


export const projects: Project[] = [
    {
        name: "LFG.TV",
        subtitle: "Web Design",
        image: '/lfg/lfg-1.jpeg',
        description: `The LFGTV project is my most complex project to date. The inital concept was
        a DJ specific livestreaming platform built in response to Twitch's growing concerns
        over copywritten music being played on air leading them to severly restrict what, when,
        and how DJs were able to play their music on the platform. 
        \n\n
        Initially, I was responsible drafting up a design concept in Figma on a tight timeline of two weeks.
        The design that I delivered was so well recieved that the founder asked that we join their development
        team to help build it which we happily obliged.
        \n\n
        The project leveraged the latest in frontend technologies including: Server side rendering with Next.js, 
        real-time chat and livestream info via websockets, and JWT authentication for user sessions and API
        access control. 
        \n\n
        Not only did I get the chance to sharpen my existing skills, I came out with a plethora of
        new tools under my belt including Redux and Sentry for debugging the frontend on the fly, HLS video encoding/decoding
        for efficient videostreaming, and a ton of cross-browser compatibility knowledge.
        `
    },
    {
        name: "Raidflyer",
        subtitle: "UI/UX",
        image: '/raidflyer/raidflyer-1.png'
    },
    {
        name: "Carolyn",
        subtitle: "Full stack",
        image: '/carolyn/carolyn-1.jpeg'
    },
    {
        name: "Menu Mingle",
        subtitle: "UI/UX",
        image: "/menumingle/dashboard-1.png"
    },
    {
        name: "CRN Mobile App",
        subtitle: "UI/UX",
        image: "/lfg/lfg-1.png"
    },
    {
        name: "Automated Website Creation Flow",
        subtitle: "Backend",
        image: "website-creation-flow/flow-1.png"
    }
]
