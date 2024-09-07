import { useContext, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthContext } from "@/contexts/AuthContext";
import { signupSchema, SignupValues } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/PasswordInput";
import LoadingButton from "@/components/LoadingButton";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import useCreateUser from "@/hooks/useCreateUser";
const SignupForm = () => {
  const { signUpUserWithEmailPass, loginWithGoogle, loginWithApple } =
    useContext(AuthContext);
  const { mutate: createUser } = useCreateUser();

  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
    },
  });

  const onSubmit = async (values: SignupValues) => {
    setError(null);
    setIsPending(true);
    try {
      const result = await signUpUserWithEmailPass(
        values.email,
        values.password
      );

      createUser({
        displayName: `${values.firstName} ${values.lastName || ""}`,
        email: values.email,
        avatarUrl: result?.photoURL,
      });

      toast({
        title: "Signed up successfully",
      });
      form.reset();
      navigate("/login");
    } catch (error: any) {
      console.log(error);
      setError("Email already in use");
    } finally {
      setIsPending(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await loginWithGoogle();
      createUser({
        displayName: result?.user?.displayName || `Anonymouse`,
        email: result?.user.email,
        avatarUrl: result?.user?.photoURL,
      });
      navigate("/");
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
      const result = await loginWithApple();
      createUser({
        displayName: result?.user?.displayName || `Anonymouse`,
        email: result?.user.email,
        avatarUrl: result?.user?.photoURL,
      });
      navigate("/");
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

          <div className="grid grid-cols-12 space-y-2">
            <div className="col-span-12 flex justify-between">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
                        type="text"
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
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
                        type="text"
                        className="mt-1 w-full rounded border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-12">
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
            </div>

            <div className="col-span-12">
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
            </div>
          </div>

          <LoadingButton
            loading={isPending}
            type="submit"
            className="w-full rounded"
          >
            Signup
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
        Have an account?{" "}
        <Link to="/login" className="text-blue-600 font-semibold">
          Login
        </Link>
        .
      </p>
    </div>
  );
};

export default SignupForm;
