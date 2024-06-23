import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "boxicons";

import Overview from "./pages/Overview";
import BudgetApp from "./pages/BudgetApp";
import PageNotFound from "./pages/PageNotFound";
import { routes } from "./routes/Routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.overview} index element={<Overview />}></Route>
        <Route path={routes.budgetApp} element={<BudgetApp />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
