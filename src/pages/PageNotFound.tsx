import { useNavigate } from "react-router-dom";
import ButtonComponent from "../components/Button";
import { routes } from "../routes/Routes";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center">
      <h1>Page Not found</h1>;
      <ButtonComponent
        text="Back to home"
        onClick={() => navigate(routes.overview)}
      />
    </div>
  );
};

export default PageNotFound;
