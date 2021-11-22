import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../utils/utils";
export default function NavBar() {
  const [categories, setCategories] = useState([]);
  useEffect(
    () => getCategories().then((category) => setCategories(category)),
    []
  );
  return (
    <nav className="dropdown">
      <button className="dropbtn">Categories</button>
      <div className="dropdown-content">
        {categories.map((category) => {
          return (
            <Link
              key={category.slug}
              to={`/reviews?categories=${category.slug}`}
              className="Links"
            >
              {category.slug}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
