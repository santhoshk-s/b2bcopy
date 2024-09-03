import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="bg-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 w-full ">
      <section className="relative">
        <Link to={`/product/${p._id}`}>
          <img
            className="w-full h-48 object-cover"
            src={p.image}
            alt={p.name}
          />
          <span className="absolute bottom-3 right-3 bg-green-400 text-gray text-sm font-medium px-3 py-1 rounded-full">
            {p.brand}
          </span>
        </Link>
        <HeartIcon product={p} />
      </section>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h5 className="text-xl font-semibold text-gray">{p.name}</h5>
          <p className="text-green-400 font-semibold">
            {p.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>
        <p className="text-gray-800 mb-4">
          {p.description?.substring(0, 60)} ...
        </p>
        <div className="flex justify-between items-center">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Read More
            <svg
              className="w-4 h-4 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
          <button
            className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
