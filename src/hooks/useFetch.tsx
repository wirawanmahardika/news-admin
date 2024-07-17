import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetch(url: string) {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(url)
            .then(res => {
                setData(res.data || res.data.data)
            }).catch(err => {
                console.log(err);
            })
    }, [])

    return data
}