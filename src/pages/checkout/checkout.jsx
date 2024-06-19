import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { itemsApi } from "../../api/data";
import { cartData } from "../../store/expense/expense-slice";
import { Details } from "../../components/details/details";
import { FaCcMastercard } from "react-icons/fa";
import { IoGift } from "react-icons/io5";
import { BiCheckboxSquare } from "react-icons/bi";
import { RxChevronLeft } from "react-icons/rx";
import { Price } from "./checkoutContainer";
import s from "./style/style.module.css";

export function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((product) => Object.values(product.shop.cart));

  const [totals, setTotals] = useState(0);
  const [topTotal, setTopTotal] = useState(0);

  const basketData = useCallback(async () => {
    try {
      let data = await itemsApi.bagData();
      console.log(data);

      if (data) {
        dispatch(cartData(data));
      }
    } catch (error) {
      console.log("BAgerror", error);
    }
  }, [dispatch]);

  const TotalPrice = useCallback(() => {
    let total = 0;
    let shipping = 6.99;
    let gpt = 760.41;
    let card = 0.00;
    let top = 0;

    cart.forEach((product) => {
      total += product.price * product.count;
    });

    const roundedTotal = parseFloat(total.toFixed(2));
    setTotals(roundedTotal);

    top = roundedTotal + shipping + gpt + card;
    const finalTopTotal = parseFloat(top.toFixed(2));

    setTopTotal(finalTopTotal);
  }, [cart]);

  useEffect(() => {
    basketData();
  }, [basketData]);

  useEffect(() => {
    TotalPrice();
  }, [TotalPrice]);

  console.log(cart);

  const data = [
    ["Items:", `$${totals}`],
    ["Shipping:", `$${6.99}`],
    ["Estimated GST:", `$${760.41}`],
    ["Gift Card:", `$${0.00}`],
    ["Order Total:", `$${topTotal}`]
  ];

  return (
    <section className={s.shop}>
      <div className={s.shopLeft}>
        {/* //!parcalanma */}
        <div className={s.shopInputCont}>
          <div className={s.melumat}>
            <h2 className={s.adres}>Shipping Address</h2>
            <p className={s.inputText}>John Maker</p>
            <p className={s.inputText}>123 Plae Grond Stret</p>
            <p className={s.inputText}>Vermont, California</p>
            <p className={s.inputText}>United States of America</p>
          </div>
          <div>
            <button className={s.Btn}>Change</button>
          </div>
        </div>
        {/* //!parcalanma */}
        <div className={s.shopInputCont}>
          <div className={s.melumat}>
            <h2 className={s.adres}>Payment Method</h2>
            <p className={s.inputText}>
              <FaCcMastercard /> Mastercard ending in 1252
            </p>
            <p className={s.inputText}>
              <IoGift /> $ 53.21 gift card balance
            </p>
            <p className={s.inputText}>
              <BiCheckboxSquare />
              Billing address same as Shipping Address
            </p>
          </div>
          <div>
            <button className={s.Btn}>Change</button>
          </div>
        </div>
      </div>
      <Details s={s} car={cart} />
      <div className={s.shopRight}>
        <div className={s.shopCont}>
          <h3 className={s.rightName}>Order Summary</h3>
          <Price data={data} />
          <button className={s.rightBtn}>Place your order</button>
        </div>
        <div className={s.rightBottom}>
          <button className={s.rightButton} onClick={() => navigate("/Ecommerce_React-Cicd/shop")}>
            <RxChevronLeft /> Back
          </button>
        </div>
      </div>
    </section>
  );
}
