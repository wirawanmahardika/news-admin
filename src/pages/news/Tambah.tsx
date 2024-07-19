import useFetch from "../../hooks/useFetch";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { myAxios } from "../../utils/axios";

export default function TambahNews() {
    const categories = useFetch("http://localhost:1000/api/v1/category-news")

    const handlePost = async (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        try {
            const res = await myAxios.post("http://localhost:1000/api/v1/news", formData, { headers: { "Content-Type": "multipart/form-data" } })
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
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
        />
        <form onSubmit={handlePost} method="post" className="flex flex-col gap-y-3 w-full min-h-44 items-center p-5">
            <h2 className="font-bold text-4xl mt-10">Tambah Berita</h2>
            <div className="flex flex-col gap-y-0.5 w-1/3">
                <label className="font-semibold text-lg">Judul</label>
                <input name="judul" type="text" className="outline-none border-2 border-black rounded px-1 py-0.5 focus-within:border-sky-600" />
            </div>
            <div className="flex flex-col gap-y-0.5 w-1/3">
                <label className="font-semibold text-lg">Ilustrasi</label>
                <input name="img" type="file" className="outline-none border-2 border-black rounded px-1 py-0.5 focus-within:border-sky-600" />
            </div>
            <div className="flex flex-col gap-y-0.5 w-1/3">
                <label className="font-semibold text-lg">Kategori</label>
                <input name="category" list="categories" type="text" className="outline-none border-2 border-black rounded px-1 py-0.5 focus-within:border-sky-600" />
                <datalist id="categories">
                    {categories?.map((c: any) => {
                        return <option key={c.id_category_news} value={c.id_category_news}>{c.category}</option>
                    })}
                </datalist>
            </div>

            <div className="flex flex-col gap-y-0.5 w-1/3">
                <label className="font-semibold text-lg">Content</label>
                <textarea rows={5} className="outline-none border-2 border-black rounded px-1 py-0.5 focus-within:border-sky-600" name="content" id="content"></textarea>
            </div>

            <button className="px-3 py-1 w-fit rounded font-semibold mt-5 bg-sky-500">Tambah</button>
        </form>
    </>

}

