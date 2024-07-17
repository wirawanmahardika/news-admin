import axios from "axios"
import { useEffect, useState } from "react"


interface newsType {
    id_news: number,
    title: string, category: string,
    ilustrate: string
}

interface categoryType {
    id_category_news: number,
    category: string,
    ilustrate: string,
    created_at: string
}


export default function Home() {
    const [news, setNews] = useState<Array<newsType>>()
    useEffect(() => {
        axios.get("http://localhost:1000/api/v1/news")
            .then(async res => {
                const resData: newsType[] = res.data
                if (resData && resData.length > 0) {
                    for (const n of resData) {
                        const res = await axios.get(n.ilustrate, { responseType: "blob" })
                        const url = URL.createObjectURL(res.data)
                        n.ilustrate = url;
                    }
                    setNews(resData)
                }
            })

        return () => {
            if (news?.length) {
                news.forEach(n => {
                    URL.revokeObjectURL(n.ilustrate)
                })
            }
        }
    }, [])


    const [categories, setCategories] = useState<Array<categoryType>>()
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
                    setCategories(resData)
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



    const displayCategories = categories?.map((n) => {
        return <div key={n.id_category_news} className="rounded flex flex-col gap-y-1 text-center border-2 border-black cursor-pointer">
            <img src={n.ilustrate} alt={n.category} />
            <span className="font-semibold text-lg">{n.category}</span>
        </div>
    })

    const displayNews = news?.map(n => {
        return <div key={n.id_news} className="rounded flex flex-col gap-y-1 text-center border-2 border-black cursor-pointer">
            <img src={n.ilustrate} alt={n.category} />
            <span>{n.title}</span>
        </div>
    })


    return <div className="w-full h-[92vh] overflow-y-auto flex flex-col gap-y-3 p-4 bg-slate-200">

        <div className="p-3 rounded bg-white">
            <h2 className="font-bold text-3xl mb-4">Kategori Berita</h2>
            <div className="grid grid-cols-4 grid-rows-1 gap-4">{displayCategories}</div>
        </div>

        <div className="p-3 rounded bg-white mt-5">
            <h2 className="font-bold text-3xl">Berita</h2>

            <h4 className="text-xl font-poetsenOne text-sky-600 mt-2">Terbaru</h4>
            <div className="grid grid-cols-4 grid-rows-1 gap-4">{displayNews}</div>

            {/* <h4 className="text-xl font-poetsenOne text-sky-600 mt-8">Terlama</h4>
            <div className="grid grid-cols-4 grid-rows-1 gap-2">
                <div className="rounded flex flex-col gap-y-1 text-center border-2 border-black cursor-pointer">
                    <img src="/img/komputer-8.jpg" alt="afd" />
                    <span>Genosida yang tak terhentikan</span>
                </div>

                <div className="rounded flex flex-col gap-y-1 text-center border-2 border-black cursor-pointer">
                    <img src="/img/komputer-8.jpg" alt="afd" />
                    <span>Genosida yang tak terhentikan</span>
                </div>
            </div> */}
        </div>


    </div>
}