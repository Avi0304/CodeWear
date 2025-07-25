import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoBarChart } from "react-icons/io5";
import {
  LuShoppingCart,
  LuPackage,
  LuUsers,
  LuLogOut,
  LuBell,
  LuSettings,
  LuX,
} from "react-icons/lu";
import { HiMenuAlt3 } from "react-icons/hi";

const Sidebar = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [username, setUsername] = useState('Admin');
  const router = useRouter();

  const navItems = [
    { id: "overview", label: "Overview", icon: IoBarChart, Link: "/admin" },
    { id: "orders", label: "Orders", icon: LuShoppingCart, Link: "/admin/order" },
    { id: "products", label: "Products", icon: LuPackage, Link: "/admin/products" },
    { id: "customers", label: "Customers", icon: LuUsers, Link: "/admin/customers" },
  ];

  useEffect(() => {
    const user = localStorage.getItem('myuser');
    if (user) {
      const parsedUser = JSON.parse(user);
      const token = parsedUser.token;

      if (token) {
        fetch('/api/getuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        }).then((res) => res.json())
          .then((data) => {
            if (data?.Name) {
              setUsername(data.Name);
            }
          })
          .catch((err) => {
            console.error('Failed to fetch user:', err);
          });
      }
    }
  }, [])

  const Logout = () => {
    localStorage.removeItem("myuser");
    router.push('/admin/login')
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 sticky top-0 h-screen z-40">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
              <LuPackage className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">CodeWear Admin</h1>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = router.pathname === item.Link;
              return (
                <Link href={item.Link} key={item.id} legacyBehavior>
                  <a
                    className={`flex items-center px-4 py-2 rounded-lg text-sm transition ${isActive
                      ? "bg-gradient-to-r text-white from-pink-500 to-rose-600 shadow-lg font-bold"
                      : "hover:bg-gray-100 hover:font-bold text-gray-700"
                      } font-medium`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </a>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-full bg-white border-r border-gray-200 p-6 transition-transform duration-300 md:hidden ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setIsSidebarOpen(false)}>
            <LuX className="w-6 h-6" />
          </button>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = router.pathname === item.Link;
            return (
              <Link href={item.Link} key={item.id} legacyBehavior>
                <a
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition ${isActive
                    ? "bg-gradient-to-r text-white from-pink-500 to-rose-600 shadow-lg"
                    : "hover:bg-gray-100 text-gray-700"
                    }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </a>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Sticky Topbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4 shadow-sm flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-gray-700"
            >
              <HiMenuAlt3 className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3 relative">
            <button className="flex items-center px-3 py-1.5 border border-gray-200 rounded text-sm text-gray-700 hover:shadow hover:bg-gray-50 font-semibold">
              <LuBell className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Notifications</span>
            </button>
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center px-3 py-1.5 border border-gray-200 rounded text-sm text-gray-700 hover:shadow hover:bg-gray-50 font-semibold"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-r  from-pink-500 to-rose-600 flex items-center justify-center mr-2 text-xs font-bold text-white">
                  AP
                </div>
                <span className="hidden sm:inline">{username}</span>
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-50">
                  <button className="w-full px-4 py-2 hover:cursor-pointer text-sm text-left hover:bg-gray-100 flex items-center">
                    <LuSettings className="w-4 h-4 mr-2" />
                    Settings
                  </button>
                  <button
                    onClick={Logout}
                    className="w-full hover:cursor-pointer px-4 py-2 text-sm text-left hover:bg-gray-100 flex items-center text-red-600"
                  >
                    <LuLogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default Sidebar;
