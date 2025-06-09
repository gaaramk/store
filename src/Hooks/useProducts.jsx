import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useProducts = () => {
  const getProducts = () => {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  };

  const res = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return res;
};

export default useProducts;
