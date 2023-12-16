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
      const res = await fetch(`${process.env.DOMAIN}/api/favorites/all`, {
        method: "POST",
        body: JSON.stringify({ email: session?.user?.email }),
      });

      const data = await res.json();

      setFavorites(data.products);
    };

    fetchData();
  }, [router, session]);

  const removeFavorite = async (prodId: any) => {
    setDisabled(true);

    const raw = await fetch(`${process.env.DOMAIN}/api/favorites/remove`, {
      method: "POST",
      body: JSON.stringify({ _id: prodId, email: session!.user?.email }),
    });
    const data = await raw.json();

    if (data.status !== 200) {
      toast.error(data.message);
    } else {
      toast.success(data.message);
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
