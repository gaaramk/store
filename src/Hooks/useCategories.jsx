import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCategories = () => {
  const getCategories = () => {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  };

  const res = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return res;
};

export default useCategories;
