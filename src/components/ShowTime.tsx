import { formatDistanceToNow, parseISO } from "date-fns";

interface IShowTimeProps{
    timeStamp:string
}

const ShowTime = ({timeStamp}:IShowTimeProps) => {
    const time=parseISO(timeStamp)
    const oldTime=formatDistanceToNow(time)
    return (
        <div>
            {oldTime} ago
        </div>
    );
}

export default ShowTime;