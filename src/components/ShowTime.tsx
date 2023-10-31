import { formatDistanceToNow, parseISO } from "date-fns";

interface IShowTimeState {
  timeStamp: string;
}
const ShowTime = ({ timeStamp }: IShowTimeState) => {
  const oldTime = parseISO(timeStamp);
  const newDate = formatDistanceToNow(oldTime);
  return <div>{newDate}</div>;
};

export default ShowTime;
