import { formatDistanceToNow, parseISO } from "date-fns";
import { IArticle } from "../interface";

type ShowTimeProps=Pick<IArticle,"date">

const ShowTime = ({ date }: ShowTimeProps) => {
  const oldTime = parseISO(date);
  const newFormatTime = formatDistanceToNow(oldTime);
  return <div>{newFormatTime} ago</div>;
};

export default ShowTime;
