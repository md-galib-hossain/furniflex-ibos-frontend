import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

type CreateUserParams = {
  displayName: string;
  email: string;
  avatarUrl?: string;
};

const useCreateUser = () => {
  const axiosSecure = useAxiosSecure();

  const createUser = async (user: CreateUserParams) => {
    console.log(user,"in hook")
    const response = await axiosSecure.post('/users', user);
    return response.data;
  };

  return useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      console.log("User created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating user:", error);
    },
  });
};

export default useCreateUser;
