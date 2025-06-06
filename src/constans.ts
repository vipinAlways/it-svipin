interface CardType {
  url: string;
  title: string;
  id: number;
  description:string;
  images?: string[];
};

export const cards: CardType[] = [
  {
    url: "https://finance-manger.vercel.app/",
    title: "Finance Free",
    id: 1,
    description:"A Finance Manager App that helps you to manage your finance and track your expenses. It is a full stack app with authentication and authorization. It is built with Next.js, Tailwind CSS, MongoDB and Node.js."
  },
  {
    url: "https://music-raze.vercel.app/",
    title: "Music Raze",
    id: 2,
    description:"Music Raze is a full-stack app that lets you listen to the same track with your loved ones in real-time. It features authentication and authorization, and is built using Next.js, Tanstack, Prisma, and Spotify Api."
  },
  {
    url: "",
    title: "Bucket Master",
    id: 3,
    description:""
  },
  {
    url: "https://store-it-7qil.vercel.app/sign-in",
    title: "Store It",
    id: 4,
    description:"A Store It is a full-stack app that lets you store your files in the cloud. It features authentication and authorization, and is built using Next.js and Appwrite ."
  },

];

