import {
  createBrowserRouter,
  RouterProvider,Outlet
} from "react-router-dom";
import { useEffect } from "react";

import LoginPage from './pages/login';
import RegisterPage from "./pages/register";
import UserPage from "./pages/user";
import BookPage from "./pages/book";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import { callFetchAccount } from "./services/api";
import { doGetAccountAction } from "./redux/account/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./components/Loading";
import NotFound from "./components/NotFound";
import AdminPage from "./pages/admin";
import ProtecttedRoute from "./components/ProtecttedRoute";
import './styles/reset.scss';
import LayoutAdmin from "./components/admin/LayoutAdmin";
const Layout = () => {
  return (
    <div className="layout-app">
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
// const LayoutAdmin = () => {
//   const isAdminRoute = window.location.pathname.startsWith('/admin');
//   const user = useSelector(state => state.account.user);
//   const userRole = user.role;
  
//   return (
//     <div className="layout-app">
//       {isAdminRoute && userRole === 'ADMIN' &&  <Header/>}
     
//       <Outlet/>
//       {isAdminRoute && userRole === 'ADMIN' &&  <Footer/>}

//     </div>
//   )
// }

export default function App() {

  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.account.isLoading);
  

  const getAccount = async () => {
    if(window.location.pathname === '/login' 
        || window.location.pathname === '/register' ) return
    const res = await callFetchAccount();
    if(res && res.data){
      dispatch(doGetAccountAction(res.data.user));
    }
  }
  useEffect(() => {
    getAccount();
  },[]);
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      errorElement: <NotFound/>,
      children: [
        {index: true, element: <Home/>},
        {path: "book", element: <BookPage/>},
      ]
    },
    {
      path: "/admin",
      element: <LayoutAdmin/>,
      errorElement: <NotFound/>,
      children: [
        {index: true, element: <ProtecttedRoute><AdminPage/></ProtecttedRoute>},
        {path: "user", element: <ProtecttedRoute><UserPage/></ProtecttedRoute>},
        {path: "book", element: <ProtecttedRoute><BookPage/></ProtecttedRoute>},
      ]
    },
    {
      path: "/login",
      element: <LoginPage/>,
    },
    {
      path: "/register",
      element: <RegisterPage/>,
    }
  ]);
  return (
    <>
      {
        isLoading === false 
        || window.location.pathname === "/login" 
        || window.location.pathname === '/register'
        || window.location.pathname === '/'
        ? <RouterProvider router={router} />
        :<Loading/>
      }
    </>
    
    
  );
}
