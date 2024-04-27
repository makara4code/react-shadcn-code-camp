import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren & {
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export const ButtonLoading = ({ loading, children, ...props }: ButtonProps) => {
  return (
    <Button {...props}>{loading ? <Loader2 size="24" /> : children}</Button>
  );
};

export default ButtonLoading;
