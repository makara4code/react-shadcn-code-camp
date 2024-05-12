import { Card, CardContent } from "@/components/ui/card";
import About from "../about/About";
import { useAuthContext } from "@/context/useAuthContext";
import { useSelector } from "react-redux";

export function ContactUs() {
  const { token } = useAuthContext();
  const count = useSelector((state: any) => state.counter.value)

  return (
    <div className="flex mt-2">
      <Card className="w-2/3">
        <CardContent>
        <h1 className="text-2xl font-bold">Contact Us Page</h1>
        Token In Contact Us Page: {token}
        <p>Redux count value: {count}</p>
        </CardContent>
      </Card>
      
      <About />
    </div>
  );
}
export default ContactUs;
