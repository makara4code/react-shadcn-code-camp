import { decrement, increment } from "./counterSlice";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/shared";

export function Counter() {
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-2">
      <span>Redux Count Value: {count}</span>
      <div className="flex gap-4">
        <Button variant="destructive" onClick={() => dispatch(decrement())}>-</Button>
        <Button onClick={() => dispatch(increment())}>+</Button>
      </div>
    </div>
  );
}
