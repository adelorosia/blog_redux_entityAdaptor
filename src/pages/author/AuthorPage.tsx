import { useParams } from "react-router-dom";
import Authors from "../../components/authors/Authors";
import AuthorsArticle from "../../components/authors/AuthorsArticle";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUsers, setAuthorId } from "../../reducer/UserSlice";
import { AppDispatch } from "../../store";

const AuthorPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { authorId } = useParams();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setAuthorId(authorId));
  }, [dispatch, authorId]);
  
  return <div>{authorId === undefined ? <Authors /> : <AuthorsArticle />}</div>;
};

export default AuthorPage;
