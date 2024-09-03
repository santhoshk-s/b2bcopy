import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#34D399"], // Primary color
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },

        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <>
      <AdminMenu />

      <section className="px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex flex-wrap justify-center gap-4">
          <div className="rounded-lg bg-green-400 p-5 w-full sm:w-[18rem] md:w-[20rem] lg:w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-gray-800 text-center p-3 text-white">
              $
            </div>
            <p className="mt-5 text-white">Sales</p>
            <h1 className="text-xl font-bold text-white">
              $ {isLoading ? <Loader /> : sales.totalSales.toFixed(2)}
            </h1>
          </div>
          <div className="rounded-lg bg-green-400 p-5 w-full sm:w-[18rem] md:w-[20rem] lg:w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-gray-800 text-center p-3 text-white">
              $
            </div>
            <p className="mt-5 text-white">Customers</p>
            <h1 className="text-xl font-bold text-white">
              {isLoading ? <Loader /> : customers?.length}
            </h1>
          </div>
          <div className="rounded-lg bg-green-400 p-5 w-full sm:w-[18rem] md:w-[20rem] lg:w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-gray-800 text-center p-3 text-white">
              $
            </div>
            <p className="mt-5 text-white">All Orders</p>
            <h1 className="text-xl font-bold text-white">
              {isLoading ? <Loader /> : orders?.totalOrders}
            </h1>
          </div>
        </div>

        <div className="mt-4 px-2 sm:px-4 md:px-6 lg:px-8">
          <Chart
            options={state.options}
            series={state.series}
            type="line"
            width="100%"
            height="400"
          />
        </div>

        <div className="mt-4">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
