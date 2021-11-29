import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import Main from "./component/Main";
import NavBar from "./component/Nav";
import Reviews from "./component/Reviews";
import SignUp from "./component/SignUp";
import SingleReview from "./component/singleReviews";
import { UserProvider } from "./context/userContext";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <BrowserRouter>
          <Header />
          <NavBar />
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/reviews" element={<Reviews />}></Route>
            <Route
              path="/reviews/:reviews_id"
              element={<SingleReview />}
            ></Route>
            <Route
              path="/reviews/:reviews_id/comments"
              element={<SingleReview />}
            ></Route>
            <Route path="/users/signup" element={<SignUp />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;
