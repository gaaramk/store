import { Button } from "./ui/button";
import toast from "react-hot-toast";

const Counter = ({ productId, prodCount, updateCart }) => {

  const handelUpdateCount = (productId, count) => {
    updateCart(productId, count);
    toast.success("count updated");
  };

  return (
    <div className="capitalize flex items-center gap-2">
      <p className="font-semibold">count:</p>
      <Button
        disabled={prodCount === 1}
        size={"sm"}
        onClick={() => handelUpdateCount(productId, prodCount - 1)}
      >
        -
      </Button>

      <span>{prodCount}</span>

      <Button
        size={"sm"}
        onClick={() => handelUpdateCount(productId, prodCount + 1)}
      >
        +
      </Button>
    </div>
  );
};

export default Counter;
