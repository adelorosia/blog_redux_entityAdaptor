import { formatDistanceToNow, parseISO } from "date-fns";
import { IArticle } from "../interface";

type TShowTimeProps = Pick<IArticle, "date">;
const ShowTime = ({ date }: TShowTimeProps) => {
  if (!date) {
    return <div>ungültige Date</div>;
  }
  const enteredDate = parseISO(date);
  const formatDate = formatDistanceToNow(enteredDate);
  return <div>{formatDate ? formatDate + " ago" : undefined}</div>;
};

export default ShowTime;
