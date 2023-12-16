import { Order } from "./Order";

export const OrdersTable = ({ orders }: any) => {
  return (
    <div className="px-2 py-2 overflow-x-auto">
      <div className="inline-block max-w-fit shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>

              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Price
              </th>

              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Size
              </th>

              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Color
              </th>
            </tr>
          </thead>
          {orders.map((o: any) => (
            <Order key={o._id} order={o} />
          ))}
        </table>
      </div>
    </div>
  );
};
