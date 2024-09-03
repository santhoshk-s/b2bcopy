import { useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import {
  FaHeart,
  FaUser,
  FaBox,
  FaList,
  FaUserFriends,
  FaSignOutAlt,
} from "react-icons/fa";
import { BiSolidMessageRounded } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";
import "./Navigation.css";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      toggleMenu(); // Close the menu after logout
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative">
      <div
        className="flex items-center justify-between p-4 text-white bg-green-400 w-full fixed h-20 top-0 left-0 z-50"
        style={{ zIndex: 9999 }}
      >
        {menuOpen ? (
          <AiOutlineClose
            size={32}
            className="cursor-pointer"
            onClick={toggleMenu}
          />
        ) : (
          <AiOutlineMenu
            size={32}
            className="cursor-pointer"
            onClick={toggleMenu}
          />
        )}
        <h1 className="text-2xl">Hello {userInfo ? userInfo.username : ""}</h1>
        <IoIosNotifications size={32} />
      </div>

      <div
        className={`fixed top-0 left-0 bg-green-400 text-white w-3/4 pt-2 pl-2 z-50 transition-transform duration-300 h-full ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl">Menu</h2>
          <AiOutlineClose
            size={20}
            className="cursor-pointer"
            onClick={toggleMenu}
          />
        </div>

        <nav className="flex flex-col space-y-4 p-4">
          <Link to="/" className="flex items-center" onClick={toggleMenu}>
            <AiOutlineHome size={24} className="mr-2" /> HOME
          </Link>
          <Link to="/shop" className="flex items-center" onClick={toggleMenu}>
            <AiOutlineShopping size={24} className="mr-2" /> SHOP
          </Link>
          <Link
            to="/cart"
            className="flex items-center relative"
            onClick={toggleMenu}
          >
            <AiOutlineShoppingCart size={24} className="mr-2" /> CART
            {cartItems.length > 0 && (
              <span className="ml-2 text-xs bg-pink-500 rounded-full px-2 py-1">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>
          <Link
            to="/favorite"
            className="flex items-center relative"
            onClick={toggleMenu}
          >
            <FaHeart size={20} className="mr-2" /> FAVORITES
            <FavoritesCount />
          </Link>
          <Link to="/chat" className="flex items-center" onClick={toggleMenu}>
            <BiSolidMessageRounded size={20} className="mr-2" /> Messages
          </Link>

          {userInfo ? (
            <>
              {userInfo.seller && (
                <Link
                  to="/productlist"
                  className="flex items-center"
                  onClick={toggleMenu}
                >
                  <FaBox size={20} className="mr-2" /> Products
                </Link>
              )}
              {userInfo.isAdmin && (
                <>
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center"
                    onClick={toggleMenu}
                  >
                    <MdDashboard size={20} className="mr-2" /> Dashboard
                  </Link>
                  <Link
                    to="/admin/categorylist"
                    className="flex items-center"
                    onClick={toggleMenu}
                  >
                    <FaList size={20} className="mr-2" /> Manage Category
                  </Link>
                  <Link
                    to="/admin/userlist"
                    className="flex items-center"
                    onClick={toggleMenu}
                  >
                    <FaUserFriends size={20} className="mr-2" /> Users
                  </Link>
                  <Link
                    to="/admin/orderlist"
                    className="flex items-center"
                    onClick={toggleMenu}
                  >
                    <AiOutlineShoppingCart size={20} className="mr-2" /> Orders
                  </Link>
                </>
              )}
              <Link
                to="/profile"
                className="flex items-center"
                onClick={toggleMenu}
              >
                <FaUser size={20} className="mr-2" /> Profile
              </Link>
              <button
                onClick={logoutHandler}
                className="flex items-center text-left w-full"
              >
                <FaSignOutAlt size={20} className="mr-2" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center"
                onClick={toggleMenu}
              >
                <AiOutlineLogin size={20} className="mr-2" /> LOGIN
              </Link>
              <Link
                to="/register"
                className="flex items-center"
                onClick={toggleMenu}
              >
                <AiOutlineUserAdd size={20} className="mr-2" /> REGISTER
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
