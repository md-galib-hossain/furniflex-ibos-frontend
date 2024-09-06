import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "../../../components/PasswordInput";
import LoadingButton from "../../../components/LoadingButton";
import { loginSchema, LoginValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const LoginForm = () => {
  const { signInUserWithEmailPass, loginWithGoogle, loginWithApple } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginValues) => {
    setError(null);
    setIsPending(true);
    try {
      await signInUserWithEmailPass(values.email, values.password);
      toast({
        title: "Logged in successfully",
      });
      form.reset();
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Try again",
      });
      setError("Login failed. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Try again",
      });
      console.log(err);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      await loginWithApple();
      navigate(from, { replace: true });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Try again",
      });
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-4">
          {error && <p className="text-center text-red-500">{error}</p>}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Write your email"
                    type="email"
                    className="mt-1 w-full rounded border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Write your password"
                    className="mt-1 w-full rounded border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton
            loading={isPending}
            type="submit"
            className="w-full rounded"
          >
            Log in
          </LoadingButton>
        </form>
      </Form>
      <div className="divider">OR</div>
      <div className="flex gap-2">
       
        <Button
          variant={"outline"}
          className="rounded w-full flex items-center justify-center gap-2"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle className="w-5 h-5" /> 
          Sign in with Google
        </Button>
       
        <Button
          variant={"outline"}
          className="rounded w-full flex items-center justify-center gap-2"
          onClick={handleAppleSignIn}
        >
          <FaApple className="w-5 h-5" /> 
          Sign in with Apple
        </Button>
      </div>
      <p className="mt-2 text-sm text-gray-500 text-center">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 font-semibold">
          Sign up
        </Link>
        .
      </p>
    </div>
  );
};

export default LoginForm;
