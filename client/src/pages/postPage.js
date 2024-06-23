import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostPage() {
  const { id } = useParams();
  console.log(id);
  const [postInfo, setPostInfo] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:2024/post/${id}`).then((response) => {
      if (response.ok) {
        response.json().then((postInfo) => {
          setPostInfo(postInfo);
        });
      }
    });
  }, []);
  return (
    <>
      <p>here</p>
    </>
  );
}
