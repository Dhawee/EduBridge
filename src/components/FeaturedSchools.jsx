import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useNavigate } from "react-router-dom";

const sampleSchools = [
  {
    id: 1,
    name: "Christ Girls Secondary School, Ado-Ekiti",
    image: "/school1.jpg",
    lga: "Ado",
  },
  {
    id: 2,
    name: "Government College, Ikere-Ekiti",
    image: "/school2.jpg",
    lga: "Ikere",
  },
  {
    id: 3,
    name: "St. Augustine Secondary School, Ikole",
    image: "/school3.jpg",
    lga: "Ikole",
  },
  {
    id: 4,
    name: "Ado Grammar School, Ado Ekiti",
    image: "/school4.jpg",
    lga: "Ado",
  },
  {
    id: 5,
    name: "Amoye Grammar School, Ikere",
    image: "/school5.jpg",
    lga: "Ikere",
  },
  {
    id: 6,
    name: "Oye Community High School, Oye Ekiti",
    image: "/school6.jpg",
    lga: "Oye",
  },
  {
    id: 7,
    name: "Ikole High School, Ikole",
    image: "/school7.jpg",
    lga: "Ikole",
  },
];

export default function FeaturedSchools() {
  const navigate = useNavigate();

  return (
    <div className="py-16 px-6 md:px-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">
        Featured Schools
      </h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        loop={true}
        speed={1200}
        autoplay={{
          delay: 3000, // slower movement
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {sampleSchools.map((school) => (
          <SwiperSlide key={school.id}>
            <div
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 cursor-pointer"
              onClick={() => navigate(`/schools/${school.id}`)}
            >
              <img
                src={school.image}
                alt={school.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="font-semibold text-lg mt-3">{school.name}</h3>
              <p className="text-sm text-gray-500">{school.lga} LGA</p>

              <button className="mt-4 bg-green-700 text-white w-full py-2 rounded-lg">
                View School
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
