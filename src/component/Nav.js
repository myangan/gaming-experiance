import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../utils/utils";
import User from "./User";
export default function NavBar() {
  const [categories, setCategories] = useState([]);
  useEffect(
    () => getCategories().then((category) => setCategories(category)),
    []
  );
  return (
    <ul className="NavArea">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li className="dropdown">
        <Link to="javascript:void(0)" class="dropbtn">
          Categories
        </Link>
        <div className="dropdown-content">
          {categories.map((category) => {
            return (
              <Link
                key={category.slug}
                to={`/reviews?category=${category.slug}`}
                className="Links"
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
