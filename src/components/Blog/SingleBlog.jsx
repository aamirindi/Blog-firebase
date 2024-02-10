import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../Firebase";
import { getDoc, doc, collection } from "firebase/firestore";
import NavBar from "./NavBar";
import "../../style/Blog.css";

export default function SingleBlog() {
  // console.log(useParams());
  const { id } = useParams();
  const [data, setData] = useState({});
  const colRef = collection(db, "blog");
  const singleData = doc(db, "blog", id);

  useEffect(() => {
    const singleFetch = () => {
      getDoc(singleData).then((doc) => setData(doc.data()));
    };
    singleFetch();
  }, [id]);
  return (
    <>
      <NavBar />
      <div className="main">
        <div className="content">
          <div className="user-blog">
            <img
              className="user-img"
              style={{ width: "20%", height: "20%" }}
              src={data.authorImg}
              alt=""
            />
            <h1>({data.authorName})</h1>
          </div>
          <div className="container">
            <div className="wrapper">
              <img className="banner-image" src={data.img} />
            </div>
            <div className="content-blog">
              <h1>{data.title}</h1>
              <hr />
              <br />
              <p>
                <strong>Short Desciption:</strong>
                <br />
                {data.shortDesc}
              </p>
              <br />
              <hr />
              <br />
              <p>
                <strong>Full Desciption:</strong>
                <br />
                {data.fullDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
