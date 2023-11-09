import { useParams } from "react-router-dom";
import Authors from "../../components/authors/Authors";
import AuthorArticle from "../../components/authors/AuthorsArticle";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers, setAuthorId } from "../../reducer/UserSlice";
import { AppDispatch } from "../../store";

const AuthorPage = () => {
  const { authorId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  useEffect(() => {
    dispatch(setAuthorId(authorId));
  }, [dispatch, authorId]);
  return <div>{authorId === undefined ? <Authors /> : <AuthorArticle />}</div>;
};

export default AuthorPage;
