import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  //   Still debating if I even want a countdown, will just automatically redirect for now

  useEffect(() => {
    // Redirect to the main page ("/") after a delay
    const redirectTimeout = setTimeout(() => {
      navigate("/");
    }, 0);

  
    return () => {
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

  return (
    <div>
      {/* <h1>Uh Oh!</h1>
      <p>This page does not exist</p>
      <p>Redirecting in {countdown} seconds</p> */}
    </div>
  );
};

export default NotFound;
