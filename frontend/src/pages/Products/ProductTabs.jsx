import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();

  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Tabs */}
      <section className="mr-10 mb-6 md:mb-0 md:mr-20">
        <div
          className={`p-4 cursor-pointer text-lg ${activeTab === 1 ? "font-bold border-b-2 border-green-400" : ""}`}
          onClick={() => handleTabClick(1)}
        >
          Write Your Review
        </div>
        <div
          className={`p-4 cursor-pointer text-lg ${activeTab === 2 ? "font-bold border-b-2 border-green-400" : ""}`}
          onClick={() => handleTabClick(2)}
        >
          All Reviews
        </div>
        <div
          className={`p-4 cursor-pointer text-lg ${activeTab === 3 ? "font-bold border-b-2 border-green-400" : ""}`}
          onClick={() => handleTabClick(3)}
        >
          Related Products
        </div>
      </section>

      {/* Tab Content */}
      <section className="flex-1">
        {activeTab === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form onSubmit={submitHandler} className="space-y-4">
                <div className="my-2">
                  <label htmlFor="rating" className="block text-xl mb-2">
                    Rating
                  </label>
                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 border rounded-lg text-black w-full md:w-96"
                  >
                    <option value="">Select</option>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Great</option>
                    <option value="4">Excellent</option>
                    <option value="5">Exceptional</option>
                  </select>
                </div>

                <div className="my-2">
                  <label htmlFor="comment" className="block text-xl mb-2">
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    rows="3"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 border rounded-lg text-black w-full md:w-96"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="bg-green-400 text-white py-2 px-4 rounded-lg"
                >
                  Submit
                </button>
              </form>
            ) : (
              <p>
                Please <Link to="/login" className="text-green-400 underline">sign in</Link> to write a review
              </p>
            )}
          </div>
        )}

        {activeTab === 2 && (
          <div className="mt-4">
            {product.reviews.length === 0 && <p>No Reviews</p>}
            <div>
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-gray-800 p-4 rounded-lg mb-5"
                >
                  <div className="flex justify-between mb-2">
                    <strong className="text-gray-400">{review.name}</strong>
                    <p className="text-gray-400">
                      {review.createdAt.substring(0, 10)}
                    </p>
                  </div>
                  <p className="my-4">{review.comment}</p>
                  <Ratings value={review.rating} />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div className="mt-4 flex flex-wrap gap-4">
            {!data ? (
              <Loader />
            ) : (
              data.map((product) => (
                <SmallProduct key={product._id} product={product} />
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;
