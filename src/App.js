import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import Main from "./component/Main";
import NavBar from "./component/Nav";
import Reviews from "./component/Reviews";
import User from "./component/User";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <NavBar />
        <User />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/reviews" element={<Reviews />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
