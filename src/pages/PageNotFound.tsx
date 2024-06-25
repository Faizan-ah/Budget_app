import { useNavigate } from "react-router-dom";
import ButtonComponent from "../components/Button";
import { routes } from "../routes/Routes";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-light bg-gradient mx-auto text-center p-3 h-100 w-sm-100 w-md-75 w-lg-50">
      <h1>Page Not found</h1>;
      <ButtonComponent
        text="Back to Dashboard"
        onClick={() => navigate(routes.dashboard)}
      />
    </div>
  );
};

export default PageNotFound;
