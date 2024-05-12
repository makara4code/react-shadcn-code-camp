import { Button } from "./ui/button";
import { ReactNode } from "react";

type MyButtonProps = {
  color: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  children: ReactNode;
  icon?: ReactNode;
};

const MyButton = ({ color, icon, children }: MyButtonProps) => {
  
  return (
    <Button variant={color}>
      {icon}
      {children}
    </Button>
  );
};

export default MyButton;
