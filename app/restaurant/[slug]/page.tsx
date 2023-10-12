import { Location, PrismaClient, Review } from "@prisma/client";
import { notFound } from "next/navigation";
import Description from "./components/Description";
import Images from "./components/Images";
import Rating from "./components/Rating";
import ReservationCard from "./components/ReservationCard";
import RestaurantNavBar from "./components/RestaurantNavBar";
import Reviews from "./components/Reviews";
import Title from "./components/Title";
import RestaurantHeader from "./components/RestaurantHeader";

const prisma = new PrismaClient();

interface Restaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  open_time: string;
  close_time: string;
  slug: string;
  reviews: Review[];
  location: Location;
}

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
      location: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    notFound();
  }

  return restaurant;
};

export default async function RestaurantDetails({
  params,
}: {
  params: { slug: string };
}) {
  const restaurant = await fetchRestaurantBySlug(params.slug);

  return (
    <>
      <RestaurantHeader location={restaurant.location} name={restaurant.name} />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        <div className="bg-slate-100 w-[70%] rounded px-10 py-5 shadow">
          <RestaurantNavBar slug={restaurant.slug} />
          <Title name={restaurant.name} />
          <Rating reviews={restaurant.reviews} />
          <Description description={restaurant.description} />
          <Images images={restaurant.images} />
          <Reviews reviews={restaurant.reviews} />
        </div>
        <div className="w-[27%]  relative  text-reg p-2 mx-3">
          <ReservationCard
            openTime={restaurant.open_time}
            closeTime={restaurant.close_time}
            slug={restaurant.slug}
          />
        </div>
      </div>
    </>
  );
}
