import { PrismaClient } from "@prisma/client";
import Menu from "../components/Menu";
import RestaurantNavBar from "../components/RestaurantNavBar";
import RestaurantHeader from "../components/RestaurantHeader";

const prisma = new PrismaClient();

const fetchRestaurantMenu = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
      location: true,
      name: true,
    },
  });

  if (!restaurant) {
    throw new Error();
  }

  return restaurant;
};

export default async function RestaurantMenu({
  params,
}: {
  params: { slug: string };
}) {
  const restaurant = await fetchRestaurantMenu(params.slug);

  return (
    <>
      <RestaurantHeader
        location={restaurant?.location}
        name={restaurant?.name}
      />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        <div className="bg-white w-[100%] rounded p-3 shadow">
          <RestaurantNavBar slug={params.slug} />
          <Menu menu={restaurant.items} />
        </div>
      </div>
    </>
  );
}
