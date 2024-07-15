import { useEffect, useState } from "react";
import axios from "axios";

interface newsType {
    id_news: number,
    title: string, category: string,
    ilustrate: string
}

export default function NewsManagement() {
    const [news, setNews] = useState<Array<newsType>>()

    useEffect(() => {
        axios.get("http://localhost:1000/api/v1/news")
            .then(res => {
                console.log(res.data);
                setNews(res.data)
            })
    }, [])


    return <div className="p-5 w-full">
        <h2 className="font-bold text-3xl text-center">Manage News</h2>
        <table className="w-full mt-3">
            <thead>
                <tr className="text-white bg-black">
                    <th className="border-2 border-black w-1/12">#</th>
                    <th className="border-2 border-black w-5/12">Judul</th>
                    <th className="border-2 border-black w-2/12">Kategori</th>
                    <th className="border-2 border-black w-1/12">CreatedAt</th>
                    <th className="border-2 border-black w-3/12">Action</th>
                </tr>
            </thead>
            <tbody>
                <NewsDisplay news={news} />
            </tbody>
        </table>
    </div>
}

const NewsDisplay = ({ news }: { news?: newsType[] }): (JSX.Element[] | undefined) => {
    const deleteNews = async (id: number) => {
        try {
            const res = await axios.delete("http://localhost:1000/api/v1/news/" + id)
            console.log(res.data);

        } catch (error: any) {
            console.log(error);
        }
    }

    return news?.map((n, i) => {
        return <tr key={i}>
            <td className="border-2 border-black p-0.5 text-center">{i + 1}</td>
            <td className="border-2 border-black p-0.5 text-center">{n.title}</td>
            <td className="border-2 border-black p-0.5 text-center">{n.category}</td>
            <td className="border-2 border-black p-0.5 text-center">
                12/23/2024
            </td>
            <td className="border-2 border-black p-0.5 text-center">
                <div className="flex justify-center flex-wrap gap-2 w-full">
                    <button className="w-20 px-2 py-0.5 rounded bg-emerald-500">Update</button>
                    <button className="w-20 px-2 py-0.5 rounded bg-orange-500 ">Ilustrate</button>
                    <button onClick={() => deleteNews(n.id_news)} className="w-20 px-2 py-0.5 rounded bg-red-500 ">Delete</button>
                </div>
            </td>
        </tr>
    })
}