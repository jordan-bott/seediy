import GrowingError from "../error_pages/GrowingError";
import LoginError from "../error_pages/LoginError";
import { useSelector } from "react-redux";

export default function GardenLayout() {
  const token = useSelector((state) => state.token.value);

  if (token === undefined) {
    return <LoginError />;
  }

  return <GrowingError />;
}
