import HomeSwip from "@/components/HomeSwip";
import Style from "./Home.module.css";
import ProductsSwip from "@/components/ProductsSwip";
import useProducts from "@/Hooks/useProducts";
import Loading from "@/components/Loading";
import BrandBanner from "@/components/BrandBanner";
import SpicialProducts from "@/components/SpicialProducts";
import NewCollection from "@/components/NewCollection";

const Home = () => {
  const products = useProducts();

  if (products.isLoading) return <Loading />;

  if (products.isError) return <h1>{products.error.message}</h1>;

  const bestProducts = products.data.data.data.filter(
    (product) => product.ratingsAverage > 4.5
  );

  const bestSellers = products.data.data.data.filter(
    (product) => product.sold > 5000
  );

  const offers = products.data.data.data.filter(
    (product) => product.priceAfterDiscount
  );

  // console.log(offers);

  return (
    <>
      <div>
        <HomeSwip />

        <NewCollection/>

        <BrandBanner />

        <SpicialProducts />




        {/*  Best ratings */}
        <ProductsSwip products={bestProducts} title="Best Ratings Products" />

        {/*  Offers */}
        <ProductsSwip products={offers} title="Offers" />

        {/*  Best Sellers */}
        <ProductsSwip products={bestSellers} title="Best Sellers Products" />
      </div>
    </>
  );
};

export default Home;
