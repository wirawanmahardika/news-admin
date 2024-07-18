import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { categoryType } from "../../types/category";
import { categoryActionReducer, categoryReducer } from "../../reducer/category";

export default function CategoryManagement() {
    // const [categories, setCategories] = useState<Array<categoryType>>()
    const [categories, dispatch] = useReducer(categoryReducer, [])

    const [ilustrate, setIlustrate] = useState<string>("")

    useEffect(() => {
        axios.get("http://localhost:1000/api/v1/category-news")
            .then(async res => {
                const resData: categoryType[] = res.data
                if (resData && resData.length > 0) {
                    for (const n of resData) {
                        const res = await axios.get(n.ilustrate, { responseType: "blob" })
                        const url = URL.createObjectURL(res.data)
                        n.ilustrate = url;
                    }
                    dispatch({ type: "add-all", payload: { categories: resData } })
                }
            })

        return () => {
            if (categories?.length) {
                categories.forEach(n => {
                    URL.revokeObjectURL(n.ilustrate)
                })
            }
        }
    }, [])


    return <>
        <ToastContainer />
        <div className="p-5 w-full">
            <h2 className="font-bold text-3xl text-center">Manage Category</h2>
            <table className="w-full mt-3">
                <thead>
                    <tr className="text-white bg-black">
                        <th className="border-2 border-black w-1/6">#</th>
                        <th className="border-2 border-black w-2/6">Kategori</th>
                        <th className="border-2 border-black w-1/6">CreatedAt</th>
                        <th className="border-2 border-black w-2/6">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <CategoriesDisplay dispatch={dispatch} categories={categories} setIlustrate={setIlustrate} />
                </tbody>
            </table>
        </div>

        {
            ilustrate && categories && categories.length &&
            <div onClick={() => setIlustrate("")} className="fixed inset-0 backdrop-blur-sm flex items-center justify-center">
                <img src={ilustrate} alt="ilustrasi" className="w-2/5" />
            </div>
        }
    </>
}

const CategoriesDisplay = ({ categories, setIlustrate, dispatch }: {
    categories?: categoryType[];
    setIlustrate: React.Dispatch<React.SetStateAction<string>>;
    dispatch: React.Dispatch<categoryActionReducer>
}): (JSX.Element[] | undefined) => {
    const navigate = useNavigate()
    const updateHandle = (category: categoryType) => navigate("/update-category", { state: category })
    const deleteNews = async (id: number) => {
        try {
            if (!confirm("Anda yakin ingin menghapus kategori berita tersebut??"))
                return

            const res = await axios.delete("http://localhost:1000/api/v1/category-news/" + id)
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

            if (res.status < 300)
                dispatch({ type: "delete", payload: { id_category_news: id } })

        } catch (error: any) {
            console.log(error);
        }
    }

    return categories?.map((n, i) => {
        return <tr className="hover:bg-sky-300" key={i}>
            <td className="border-2 border-black p-0.5 text-center">{i + 1}</td>
            <td className="border-2 border-black p-0.5 text-center cursor-pointer hover:text-sky-600">
                <a href={n.url}>{n.category}</a>
            </td>
            <td className="border-2 border-black p-0.5 text-center">
                {n.created_at}
            </td>
            <td className="border-2 border-black p-0.5 text-center">
                <div className="flex justify-center flex-wrap gap-2 w-full">
                    <button onClick={() => updateHandle(n)} className="w-20 px-2 py-0.5 rounded bg-emerald-500">Update</button>
                    <button onClick={() => setIlustrate(n.ilustrate)} className="w-20 px-2 py-0.5 rounded bg-orange-500 ">Ilustrate</button>
                    <button onClick={() => deleteNews(n.id_category_news)} className="w-20 px-2 py-0.5 rounded bg-red-500 ">Delete</button>
                </div>
            </td>
        </tr>
    })
}