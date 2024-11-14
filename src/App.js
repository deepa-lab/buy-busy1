import './App.css';
import Header from './components/Header';
import Products from './components/Products';
import { ToastContainer } from 'react-toastify';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SignOut from './components/SignOut';
import Cart from './components/Cart';
import Orders from './components/Orders';
import { AuthProvider } from './context/AuthContext'; // Auth context at root level
import { ProductProvider } from './context/ProductContext'; // Product context at the relevant component level

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          <SignIn />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Header />
          <SignUp />
        </>
      ),
    },
    {
      path: "/products",
      element: (
        <>
          <Header />
          <ProductProvider>
            <Products />
          </ProductProvider>
        </>
      ),
    },
    {
      path: "/cart",
      element: (
       <>
          <Header />
          <Cart />
        </>
      ),
    },
    {
      path: "/orders",
      element: (
       
          <><Header /><Orders /></>
        
      ),
    },
    {
      path: "/logout",
      element: <SignOut />,
    },
  ]);

  return (
    <div className="App">
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthProvider>
    </div>
  );
}

export default App;
