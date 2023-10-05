import { useNavigate } from "react-router-dom";
import { Button } from "./@/components/ui/button";

export default function () {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/users", { replace: true });
  };
  return <Button onClick={handleClick}>Render Users</Button>;
}
