import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { itemsApi } from '../../api/data';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from 'react-icons/io5';
import { BsBagPlusFill } from 'react-icons/bs';
import { addCart } from '../../store/expense/expense-slice';
import { Rating } from '../../components/rating/rating';
import style from './style.module.css';

export function Details() {
  const [fullData, setFullData] = useState(null); // Initialize with null or a default value
  const [img, setImg] = useState(null); // Initialize with null or a default value
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = useCallback(async () => {
    try {
      let data = await itemsApi.FetchID(id);
      setFullData(data);
      setImg(data.img[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error as needed (e.g., show an error message)
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]); // Include getData in the dependency array of useEffect

  function select(e) {
    setImg(e);
  }

  console.log('ImageData', img);

  return (
    <section className={style.item}>
      <div className={style.details}>
        <div onClick={() => navigate('/Ecommerce_React-Cicd')} className={style.backs}>
          <IoChevronBackOutline /> Back
        </div>
        <div className={style.product}>
          {fullData ? (
            <div className={style.productContainer} key={fullData.id}>
              <div className={style.productLeft}>
                {fullData.img.map((e, i) => (
                  <img
                    key={i}
                    onClick={() => select(e)}
                    className={style.imgs}
                    src={e}
                    alt=""
                  />
                ))}
              </div>
              <div className={style.productCenter}>
                <img className={style.img} src={img} alt="" />
              </div>
              <div className={style.productRight}>
                <h1 className={style.name}>{fullData.name}</h1>
                <h4 className={style.model}>{fullData.model}</h4>
                <Rating s={style} rating={fullData.rating} />
                <p className={style.price}>{fullData.price}</p>
                <p className={style.info}>{fullData.info}</p>
                <button
                  onClick={() => dispatch(addCart(fullData))}
                  className={style.button}
                >
                  <BsBagPlusFill className={style.icon} /> Add to Bag
                </button>
              </div>
            </div>
          ) : (
            <p>yoxdu</p> // Replace with your loading indicator or error message
          )}
        </div>
      </div>
      <div className={style.infox}>
        <h2 className={style.infoText}>Description</h2>
        <p className={style.infoTxt}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim
      odio faucibus nec malesuada purus
      <br />
      volutpat vel sed viverra. Id sagittis, phasellus dui in arcu. Nec
      arcu, sit nunc, nibh purus pellentesque sagittis.
      <br />
      Felis rhoncus facilisis massa eget purus in purus. Etiam at cras nulla
      nunc. Malesuada in pretium diam
      <br />
      scelerisque sit mattis in egestas neque. Eu porta tempor sodales nisl
      integer turpis porttitor sed sed. Ut
      <br />
      senectus odio dictum enim velit tempor diam quisque suspendisse.
      <br />
      Orci vel ridiculus diam viverra. Libero malesuada orci, quis placerat
      suscipit augue imperdiet. Et praesent
      <br />
      augue dictum mauris eget lacus malesuada. Aenean nisi, sodales natoque
      massa magna dignissim mi. Mattis tellus, justo, lorem sed tempor diam
      sit viverra enim. Id id placerat eu etiam nulla laoreet.
      <br />
      Dignissim leo fames turpis quis suspendisse vulputate laoreet
      vulputate ac. Aliquam justo lectus eu dui
      <br />
      porttitor. Cras a aliquam phasellus sollicitudin ornare. Tristique
      volutpat facilisis in ut proin. Est vitae facilisi
      <br />
      sollicitudin id lorem mattis nibh ipsum, nec. Consectetur consectetur
      morbi morbi aliquet mi risus, velit, sit at. Integer morbi viverra
      hendrerit risus.
      <br />
      Odio phasellus nibh senectus nec id enim quam sed. At potenti
      sollicitudin sollicitudin lobortis morbi. Nunc molestie et adipiscing
      aliquam. Sit vel mi dolor suscipit. In eget ut ac at facilisi leo
      viverra. Arcu ac ut
      <br />
      fermentum, viverra et, vitae etiam cras. Eu purus non ut turpis fusce.
      Mi vitae nibh mi ut feugiat varius risus
      <br />
      eros.
        </p>
      </div>
    </section>
  );
}
