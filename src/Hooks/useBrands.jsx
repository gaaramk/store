import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useBrands = () => {
  const getBrands = () => {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  };

  const res = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  return res;
};

export default useBrands;
