import { useSelector } from "react-redux";
import { RootState } from "../store";
import { findUserById } from "../reducer/UserSlice";

interface IShowAuthorProps {
  userId: string;
}
const ShowAuthor = ({ userId }: IShowAuthorProps) => {
  const user = useSelector((state: RootState) => findUserById(state, userId));
  return <div>von {`${user?user.firstName+ " " +user.lastName:"unbekannte Author"}`}</div>;
};

export default ShowAuthor;
