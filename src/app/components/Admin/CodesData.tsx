"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { deleteById } from "@/services/promocodesService";

export const CodesData = ({ codesData }: any) => {
  const [codes, setCodes] = useState(codesData);

  const deleteCode = async (id: any) => {
    const { status, message } = await deleteById(id);

    if (status === 200) {
      setCodes(codes.filter((u: any) => u._id !== id));
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <table className="leading-normal w-auto">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Code
          </th>

          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Percent
          </th>

          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Created At
          </th>

          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Functions
          </th>
        </tr>
      </thead>
      <tbody>
        {codes.map((c: any) => (
          <tr key={c._id}>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <div className="flex items-center">
                <p className="whitespace-no-wrap text-violet-600">{c.code}</p>
              </div>
            </td>

            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p className="whitespace-no-wrap text-emerald-600">{c.percent}</p>
            </td>

            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p className="whitespace-no-wrap text-emerald-600">
                {c.createdAt}
              </p>
            </td>

            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <button
                onClick={() => deleteCode(c._id)}
                className="px-3 py-2 text-sm text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:outline-none font-medium mx-1"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
