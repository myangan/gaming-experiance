import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../utils/utils";
import User from "./User";
import "../Style/NavigatorBar.css";
export default function NavBar() {
  const [categories, setCategories] = useState([]);
  useEffect(
    () => getCategories().then((category) => setCategories(category)),
    []
  );
  return (
    <ul className="NavArea">
      <div className="navBarHome">
        <li>
          <Link to="/">Home</Link>
        </li>
      </div>
      <li className="dropdown">
        <Link to="/" class="dropDown">
          Categories
        </Link>
        <div className="dropdown-content">
          {categories.map((category) => {
            return (
              <Link
                key={category.slug}
                to={`/reviews?category=${category.slug}`}
                className="links"
              >
                {category.slug}
              </Link>
            );
          })}
        </div>
      </li>
      <div className="UserSpace">
        <User />
      </div>
    </ul>
  );
}
