import { Link } from "react-router-dom";
export const NotFoundPage = () => {
  return (
    <div className="notFoundPage">
      <h1>404 Not Found</h1>
      <Link to="/">Home from Link</Link>
    </div>
  );
};
