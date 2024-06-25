import ButtonComponent from "../components/Button";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";

const Overview = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-light bg-gradient mx-auto p-3 h-100 w-sm-100 w-md-75 w-lg-50">
      <h1>Overview</h1>
      <ButtonComponent
        onClick={() => navigate(routes.budgetApp)}
        color="primary"
      />
    </div>
  );
};

export default Overview;
