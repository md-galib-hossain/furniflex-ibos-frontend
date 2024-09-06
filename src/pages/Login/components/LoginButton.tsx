import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}
const LoadingButton = ({
  loading,
  disabled,
  className,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      disabled={loading || disabled}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {loading && <Loader className="size-5 animate-spin" />}

      {props.children}
    </Button>
  );
};

export default LoadingButton;
