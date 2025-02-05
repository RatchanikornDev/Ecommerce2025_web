//rafce
import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard,FolderKanban,LayoutList,ShoppingBasket,LogOut,ListOrdered  } from 'lucide-react'

const SidebarAdmin = () => {
    return (
      <div
        className="bg-sky-800 w-64 text-gray-100
        flex flex-col h-screen"
      >
        <div
          className="h-24 bg-sky-900 flex items-center
          justify-center text-2xl font-bold"
        >
          Admin panel
        </div>
  
        <nav className="flex-1 px-4 py-4 space-y-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive
                ? 'bg-sky-700 rounded-md text-white px-4 py-2 hover:bg-sky-700 flex items-center'
                : 'text-sky-300 px-4 py-2 hover:bg-sky-700 hover:text-white rounded flex items-center'
            }
          >
            <LayoutDashboard className="mr-2" />
            Dashboard
          </NavLink>
  
          <NavLink
            to="manage"
            className={({ isActive }) =>
              isActive
                ? 'bg-sky-700 rounded-md text-white px-4 py-2 hover:bg-sky-700 flex items-center'
                : 'text-sky-300 px-4 py-2 hover:bg-sky-700 hover:text-white rounded flex items-center'
            }
          >
            <FolderKanban className="mr-2" />
            Manage
          </NavLink>
  
          <NavLink
            to="Category"
            className={({ isActive }) =>
              isActive
                ? 'bg-sky-700 rounded-md text-white px-4 py-2 hover:bg-sky-700 flex items-center'
                : 'text-sky-300 px-4 py-2 hover:bg-sky-700 hover:text-white rounded flex items-center'
            }
          >
            <LayoutList className="mr-2" />
            Category
          </NavLink>
  
          <NavLink
            to="product"
            className={({ isActive }) =>
              isActive
                ? 'bg-sky-700 rounded-md text-white px-4 py-2 hover:bg-sky-700 flex items-center'
                : 'text-sky-300 px-4 py-2 hover:bg-sky-700 hover:text-white rounded flex items-center'
            }
          >
            <ShoppingBasket className="mr-2" />
            Product
          </NavLink>
  
          <NavLink
            to="orders"
            className={({ isActive }) =>
              isActive
                ? 'bg-sky-700 rounded-md text-white px-4 py-2 hover:bg-sky-700 flex items-center'
                : 'text-sky-300 px-4 py-2 hover:bg-sky-700 hover:text-white rounded flex items-center'
            }
          >
            <ListOrdered className="mr-2" />
            Order
          </NavLink>
        </nav>
  
        <div>
        <NavLink
            
            className={({ isActive }) =>
              isActive
                ? 'bg-sky-700 rounded-md text-white px-4 py-2 hover:bg-sky-700 flex items-center'
                : 'text-sky-300 px-4 py-2 hover:bg-sky-700 hover:text-white rounded flex items-center'
            }
          >
            <LogOut className="mr-2" />
            Lockout
          </NavLink>
        </div>
      </div>
    );
  };
  
  export default SidebarAdmin;