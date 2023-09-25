import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./components/Login/SignIn";
import Blog from "./components/Blog/Blog";
import SingleBlog from "./components/Blog/SingleBlog";
import AddBlog from "./components/Blog/AddBlog";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route exact path="/blog" element={<Blog />} />
        <Route exact path="/blog/:id" element={<SingleBlog />} />
        <Route exact path="/addblog" element={<AddBlog />} />
      </Routes>
    </Router>
  );
}

export default App;
