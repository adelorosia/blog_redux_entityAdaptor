export interface IArticle {
  _id: string;
  userId: string;
  date: string;
  title: string;
  content: string;
  imgUrl: string;
  reactions: Record<string, number>;
}

export interface IAuthor {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
}
