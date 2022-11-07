import Header from "../Header";
import Footer from "../Footer";
import { Outlet, Link } from "react-router-dom";

function DefaultLayout() {
  return (
    <div>
      {/* test */}
      <nav>
        <ul>
          <li>
            <Link to="/">DashBoard page</Link>
          </li>
          <li>
            <Link to="/job">Job page</Link>
          </li>
          <li>
            <Link to="/salary">salary page</Link>
          </li>
          <li>
            <Link to="/product">product page</Link>
          </li>
        </ul>
      </nav>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default DefaultLayout;
