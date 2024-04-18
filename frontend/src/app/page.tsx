import Image from "next/image";
import Products from "./components/products";

export default function Home() {
  return (
    <div className="w-full px-2 mb-12">
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/3 px-2 mb-4">Image</div>
        <div className="w-full md:w-1/3 px-2 mb-4">Title</div>
        <div className="w-full md:w-1/3 px-2 mb-4">Checkout</div>
      </div>
      <div className="flex flex-wrap">
        <div className="grid grid-cols-4 gap-3">
          <Products />
        </div>
      </div>
    </div>
  );
}
