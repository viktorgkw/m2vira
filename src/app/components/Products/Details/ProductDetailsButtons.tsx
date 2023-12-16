import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

export const ProductDetailsButtons = ({
  onCartAdd,
  onFavoriteAdd,
  isButtonDisabled,
}: any) => {
  return (
    <>
      <button
        onClick={onCartAdd}
        disabled={isButtonDisabled}
        className="flex md:ml-auto mr-2 px-2 py-2 bg-sky-500 hover:bg-sky-400 text-white font-bold border-b-4 border-blue-800 hover:border-blue-600 rounded hover:scale-[1.05] duration-300 text-base my-2 md:my-0"
      >
        Add to cart
      </button>

      <button
        onClick={onFavoriteAdd}
        disabled={isButtonDisabled}
        className="flex px-2 py-2 bg-rose-500 hover:bg-rose-400 text-white font-bold border-b-4 border-rose-800 hover:border-rose-600 rounded hover:scale-[1.05] duration-300"
      >
        <FontAwesomeIcon icon={faHeart} width={24} height={24} />
      </button>
    </>
  );
};
