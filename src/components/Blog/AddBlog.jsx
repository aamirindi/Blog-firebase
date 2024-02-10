import { useState } from "react";
import NavBar from "./NavBar";
import "../../style/AddBlog.css";
import { db } from "../Firebase";
import { addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddBlog() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    shortDesc: "",
    fullDesc: "",
    img: "",
    author: { id: auth.currentUser.uid },
    authorName: auth.currentUser.displayName,
    authorImg: auth.currentUser.photoURL,
  });

  const handleChange = (e) => {
    // console.log("Handle Change");
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData.title)
  };

  const formRef = collection(db, "blog");

  const submitHandler = async (e) => {
    e.preventDefault();

    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    if (urlRegex.test(formData.img)) {
      await addDoc(formRef, formData);
      setFormData({
        title: "",
        shortDesc: "",
        fullDesc: "",
        img: "",
        author: { id: auth.currentUser.uid },
      });
      toast.success("Blog added successfully :)", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTimeout(() => {
        navigate("/blog");
      }, 2500);
    } else {
      toast.error("Your Image must be a valid Link ☹️", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    // console.log("data submitted");
  };
  // console.log(auth.currentUser.photoURL);

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
      <div className="nav-bar-add">
        <NavBar />
      </div>
      <div className="add-blog-container">
        <div className="blog-form">
          <h2>Add Blog</h2>
          <form onSubmit={submitHandler}>
            <div className="input-container">
              <label htmlFor="title">Title:</label>
              <input
                value={formData.title}
                onChange={handleChange}
                type="text"
                id="title"
                name="title"
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="short-description">Short Description:</label>
              <input
                value={formData.shortDesc}
                onChange={handleChange}
                type="text"
                id="short-description"
                name="shortDesc"
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="full-description">Full Description:</label>
              <textarea
                value={formData.fullDesc}
                onChange={handleChange}
                id="full-description"
                name="fullDesc"
                rows="4"
                required></textarea>
            </div>
            <div className="input-container">
              <label htmlFor="img-url">Image URL:</label>
              <input
                pattern="/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i"
                value={formData.img}
                onChange={handleChange}
                type="text"
                id="img-url"
                name="img"
                required
              />
            </div>
            <button type="submit" className="add-blog-button">
              Add Blog
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
