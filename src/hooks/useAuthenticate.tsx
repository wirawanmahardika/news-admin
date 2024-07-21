import { useEffect } from "react";
import { myAxios } from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function useAuthenticate() {
    const navigate = useNavigate()
    useEffect(() => {
        myAxios.get("/api/v1/check-authentication")
            .then(res => { if (!res.data) navigate("/login") })
            .catch(() => navigate("/login"))
    }, [])
}