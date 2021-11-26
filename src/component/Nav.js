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
        <Link key="noCategory" to="/reviews" className="Links">
          {" "}
          All reviews{" "}
        </Link>
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
    </nav>
  );
}
