interface CardType {
  url: string;
  title: string;
  id: number;
};

interface Links{
  url:string;
  title:string
}
export const cards: CardType[] = [
  {
    url: "",
    title: "Title 1",
    id: 1,
  },
  {
    url: "",
    title: "Title 2",
    id: 2,
  },
  {
    url: "",
    title: "Title 3",
    id: 3,
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
