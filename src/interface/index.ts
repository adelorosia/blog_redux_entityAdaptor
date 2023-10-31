export interface IArticle {
  _id: string;
  userId: string;
  title: string;
  imgUrl: string;
  date: string;
  content: string;
  reactions: Record<string, number>;
}

export interface IAuthor {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
}
