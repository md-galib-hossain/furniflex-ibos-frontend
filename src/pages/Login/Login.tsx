import loginimg from "@/assets/loginimg.jpg";
import LoginForm from "./components/LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="bg-white min-h-screen">
      <div className="grid min-h-screen lg:grid-cols-12">
        {/* Container for image and overlay text */}
        <aside className="hidden lg:block relative lg:col-span-6 order-last">
          <img
            alt="Login background"
            src={loginimg}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-8 px-32 bg-black bg-opacity-50">
           <Link to="/">
           
           <h1 className="text-4xl font-bold mb-4">Furni<span className="text-primary">Flex</span></h1></Link>
            <p className="text-lg">
              Discover a seamless experience with Furniflex, where comfort meets style. Explore our range of high-quality furniture designed to elevate your living spaces.
            </p>
          </div>
        </aside>

        {/* Login form */}
        <main className="flex items-center justify-center lg:col-span-6">
          <div className="max-w-4xl md:min-w-[450px] py-16 px-6 bg-[#f9f9f9] rounded">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome Back!
            </h1>

            <p className="mt-2 leading-relaxed text-gray-500">
              Enter your Credentials to access your account
            </p>

            <LoginForm />
          </div>
        </main>
      </div>
    </section>
  );
};

export default Login;
