import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-[10rem] ml-[2rem] p-3 relative">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name} 
          className="w-20 h-20 rounded mr-5 object-cover"
        />
        <HeartIcon product={product} />
      </div> 

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-lg">{product.name}</div>
            <span className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-5 py-1 rounded-full dark:bg-gray-900 dark:text-gray-300 ml-5  ">
              ${product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
