import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const SelectView = ({ setAllOrders, setBycash, setByCard }) => {
  const handleChange = (value) => {
    // Reset all to false first (optional)
    setAllOrders(false);
    setBycash(false);
    setByCard(false);

    if (value === "all") setAllOrders(true);
    else if (value === "cash") setBycash(true);
    else if (value === "card") setByCard(true);
  };

  return (
    <RadioGroup defaultValue="all" onValueChange={handleChange}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="all" id="option-one" />
        <Label htmlFor="option-one">All Orders</Label>
      </div>

      <div className="flex items-center space-x-2">
        <RadioGroupItem value="cash" id="option-two" />
        <Label htmlFor="option-two">Cash</Label>
      </div>

      <div className="flex items-center space-x-2">
        <RadioGroupItem value="card" id="option-three" />
        <Label htmlFor="option-three">Card</Label>
      </div>
    </RadioGroup>
  );
};

export default SelectView;
