import NavBar from "./NavBar";
import { getAuth } from "firebase/auth";
import "../../style/Blog.css";
import { db } from "../Firebase";
import { onSnapshot, collection, doc, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Blog() {
  const auth = getAuth();
  const [data, setData] = useState([]);
  const collRef = collection(db, "blog");

  useEffect(() => {
    const getData = () => {
      onSnapshot(collRef, (snapshot) => {
        setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    };
    getData();
    // console.log(data);
  }, []);

  const deleteData = async (id) => {
    const data = doc(db, "blog", id);
    alert("Your document will be delected for ever!");
    await deleteDoc(data);
    console.log(id);

    toast.error("Your blog post was deleted :(", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  // console.log(auth.currentUser.uid);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <NavBar />
      {data.map((data) => {
        // console.log(data.authorImg);
        return (
          <>
            <div className="main">
              <div className="user-blog">
                <img
                  className="user-img"
                  // style={{ width: "20%", height: "20%" }}
                  src={data.authorImg}
                  alt=""
                />
                <h1>@{data.authorName}</h1>
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
                    Short Desciption: <br />
                    {data.shortDesc}
                  </p>
                  <div className="button-wrapper">
                    <Link to={`/blog/${data.id}`} className="btn outline">
                      View More
                    </Link>
                    <br />
                    <br />

                    {data.author.id === auth.currentUser.uid && (
                      <button
                        onClick={() => deleteData(data.id)}
                        className="btn fill">
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <br />
          </>
        );
      })}
    </>
  );
}
