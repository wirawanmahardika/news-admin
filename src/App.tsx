import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import Home from "./pages/Home"
import Login from "./pages/Login"
import TambahNews from "./pages/news/Tambah"
import NewsManagement from "./pages/news/Management"
import UpdateNews from "./pages/news/Update"
import CategoryManagement from "./pages/categories/Management"
import TambahCategory from "./pages/categories/Tambah"
import UpdateCategory from "./pages/categories/Update"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Home />} />
        <Route path="manage-news" element={<NewsManagement />} />
        <Route path="tambah-news" element={<TambahNews />} />
        <Route path="update-news" element={<UpdateNews />} />

        <Route path="manage-category" element={<CategoryManagement />} />
        <Route path="tambah-category" element={<TambahCategory />} />
        <Route path="update-category" element={<UpdateCategory />} />
      </Route>
    </>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
