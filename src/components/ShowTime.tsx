import { formatDistanceToNow, parseISO } from "date-fns";

interface IShowTimeProps {
  timeStamp: string;
}

const ShowTime = ({ timeStamp }: IShowTimeProps) => {
  const oldTime = parseISO(timeStamp);
  const newFormatTime = formatDistanceToNow(oldTime);
  return <div>{newFormatTime} ago</div>;
};

export default ShowTime;
