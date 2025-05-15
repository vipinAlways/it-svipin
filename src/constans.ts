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
    url: "",
    title: "Finance Free",
    id: 1,
    description:""
  },
  {
    url: "",
    title: "Music Raze",
    id: 2,
    description:""
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
