import { useNavigate } from "react-router";
import { useLogout } from "../api/authApi";

export default function Logout() {
    const navigate = useNavigate();
    const { isLoggedOut } = useLogout();

    console.log("Logout component rendered");

    return isLoggedOut 
    ? navigate("/")
    : null;
}