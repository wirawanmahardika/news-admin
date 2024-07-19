import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { newsType } from "../../types/news";
import { newsActionReducer, newsReducer } from "../../reducer/news";
import { myAxios } from "../../utils/axios";

export default function NewsManagement() {
    const [news, dispatch] = useReducer(newsReducer, [])
    const [ilustrate, setIlustrate] = useState<string>("")

    useEffect(() => {
        myAxios.get("http://localhost:1000/api/v1/news")
            .then(async res => {
                const resData: newsType[] = res.data
                if (resData && resData.length > 0) {
                    for (const n of resData) {
                        const res = await myAxios.get(n.ilustrate, { responseType: "blob" })
                        const url = URL.createObjectURL(res.data)
                        n.ilustrate = url;
                    }
                    dispatch({ type: "add-all", payload: { news: resData } })
                }
            })

        return () => {
            if (news?.length) {
                news.forEach((n) => {
                    URL.revokeObjectURL(n.ilustrate)
                })
            }
        }
    }, [])


    return <>
        <ToastContainer />
        <div className="p-5 w-full">
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
                    <NewsDisplay news={news} setIlustrate={setIlustrate} dispatch={dispatch} />
                </tbody>
            </table>
        </div>

        {
            ilustrate && news && news.length &&
            <div onClick={() => setIlustrate("")} className="fixed inset-0 backdrop-blur-sm flex items-center justify-center">
                <img src={ilustrate} alt="ilustrasi" className="w-2/5" />
            </div>
        }
    </>
}

const NewsDisplay = ({ news, setIlustrate, dispatch }: {
    news?: newsType[];
    setIlustrate: React.Dispatch<React.SetStateAction<string>>;
    dispatch: React.Dispatch<newsActionReducer>
}): (JSX.Element[] | undefined) => {
    const navigate = useNavigate()
    const updateHandle = (news: newsType) => navigate("/update-news", { state: news })
    const deleteNews = async (id: number) => {
        try {
            if (!confirm("Anda yakin ingin menghapus berita tersebut??")) return
            const res = await myAxios.delete("http://localhost:1000/api/v1/news/" + id)
            toast.success(res.data, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            dispatch({ type: "delete", payload: { id_news: id } })
        } catch (error: any) {
            if (!error.response) return;
            toast.error(error.response?.data, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            })
        }
    }

    return news?.map((n, i) => {
        return <tr className="hover:bg-sky-300" key={i}>
            <td className="border-2 border-black p-0.5 text-center">{i + 1}</td>
            <td className="border-2 border-black p-0.5 text-center cursor-pointer hover:text-sky-600"><a href={n.url}> {n.title}</a></td>
            <td className="border-2 border-black p-0.5 text-center">{n.category}</td>
            <td className="border-2 border-black p-0.5 text-center">
                12/23/2024
            </td>
            <td className="border-2 border-black p-0.5 text-center">
                <div className="flex justify-center flex-wrap gap-2 w-full">
                    <button onClick={() => updateHandle(n)} className="w-20 px-2 py-0.5 rounded bg-emerald-500">Update</button>
                    <button onClick={() => setIlustrate(n.ilustrate)} className="w-20 px-2 py-0.5 rounded bg-orange-500 ">Ilustrate</button>
                    <button onClick={() => deleteNews(n.id_news)} className="w-20 px-2 py-0.5 rounded bg-red-500 ">Delete</button>
                </div>
            </td>
        </tr>
    })
}