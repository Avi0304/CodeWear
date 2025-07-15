import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";


export default function App({ Component, pageProps }) {

  const [cart, setCart] = useState({});
  const [subtotal, setsubTotal] = useState(0);
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const isAdminRoute = router.pathname.startsWith('/admin');

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("userId");
      setUserId(id);
    }
  }, []);

  useEffect(() => {

    router.events.on('routeChangeStart', () => {
      setProgress(40);
    })

    router.events.on('routeChangeComplete', () => {
      setProgress(100);
    })
    console.log("Hey, i am app.js");
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
      console.error("Error", error);
      localStorage.clear()
    }
    const myuser = JSON.parse(localStorage.getItem("myuser"))
    if (myuser) {
      setUser({ value: myuser.token, email: myuser.email })
      setKey(Math.random())
    }

  }, [router.query])

  const logout = () => {
    localStorage.removeItem("myuser");
    setUser({ value: null });
    setKey(Math.random());
    router.push("/")
  }

  const saveCart = (mycart) => {
    localStorage.setItem("cart", JSON.stringify(mycart))
    let subt = 0;
    let keys = Object.keys(mycart)
    for (let i = 0; i < keys.length; i++) {
      subt = mycart[keys[i]].price * mycart[keys[i]].qty
    }
    setsubTotal(subt)
  }

  const clearCart = () => {
    setCart({})
    saveCart({})
  }

  const AddtoCart = (itemcode, qty, price, name, size, variant,img) => {

    if(Object.keys(cart).length === 0){
      setKey(Math.random())
    }

    let newCart = cart;
    if (itemcode in cart) {
      newCart[itemcode].qty = cart[itemcode].qty + qty;
    }
    else {
      newCart[itemcode] = { qty: 1, price, name, size, variant, img }
    }
    setCart(newCart);
    saveCart(newCart);
  }

  const buyNow = (itemcode, qty, price, name, size, variant,img) => {
    let newCart= {}
    newCart[itemcode] =  { qty: 1, price, name, size, variant, img } 
    setCart(newCart);
    saveCart(newCart)
    router.push('/checkout')
  }

  const removeFromCart = (itemcode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemcode in cart) {
      newCart[itemcode].qty = cart[itemcode].qty - qty;
    }
    if (newCart[itemcode]["qty"] <= 0) {
      delete newCart[itemcode]
    }

    setCart(newCart);
    saveCart(newCart);
  }

  return <>
    <LoadingBar
      color="#ff2d55"
      progress={progress}
      waitingTime={400}
      onLoaderFinished={() => setProgress(0)}
    />
    {!isAdminRoute && <Navbar Logout={logout} user={user} key={key} buyNow={buyNow} cart={cart} AddtoCart={AddtoCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} />}
    <Component userId={userId} buyNow={buyNow} cart={cart} AddtoCart={AddtoCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} {...pageProps} />
   {!isAdminRoute && <Footer />}
  </>
}
