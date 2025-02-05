import React, { useEffect, useState } from "react";
import { listProductBy } from "../../api/product";
import ProductCard from "../card/ProductCard";
import SwiperShowProduct from "../../utils/SwiperShowProduct";
import { SwiperSlide } from "swiper/react";

const BestSeller = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listProductBy("sold", "desc", 12)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(data);

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        สินค้าขายดี
      </h2>
      <SwiperShowProduct>
        {data?.map((item) => (
          <SwiperSlide key={item.id} className="flex justify-center">
            <ProductCard item={item} />
          </SwiperSlide>
        ))}
      </SwiperShowProduct>
      <div className="text-center mt-8">
      </div>
    </div>
  );
};

export default BestSeller;