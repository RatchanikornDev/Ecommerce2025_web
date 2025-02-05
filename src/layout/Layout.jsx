// Layout.jsx
import { Outlet } from "react-router-dom"
import MainNav from "../components/MainNav"

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100"> {/* Slightly darker background */}
      <MainNav />
      <div className="max-w-7xl mx-auto">
        <main className="px-6 lg:px-8 py-10 sm:py-12 lg:py-16"> {/* Progressive padding */}
          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 lg:p-10"> {/* Content card */}
            <Outlet/>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout