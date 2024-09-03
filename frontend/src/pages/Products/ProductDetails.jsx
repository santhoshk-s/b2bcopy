import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      <div className="mt-16">
        <Link
          to="/"
          className="text-green-400 font-semibold hover:underline ml-5"
        >
          Go Back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="flex flex-wrap relative items-start mt-8 ml-5">
            <div className="w-full xl:w-1/2 lg:w-2/5 md:w-1/2 sm:w-full mb-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-40 h-40 rounded-lg shadow-md object-cover"
              />
              <HeartIcon product={product} />
            </div>

            <div className="flex flex-col justify-between w-full xl:w-1/2 lg:w-3/5 md:w-1/2 sm:w-full">
              <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-4xl font-extrabold mb-4">${product.price}</p>

              <div className="flex items-center mb-4">
                <div className="flex-1">
                  <h1 className="flex items-center mb-2">
                    <FaStore className="mr-2 text-green-400" /> Brand: {product.brand}
                  </h1>
                  <h1 className="flex items-center mb-2">
                    <FaClock className="mr-2 text-green-400" /> Added:{" "}
                    {moment(product.createAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-2">
                    <FaStar className="mr-2 text-green-400" /> Reviews:{" "}
                    {product.numReviews}
                  </h1>
                </div>

                <div className="flex-1">
                  <h1 className="flex items-center mb-2">
                    <FaStar className="mr-2 text-green-400" /> Ratings: {rating}
                  </h1>
                  <h1 className="flex items-center mb-2">
                    <FaShoppingCart className="mr-2 text-green-400" /> Quantity:{" "}
                    {product.quantity}
                  </h1>
                  <h1 className="flex items-center mb-2">
                    <FaBox className="mr-2 text-green-400" /> In Stock:{" "}
                    {product.countInStock}
                  </h1>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
                {product.countInStock > 0 && (
                  <select
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="p-2 w-24 rounded-lg border-gray-300"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="bg-green-400 text-white py-2 px-4 rounded-lg mt-4"
                >
                  Add To Cart
                </button>
              </div>
            </div>

            <div className="w-full mt-12">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
