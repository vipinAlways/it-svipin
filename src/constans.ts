export interface CardType {
  url: string;
  title: string;
  id: number;
  description:string;
  image?: string;
  bgColor:string;
  gitlink?:string;
  liveLink?:string
};

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
    url: "https://finance-manger.vercel.app/",
    title: "Finance Free",
    id: 1,
    description:"A Finance Manager App that helps you to manage your finance and track your expenses. It is a full stack app with authentication and authorization. It is built with Next.js, Tailwind CSS, MongoDB and Node.js.",
    bgColor:"bg-green-600/10",
    image:"/projectPreview/finace_manager.jpeg"
  },
  {
    url: "https://music-raze.vercel.app/",
    title: "Music Raze",
    id: 2,
    description:"Music Raze is a full-stack app that lets you listen to the same track with your loved ones in real-time. It features authentication and authorization, and is built using Next.js, Tanstack, Prisma, and Spotify Api.",
    bgColor:"bg-[linear-gradient(40deg,_#4b2ee0f7_5%,_#782ee0f7_21%,_#461cb8_35%,_#6d1cb8_58%)]",
    image:"/projectPreview/music_raze.jpeg",
    gitlink:"https://github.com/vipinAlways/Music-raze",
    liveLink:"https://music-raze.vercel.app/"

  },
  {
    url: "",
    title: "Bucket Master",
    id: 3,
    description:"",
    bgColor:""
  },
  {
    url: "https://store-it-7qil.vercel.app/sign-in",
    title: "Store It",
    id: 4,
    description:"A Store It is a full-stack app that lets you store your files in the cloud. It features authentication and authorization, and is built using Next.js and Appwrite .",
    bgColor:"bg-[#12840B]/60",
    image:"/projectPreview/store_it.jpeg"
  },

];

