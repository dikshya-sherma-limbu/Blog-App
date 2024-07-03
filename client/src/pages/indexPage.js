import { useEffect, useState } from "react";
import Post from "../components/post";

export default function IndexPage() {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2024/post").then((response) => {
      response.json().then((posts) => {
        setPost(posts);
      });
    });
  }, []);
  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => (
          <Post
            key={post._id}
            _id={post._id}
            title={post.title}
            summary={post.summary}
            cover={post.cover}
            content={post.content}
            createdAt={post.createdAt}
            author={post.author}
          />
        ))}
    </>
  );
}
