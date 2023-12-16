import { NoOrders } from "./NoOrders";
import { OrdersTable } from "./OrdersTable";

export const OrdersLayout = ({ orders }: any) => {
  return (
    <div className="text-center mt-5">
      <h1 className="text-2xl dark:text-slate-300 text-slate-800">Orders</h1>

      {orders.length === 0 ? <NoOrders /> : <OrdersTable orders={orders} />}
    </div>
  );
};
