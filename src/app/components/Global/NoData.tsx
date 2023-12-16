export const NoData = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-8 mx-2">
      <div className="flex flex-col items-center justify-center bg-white bg-opacity-50 rounded-xl px-6 py-8">
        <p className="text-red-700 text-2xl md:text-3xl font-bold text-center uppercase">
          {text}
        </p>
      </div>
    </div>
  );
};
