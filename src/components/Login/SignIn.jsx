import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";
import "../../style/SignIn.css";
import useAnimation from "../../hooks/useAnimation";

export default function SignIn() {
  const navigate = useNavigate();
  const googleClick = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/blog");
  };
  useAnimation("animation");
  return (
    <div className="sign-in animation slide_up">
      <h1>
        Welcome to <br />
        <span>Blog</span>!
      </h1>
      <button className="btn" onClick={googleClick}>
        Google Sign In
      </button>
    </div>
  );
}
