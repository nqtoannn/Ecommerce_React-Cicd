import "./global.css";
import { Header } from "./components/header/header";
import { Outlet } from "react-router-dom";
// import { Bag } from "./components/cart/bag";
import { itemsApi } from "./api/data";
import { useDispatch } from "react-redux";
import { cartData, fetchData } from "./store/expense/expense-slice";
import { useEffect } from "react";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      try {
        const products = await itemsApi.fetchAllApi();
        dispatch(fetchData(products));
        console.log(products);
      } catch {
        console.log("error");
      }
    }

    async function basketData() {
      try {
        const data = await itemsApi.bagData();
        console.log(data);
        if (data) {
          dispatch(cartData(data));
        }
      } catch {
        console.log("BAgerror");
      }
    }

    getData();
    basketData();
  }, [dispatch]);

  return (
    <div
      style={{ backgroundColor: "#c6c6c6", display: "flex", paddingTop: 20 }}
    >
      <Header />
      <Outlet />
      {/* <Bag /> */}
    </div>
  );
}

export default App;
