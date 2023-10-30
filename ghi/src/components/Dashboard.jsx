import { useLoginMutation, useGetUserQuery } from "../store/apiSlice";
import { set } from "../store/tokenSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [loginUser] = useLoginMutation();
  const token = useSelector((state) => state.token.value);
  const { data } = useGetUserQuery(token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await loginUser({ username: "test3", password: "string" });
    dispatch(set(result.data.access_token));
  };

  return (
    <>
      <button onClick={handleSubmit}>Login!</button>;<p>{data?.username}</p>
      <button onClick={() => navigate("/")}>Go Home!</button>
    </>
  );
}
