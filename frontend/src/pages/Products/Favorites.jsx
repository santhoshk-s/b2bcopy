import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Favorite Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.length > 0 ? (
          favorites.map((product) => (
            <div 
              key={product._id}
              className="bg-green-400 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <Product product={product} />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No favorite products found.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
