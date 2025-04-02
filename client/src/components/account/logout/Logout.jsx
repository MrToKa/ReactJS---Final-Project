import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLogout } from "../../api/authApi";

export default function Logout() {
    const navigate = useNavigate();
    const { isLoggedOut } = useLogout();

    useEffect(() => {
        if (isLoggedOut) {
            navigate("/");
        }
    }
    , [isLoggedOut, navigate]);

    return;
}