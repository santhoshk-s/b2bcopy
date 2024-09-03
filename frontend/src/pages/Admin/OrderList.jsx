import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
// import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="p-4 mt-14">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="flex flex-col space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <img
                  src={order.orderItems[0].image}
                  alt={order._id}
                  className="w-40 h-40 object-cover rounded-lg mb-4 md:mb-0 md:mr-4"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">Order ID: {order._id}</h2>
                  <p className="text-gray-700">User: {order.user ? order.user.username : "N/A"}</p>
                  <p className="text-gray-700">Date: {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}</p>
                  <p className="text-gray-700">Total: $ {order.totalPrice}</p>
                  <p className={`text-center text-white py-1 px-2 rounded-full ${order.isPaid ? "bg-green-400" : "bg-red-400"}`}>
                    Paid: {order.isPaid ? "Completed" : "Pending"}
                  </p>
                  <p className={`text-center text-white py-1 px-2 rounded-full mt-4 ${order.isDelivered ? "bg-green-400" : "bg-red-400"}`}>
                    Delivered: {order.isDelivered ? "Completed" : "Pending"}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Link to={`/order/${order._id}`}>
                    <button className="bg-green-400 text-white py-2 px-4 rounded-lg hover:bg-green-400">More</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;
