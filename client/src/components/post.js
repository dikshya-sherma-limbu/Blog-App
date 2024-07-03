import { format } from "date-fns";
import { Link } from "react-router-dom";
export default function Post({
  _id,

  title,
  summary,
  cover,
  createdAt,
  author,
}) {
  const imageUrl = `http://localhost:2024/${cover}`;
  const formattedDate = format(new Date(createdAt), "MMMM do, yyyy");
  console.log("post-" + _id);
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={imageUrl} alt="photo"></img>
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title + "  here is id: " + _id}</h2>
        </Link>
        <p className="info">
          <a className="author">
            {author ? author.firstname : "Unknown Author"}
          </a>
          <time>{formattedDate}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
