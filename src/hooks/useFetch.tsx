import { useEffect, useState } from "react";
import { myAxios } from "../utils/axios";

export default function useFetch(url: string) {
    const [data, setData] = useState([])

    useEffect(() => {
        myAxios.get(url)
            .then(res => {
                setData(res.data)
            })
    }, [])

    return data
}