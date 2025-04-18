import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { myAxios } from "../../utils/axios";

export default function UpdateCategory() {
    const navigate = useNavigate()
    const { state } = useLocation()

    useEffect(() => {
        if (!state) navigate(-1)
    }, [])

    const handlePost = async (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        formData.append("id_category_news", state.id_category_news)

        try {
            const res = await myAxios.patch("/api/v1/category-news",
                formData, { headers: { "Content-Type": "multipart/form-data" } })
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
        <form onSubmit={handlePost} method="post" className="flex flex-col gap-y-3 w-full min-h-44 items-center p-5">
            <h2 className="font-bold text-4xl mt-10 mb-7">Update Kategori Berita</h2>

            <div className="flex flex-col gap-y-0.5 w-1/3">
                <label className="font-semibold text-lg">Kategori</label>
                <input defaultValue={state.category} name="category" type="text" className="outline-none border-2 border-black rounded px-1 py-0.5 focus-within:border-sky-600" />
            </div>

            <div className="flex flex-col gap-y-0.5 w-1/3">
                <label className="font-semibold text-lg">Ilustrasi</label>
                <input name="img" type="file" className="outline-none border-2 border-black rounded px-1 py-0.5 focus-within:border-sky-600" />
            </div>

            <button className="px-3 py-1 w-fit rounded font-semibold mt-5 bg-sky-500">Update</button>
        </form>
    </>

}

