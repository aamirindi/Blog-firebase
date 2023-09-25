import { getAuth } from "firebase/auth";
import "../../style/NavBar.css";
// import useAnimation from "../../hooks/useAnimation";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function NavBar() {
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const logOut = () => {
    auth.signOut();
    navigate("/");
  };

  // console.log(useLocation());
  // console.log(getAuth());
  // useAnimation("animation");
  return (
    <>
      <div className="user-content">
        <div className="user">
          <img
            className="user-img"
            src={auth?.currentUser.photoURL}
            alt="user-profile-pic"
          />
          <h1>
            Welcome, <span> {auth?.currentUser.displayName}</span>!
          </h1>
        </div>

        <div className="email">
          <div className="add-blog">
            {location.pathname === "/blog" && (
              <Link to={"/addblog"} className="btn add-blog">
                Add Blog
              </Link>
            )}
            {location.pathname !== "/blog" && (
              <Link to={"/blog"} className="btn add-blog">
                Back to Blog
              </Link>
            )}
          </div>
          <div className="log-out" onClick={logOut}>
            Log out
          </div>
          {/* <h3>
            Currently using: <span>{auth?.currentUser.email}</span>
          </h3> */}
        </div>
      </div>
    </>
  );
}
