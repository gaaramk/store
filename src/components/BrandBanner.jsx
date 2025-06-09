import useBrands from "@/Hooks/useBrands";
import React from "react";
import Loading from "./Loading";

const BrandBanner = () => {
  const { data, isLoading, isError, error } = useBrands();

  if (isLoading) return <Loading />;

  if (isError) return <h1 className="text-red-600 text-center mt-10">{error.message}</h1>;

  const brands = data.data.data;
  const show = brands.slice(0, 5);

  return (
    <section className="pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <p className="text-4xl font-semibold leading-snug max-w-3xl mx-auto text-center text-gray-900 dark:text-white">
          You bring the vision. We help you go further.
          <span className="text-[#248387] font-bold block mt-2">
            Join 600,000 <br /> creative teams, marketers, and designers worldwide.
          </span>
        </p>

        <div className="flex justify-center gap-10 py-20 flex-wrap">
          {show.map((brand) => (
            <h2
              key={brand._id || brand.id}
              className="text-3xl md:text-5xl cursor-default text-gray-700 dark:text-gray-300 select-none"
              aria-label={`Brand name: ${brand.name}`}
            >
              {brand.name}
            </h2>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandBanner;
