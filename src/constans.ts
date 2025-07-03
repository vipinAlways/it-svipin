export interface CardType {
  title: string;
  id: number;
  description: string;
  image?: string;
  bgColor: string;
  gitlink?: string;
  liveLink?: string;
}
export interface Skill {
  name: string;
  image: string;
 
}

export interface Activity {
  name: string;
  type: number;
  state?: string;
  details?: string;
  application_id?: string;
  sync_id?: string;
  assets?: {
    large_image?: string;
    large_text?: string;
  };
  timestamps?: {
    start: number;
    end?: number;
  };
}

export const cards: CardType[] = [
  {
    liveLink: "https://finance-manger.vercel.app/",
    title: "Finance Free",
    id: 1,
    description: `Finance Manager is a smart web app designed to help you take control of your personal finances.
You can set budgets for specific time periods and easily track your income, expenses, and loans in one place.

With built-in visualizations like bar graphs, pie charts, and a daily transaction table with advanced filtering, you get a clear picture of where your money is going — making money management simpler, faster, and more intuitive.

 `,
    bgColor: "bg-green-600/10 dark:bg-green-600/40",
    image: "/projectPreview/finace_manager.jpeg",
    gitlink: "https://github.com/vipinAlways/Finance-Manger",
  },
  {
    title: "Music Raze",
    id: 2,
    description: `Music Raze is a collaborative music streaming web app that lets you and your friends listen to the same track in real time.
Create or join groups, add your favorite songs, and enjoy a smooth, synced experience — no matter where you are.

With seamless integration of the Spotify API, group controls, and real-time updates, it brings people closer through shared music moments.

`,
    bgColor:
      "bg-[linear-gradient(40deg,_#4b2ee080_5%,_#782ee080_21%,_#461cb880_35%,_#6d1cb880_58%)]",
    image: "/projectPreview/music_raze.jpeg",
    gitlink: "https://github.com/vipinAlways/Music-raze",
    liveLink: "https://music-raze.vercel.app/",
  },
  {
    title: "Bucket Master",
    id: 3,
    description: "",
    bgColor: "",
  },
  {
    liveLink: "https://store-it-7qil.vercel.app/sign-in",
    title: "Store It",
    id: 4,
    description: `Store It is a cloud-based web app that allows you to securely store, organize, and access your files from anywhere.
You can upload media, preview your content in real time, and manage everything through a clean and intuitive interface.

Whether it's documents, images, or videos — everything stays safe, accessible, and just a few clicks away.`,
    bgColor: "bg-[#12840B]/10 dark:bg-[#12840B]/40",
    image: "/projectPreview/store_it.jpeg",
    gitlink: "https://github.com/vipinAlways/Store-it",
  },
];
export const skills: Skill[] = [
  {
    name: "Next.js",
    image: "/skillimage/next.svg",
   
  },
  {
    name: "Prisma / MongoDB",
    image: "/skillimage/db.svg",
   
  },

  {
    name: "Postman",
    image: "/skillimage/postman.png",
   
  },
  {
    name: "TypeScript",
    image: "/skillimage/ts.png",
   
  },
  {
    name: "T3 Stack",
    image: "/skillimage/t3-dark.svg",
   
  },
  {
    name: "Tailwind",
    image: "/skillimage/tailwind.svg",
   
  },

 
  // {
  //   name: "Lenis",
  //   image: "/skillimage/verce.svg",
  //  
  // },
];
