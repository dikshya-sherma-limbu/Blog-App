import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import {UserContext} from '../components/userContext';

export default function PostPage() {
  const { id } = useParams();
  console.log(id);
  console.log("hello" + useParams());
  const [postInfo, setPostInfo] = useState(null);
  const {userInfo}=useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:2024/post/${id}`).then((response) => {
      console.log(response);
      if (response.ok) {
        response.json().then((postInfo) => {
          setPostInfo(postInfo);
        });
      }
    });
  }, []);
  if (!postInfo) {
    return <h1>Loading...</h1>;
  }
  //debug
  console.log('userInfo ' + userInfo);
 console.log('PostInfo ' + postInfo.author._id)
  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{format(new Date(postInfo.createdAt), "MMMM do, yyyy")}</time>
      <div className="author">by {postInfo.author.firstname}</div>
      {/* {userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <a className="edit-btn">Edit this post</a>
        </div>
      )} */}
      <div className="image">
        <img src={`http://localhost:2024/${postInfo.cover}`} alt="error" />
      </div>

      <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  );
}
