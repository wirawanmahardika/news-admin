import { useLocation, useNavigate } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
import { useEffect } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { myAxios } from "../../utils/axios";

export default function UpdateNews() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const categories = useFetch("http://localhost:1000/api/v1/category-news")

    useEffect(() => {
        if (!state) navigate(-1)
    }, [])


    const handlePost = async (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        formData.append("id_news", state.id_news)

        try {
            const res = await myAxios.patch("http://localhost:1000/api/v1/news", formData,
                { headers: { "Content-Type": "multipart/form-data" } })
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


    return <>
        <ToastContainer />

        <form onSubmit={handlePost} className="flex flex-col gap-y-3 w-full min-h-44 items-center p-5">
            <h2 className="font-bold text-4xl mt-10">Update Berita</h2>
            <div className="flex flex-col gap-y-0.5 w-1/3">
                <label className="font-semibold text-lg">Judul</label>
                <input name="title" type="text" defaultValue={state?.title} className="outline-none border-2 border-black rounded px-1 py-0.5 focus-within:border-sky-600" />
            </div>
            <div className="flex flex-col gap-y-0.5 w-1/3">
                <label className="font-semibold text-lg">Ilustrasi <i className="font-thin text-xs text-red-600 font-roboto">optional</i></label>
                <input name="img" type="file" className="outline-none border-2 border-black rounded px-1 py-0.5 focus-within:border-sky-600" />
            </div>
            <div className="flex flex-col gap-y-0.5 w-1/3">
                <label className="font-semibold text-lg">Kategori</label>
                <input name="id_category_news" defaultValue={state?.id_category} list="categories" type="text" className="outline-none border-2 border-black rounded px-1 py-0.5 focus-within:border-sky-600" />
                <datalist id="categories">
                    {categories?.map((c: any) => {
                        return <option key={c.id_category_news} value={c.id_category_news}>{c.category}</option>
                    })}
                </datalist>
            </div>

            <div className="flex flex-col gap-y-0.5 w-1/3">
                <label className="font-semibold text-lg">Content</label>
                <textarea rows={5} defaultValue={state?.content} className="outline-none border-2 border-black rounded px-1 py-0.5 focus-within:border-sky-600" name="content" id="content"></textarea>
            </div>

            <button type="submit" className="px-3 py-1 w-fit rounded font-semibold mt-5 bg-sky-500">Update</button>
        </form>
    </>
}