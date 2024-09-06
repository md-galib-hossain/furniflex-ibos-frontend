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
  import { useState, useTransition } from "react";
  import { Separator } from "@/components/ui/separator";
  import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/PasswordInput";
import LoadingButton from "@/components/LoadingButton";
import { signupSchema, SignupValues } from "@/lib/validation";
import { Link } from "react-router-dom";
  
  const SignupForm = () => {
    const [error, setError] = useState<string>();
    const [isPending, startTransition] = useTransition();
    const form = useForm<SignupValues>({
      resolver: zodResolver(signupSchema),
      defaultValues: {
        email: "",
        password: "",
        firstName:""
      },
    });
    const onSubmit = async (values: SignupValues) => {
        console.log(values)
      setError(undefined);
      console.log(values);
      // startTransition(async () => {
      //   const { error } = await signup(values);
      //   if (error) setError(error);
      // });
    };
    return (
      <div className="flex flex-col gap-4 w-full">
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
        <Separator />
  
        <div className="flex gap-2">
          <Button variant={"outline"} className="rounded w-full">
            Google Login
          </Button>
          <Button variant={"outline"} className="rounded w-full">
            Apple Login
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
  