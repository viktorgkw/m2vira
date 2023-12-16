export const GrandTotal = ({ promocode, subtotal }: any) => {
  return (
    <>
      {promocode.isValid && (
        <>
          <p>
            Discount:
            <span className="font-semibold text-amber-600 dark:text-amber-500">
              {" "}
              {promocode.percent}%
            </span>
          </p>

          <p>
            Grand Total:
            <span className="font-semibold text-emerald-600 dark:text-emerald-500">
              {" "}
              ${(subtotal - (subtotal * promocode.percent) / 100).toFixed(2)}
            </span>
          </p>
        </>
      )}
    </>
  );
};
