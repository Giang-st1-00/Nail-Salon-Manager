import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";

import { publicRoutes } from "./routes";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          {publicRoutes.map((route, index) => {
            const Page: any = route?.component;
            return <Route key={index} path={route?.path} element={<Page />} />;
          })}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
