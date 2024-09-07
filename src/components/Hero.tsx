import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import heroImg from '@/assets/hero-2.jpg'
const Hero = () => {
  return (
    <div
      className="hero bg-cover bg-center bg-no-repeat min-h-screen"
      style={{
        backgroundImage: `url(${heroImg})`,
      }}
    >
      <div className="hero-overlay bg-opacity-50 bg-black"></div>
      <div className="hero-content text-center text-white">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold">Discover Comfort & Style</h1>
          <p className="py-6">
            Transform your space with our exclusive collection of modern and
            timeless furniture. Whether you're updating a room or furnishing an
            entire home, we have everything you need to create your dream living
            space.
          </p>
          <Link to="/store">
            <Button className="rounded">Shop Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
