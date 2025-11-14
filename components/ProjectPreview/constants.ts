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
        image: '/raidflyer/raidflyer-1.png',
        description: `The goal of Raidflyer was to allow Twitch DJs to create, collab, and share event flyer with 
        their audience. Since the layout of these flyers is similar week to week, we created a templating tool to 
        automate the flyer creation process. Users would simply add a lineup via a .csv (or from various external
        sources), select a template, and post.
        \n\n
        The frontend of the application utilized Vite and Tailwind for quick initial setup, JWT for authentication 
        and access control, and Twitch's REST API for seamless integration with the users it was indented to draw from. 
        However, my primary responsibility was to architech the actual flyer creation tool and to create visually 
        appealing default templates.
        \n\n
        For templating we went with a JSON object containing a set of proprietary "Elements" which would be placed into
        the flyer container. Each element had a predifined set of customizable CSS attributes like size, color, or font
        which could be adjusted by the user at any time. The JSON objects were then parsed and rendered as a simple HTML
        tree.
        \n\n
        Among other offerings, we integrated with OpenAI and Dall-E to allow users to generate background images if they
        wished to do so. From this I was able to learn common pracitices of working with LLM APIs, as well as watching them
        evolve!
        `
    },
    {
        name: "Carolyn",
        subtitle: "Full stack",
        image: '/carolyn/carolyn-1.jpeg',
        description: `Carolyn was simultaneously a passion project and an exploration of my full stack knowledge. In a nutshell,
        the project was ment to give my family members a place to store and share my family photos. Prior to this apps creation,
        family photos (especially those older than 20 years) were stored in closets, boxes, and basements throughout the country.
        While the inital plan was to only support photos the project quickly expanded as people wanted to add music, recordings, 
        videos, notes, comments, and other memorable files as well.
        \n\n
        I began by utilizing Python and FastAPI as a low-complexity, easy-to-implement API solution with local MySQL database
        for storage. While I had experience deploying backends, I had little experience rollowing my own from scratch. I was able to 
        learn quite a bit about backend architecture by rolling my own API. I decided to use pydantic for database construction and 
        modeling (primarily because it is what I was aware was common practice, but also because I've used it in the past). 
        \n\n
        Landing on a specific schema for the most important data type, a "Document" took plenty of trial and error before landing
        on something that worked. I learned its probably better to air on the side of caution by adding more columns than you might need,
        than to have to make a bunch of tiny database migrations all the time.
        \n\n
        I certainly made some mistakes, but I learned much about the importance of a solid backend architecture. In the end, I spun up the 
        frontend of the application relatively quickly (as it wasn't the main focus) and the application was quite well recieved
        by the family.
        `
    },
    {
        name: "Menu Mingle",
        subtitle: "UI/UX",
        image: "/menumingle/dashboard-1.png",
        description: `Menu Mingle was a venture brought to us by a local entreprenuear who dreamed of a TikTok-esque social media platform
        that allowed resturants to create a more interactive menu experience. Through the power of algorithmic preference recognition
        resturants could connect with diners by suggesting menu items based on learned preference, find diners with who enjoy their cuisine,
        as well as help diners find resturants they may love.
        \n\n
        I assisted the development team in expanding on an already sleek UI for the restaurant portal. From within the portal, 
        restaurants could edit existing their existing menu by adding or removing items, see general restaurant analytics 
        such as which items are performing the best, or even promote their establishment to be more likely to appear on
        a users feed.
        \n\n
        Although my time with Menu Mingle was relatively short, I had the opportunity to see work collaboratively with the
        client to not only help their vision come to life but to guide them toward some of the standard UI practices of the 
        modern web development world.
        `
    },
    {
        name: "CRN Mobile App",
        subtitle: "UI/UX",
        image: "/lfg/lfg-1.png",
        description: `The Community Resource Network is a web application whose sole purpose is to make it easy for community
        members to find and share necessities (such as food or clothing) and get them in the hands of people who need them.
        Working alongside Portland State Universities Captstone program, I was tasked with assisting the development team in
        porting the existing functionality of the web application to a lightweight mobile app.
        \n\n
        Over the course of six months, I helped  add numourous features to the already feature rich codebase including: the
        ability to create posts, edit existing posts, sign-up support, add role based permissions to user sessions, and a great 
        deal more. Because the app had been touched by so many engineers over the years, it was crucial to document all processes
        as well as improve the existing documentation. 
        \n\n
        Of all the projects that I've been a part of, I found this project most rewarding. Not only did I get the chance to 
        work on project which tangibly improved our community, I also had the opportunity to work with many talented engineers
        along the way.
        \n\n
        `
    },
    {
        name: "Automated Website Creation Flow",
        subtitle: "Backend",
        image: "website-creation-flow/flow-1.png",
        description: `This one is less of a web application and more of a process. I helped create a blazingly fast onboarding process
        for clients looking to create a website. The company that hired me primarily used Managed Wordpress instances to host sites for
        hoteliers looking to boost their online precence.
        \n\n
        Initially tasked with creating the sites from a couple existing templates, each site build was estimated at a painfully slow
        4-6 weeks. Leveraging Wordpress' built in API I was able to slash that time down to one week (assuming no customization 
        requests from the client).
        \n\n
        The first thing to go was back and forth email conversations (i.e Requirements gathering and information) in replacement of a
        simple to follow form in which the user would provide the basic information required to populate the template. Utilizing 
        Google Forms automation, I designed a simple application in Python that could spin up a new managed Wordpress instance,
        copy over the template selected by the client, and auto populate all of the fields on the site with the form data.
        \n\n
        After the site was drafted, I only had to make a few more adustments (typically small changes like resizing text, or adjusting
        margins) before the template was fully populated and ready to be vetted by the client. I was incredibly proud of how it 
        turned out and can only hope that it is still being used today.
        `
    }
]
