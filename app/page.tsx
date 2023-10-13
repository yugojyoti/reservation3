import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import { PrismaClient, Cuisine, Location, PRICE, Review } from "@prisma/client";
import prisma from "./db";

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  slug: string;
  reviews: Review[];
  open_time: string;
  close_time: string;
}

// const prisma = new PrismaClient();

const fetchRestaurants = async () => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      select: {
        id: true,
        name: true,
        main_image: true,
        cuisine: true,
        slug: true,
        location: true,
        price: true,
        reviews: true,
        open_time: true,
        close_time: true,
      },
    });

    return restaurants;
  } catch (error) {
    console.log(error);
  }
};

export default async function Home() {
  const restaurants = await fetchRestaurants();

  return (
    <>
      {restaurants && (
        <main>
          <Header />
          <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
            {restaurants.map((restaurant) => (
              <div key={restaurant.id}>
                <RestaurantCard restaurant={restaurant} />
              </div>
            ))}
          </div>
        </main>
      )}
    </>
  );
}
