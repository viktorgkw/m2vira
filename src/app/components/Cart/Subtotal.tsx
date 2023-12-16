export const Subtotal = ({ subtotal }: any) => {
  return (
    <p>
      Subtotal:
      <span className="font-semibold text-sky-600 dark:text-sky-500">
        {" "}
        ${subtotal}
      </span>
    </p>
  );
};
