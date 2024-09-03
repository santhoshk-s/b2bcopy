import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading } = useGetProductsQuery({ keyword });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-between items-center mt-24 px-4 sm:px-4">
            <h1 className="text-xl font-bold text-gray-800 border-b-2 border-gray-800 pr-4">
              Trending Products
            </h1>
            <Link
              to="/shop"
              className="bg-white text-green-400 border-2 border-green-400 text-center  font-bold rounded-full py-1 px-2 hover:bg-green-600 transition"
            >
              view All
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 mt-4 px-4 sm:px-4">
            {data?.products?.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition flex flex-col items-center text-center justify-between"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded-full w-24 h-24 object-cover mb-1 border-2 border-gray-700"
                />
                <h2 className="text-sm font-semibold text-gray-800 mb-1">
                  {product.name}
                </h2>
                {/* <div className="text-sm font-medium text-gray-600 mb-1">
                  ${product.price}
                </div> */}
                <Link
                  to={`/product/${product._id}`}
                  className="bg-green-400 text-white text-sm rounded-full py-1 px-2 hover:bg-green-600 transition"
                >
                  get Quotes
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
