import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useEcomStore from '../store/ecom-store'
import {
  ShoppingCart,
  Home,
  Store,
  Menu,
  X,
  ChevronDown,
  UserPlus,
  LogIn,
  LogOut,
  History,
  User,
} from 'lucide-react'

const MainNav = () => {
  const navigate = useNavigate()
  const carts = useEcomStore((state) => state.carts)
  const user = useEcomStore(state => state.user)
  const logout = useEcomStore((state) => state.logout)

  const [isOpen, setIsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleDropDown = () => setIsOpen(!isOpen)
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  const handleLogout = () => {
    logout()
    navigate('/') // นำผู้ใช้กลับไปหน้า Home โดยตรง
    setIsOpen(false)
    setIsMobileMenuOpen(false)
  }

  const NavLinks = () => (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isActive
              ? 'bg-indigo-600 text-white'
              : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-700'
          }`
        }
      >
        <Home className="w-4 h-4" />
        หน้าแรก
      </NavLink>

      <NavLink
        to="/shop"
        className={({ isActive }) =>
          `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isActive
              ? 'bg-indigo-600 text-white'
              : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-700'
          }`
        }
      >
        <Store className="w-4 h-4" />
        ร้านค้า
      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) =>
          `flex items-center gap-2 px-4 py-2 rounded-lg relative transition-colors ${
            isActive
              ? 'bg-indigo-600 text-white'
              : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-700'
          }`
        }
      >
        <ShoppingCart className="w-4 h-4" />
        ตะกร้า
        {carts.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {carts.length}
          </span>
        )}
      </NavLink>
    </>
  )

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-2xl font-bold text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Ratchanikorn
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <NavLinks />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative flex items-center">
                <button
                  onClick={toggleDropDown}
                  className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full hover:bg-indigo-100 transition-colors"
                >
                  <img
                    className="w-9 h-9 rounded-full object-cover"
                    src={user.avatar || "https://cdn.iconscout.com/icon/free/png-512/free-avatar-icon-download-in-svg-png-gif-file-formats--user-business-man-avatars-flat-icons-pack-people-456324.png?f=webp&w=256"}
                    alt="User Avatar"
                  />
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="absolute top-16 right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                    <Link
                      to="/user/history"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-indigo-50 transition-colors"
                    >
                      <History className="w-4 h-4" />
                      ประวัติ
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-indigo-50 transition-colors text-red-500"
                    >
                      <LogOut className="w-4 h-4" />
                      ออกจากระบบ
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `flex items-center gap-2 ${
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-600 hover:bg-indigo-700 hover:text-white'
                    } px-4 py-2 rounded-lg transition-colors`
                  }
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">สมัครสมาชิก</span>
                </NavLink>

                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `flex items-center gap-2 ${
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-600 hover:bg-indigo-700 hover:text-white'
                    } px-4 py-2 rounded-lg transition-colors`
                  }
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">เข้าสู่ระบบ</span>
                </NavLink>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-indigo-600 hover:text-indigo-700"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-16 bg-white shadow-lg">
            <div className="flex flex-col gap-2 p-4">
              <NavLinks />

              {user ? (
                <div className="border-t pt-2 mt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-indigo-50 transition-colors text-red-500"
                  >
                    <LogOut className="w-4 h-4" />
                    ออกจากระบบ
                  </button>
                </div>
              ) : (
                <div className="border-t pt-2 mt-2 flex flex-col gap-2">
                  <NavLink
                    to="/register"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-indigo-50 transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    สมัครสมาชิก
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-indigo-50 transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    เข้าสู่ระบบ
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default MainNav
