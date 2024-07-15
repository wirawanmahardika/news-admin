import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import Home from "./pages/Home"
import Login from "./pages/Login"
import TambahNews from "./pages/news/Tambah"
import NewsManagement from "./pages/news/Management"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Home />} />
        <Route path="manage-news" element={<NewsManagement />} />
        <Route path="tambah-news" element={<TambahNews />} />
      </Route>
    </>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
