import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="notfound-page">
      <h1>404</h1>
      <h2>Oops! Page not found</h2>
      <p>
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className="btn">
        Go Back Home
      </Link>
    </section>
  );
}