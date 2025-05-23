interface CardType {
  url: string;
  title: string;
  id: number;
  description:string;
};

interface Links{
  url:string;
  title:string
}
export const cards: CardType[] = [
  {
    url: "https://finance-manger.vercel.app/",
    title: "Finance Free",
    id: 1,
    description:"A Finance Manager App that helps you to manage your finance and track your expenses. It is a full stack app with authentication and authorization. It is built with Next.js, Tailwind CSS, MongoDB and Node.js."
  },
  {
    url: "",
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

];

export const links:Links[] = [
  {
    url:"home",
    title:"Home"
  },
  {
    url:"projects",
    title:"Projects"
  },
  {
    url:"about",
    title:"About"
  },
]
