"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Title } from "../components/Global/Title";
import { Loading } from "../components/Loading";
import { FavoriteProduct } from "../components/Favorites/FavoriteProduct";
import { NoData } from "../components/Global/NoData";
import { FavoriteProductType } from "@/types/FavoriteProductType";
import { getAll, removeFav } from "@/services/favoritesService";

export default function MyFavoritesPage() {
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const [favorites, setFavorites] = useState<FavoriteProductType[] | null>();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setFavorites(await getAll(session?.user?.email));
    };

    fetchData();
  }, [router, session]);

  const removeFavorite = async (prodId: any) => {
    setDisabled(true);

    const { message, status } = await removeFav(prodId, session?.user?.email);

    if (status !== 200) {
      toast.error(message);
    } else {
      toast.success(message);
      setFavorites(favorites!.filter((fav) => fav._id !== prodId));
    }

    setDisabled(false);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center my-8">
        <Title text="Favorites" />

        {!favorites || !session?.user ? (
          <Loading />
        ) : favorites.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center my-8">
            {favorites.map((f) => (
              <FavoriteProduct
                key={f._id}
                product={f}
                removeFavorite={removeFavorite}
                disabled={disabled}
              />
            ))}
          </div>
        ) : (
          <NoData text="You have no favorites added!" />
        )}
      </div>
    </>
  );
}
