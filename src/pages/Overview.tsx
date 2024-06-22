import ButtonComponent from "../components/Button";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";

const Overview = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Overview</h1>
      <ButtonComponent
        onClick={() => navigate(routes.budgetApp)}
        color="primary"
      />
    </div>
  );
};

export default Overview;
