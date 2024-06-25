import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "boxicons";
import "react-circular-progressbar/dist/styles.css";

import Dashboard from "./pages/Dashboard";
import BudgetApp from "./pages/BudgetApp";
import PageNotFound from "./pages/PageNotFound";
import { routes } from "./routes/Routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.dashboard} index element={<Dashboard />}></Route>
        <Route path={routes.budgetApp} element={<BudgetApp />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
