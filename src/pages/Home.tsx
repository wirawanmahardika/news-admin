import { useEffect, useState } from "react"
import { myAxios } from "../utils/axios"
import { newsType } from "../types/news"
import { categoryType } from "../types/category"


export default function Home() {
    const displayCategories = useGetCategoriesElements()
    const displayNews = useGetNewsElements()

    return <div className="w-full h-[92vh] overflow-y-auto flex flex-col gap-y-3 p-4 bg-slate-200">
        <div className="p-3 rounded bg-white">
            <h2 className="font-bold text-3xl mb-4">Kategori Berita</h2>
            <div className="grid grid-cols-4 grid-rows-1 gap-4">{displayCategories}</div>
        </div>

        <div className="p-3 rounded bg-white mt-5">
            <h2 className="font-bold text-3xl">Berita</h2>

            <h4 className="text-xl font-poetsenOne text-sky-600 mt-2">Terbaru</h4>
            <div className="grid grid-cols-4 grid-rows-1 gap-4">{displayNews}</div>
        </div>
    </div>
}

const useGetCategoriesElements = () => {
    const [categories, setCategories] = useState<Array<categoryType>>()
    useEffect(() => {
        myAxios.get("http://localhost:1000/api/v1/category-news")
            .then(async res => {
                const resData: categoryType[] = res.data
                if (resData && resData.length > 0) {
                    for (const n of resData) {
                        const res = await myAxios.get(n.ilustrate, { responseType: "blob" })
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

    return categories?.map((n) => {
        return <div onClick={() => window.location.href = n.url} key={n.id_category_news} className="rounded flex flex-col gap-y-1 text-center border-2 border-black cursor-pointer">
            <img src={n.ilustrate} alt={n.category} />
            <span className="font-semibold text-lg">{n.category}</span>
        </div>
    })
}

const useGetNewsElements = () => {
    const [news, setNews] = useState<Array<newsType>>()
    useEffect(() => {
        myAxios.get("http://localhost:1000/api/v1/news")
            .then(async res => {
                const resData: newsType[] = res.data.news
                if (resData && resData.length > 0) {
                    for (const n of resData) {
                        const res = await myAxios.get(n.ilustrate, { responseType: "blob" })
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

    return news?.map(n => {
        return <div onClick={() => window.location.href = n.url} key={n.id_news} className="rounded flex flex-col gap-y-1 text-center border-2 border-black cursor-pointer">
            <img src={n.ilustrate} alt={n.category} />
            <span>{n.title}</span>
        </div>
    })
}