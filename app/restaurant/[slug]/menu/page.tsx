import { PrismaClient } from "@prisma/client";
import Menu from "../components/Menu";
import RestaurantNavBar from "../components/RestaurantNavBar";
import RestaurantHeader from "../components/RestaurantHeader";
import Link from "next/link";
const prisma = new PrismaClient();

const fetchRestaurantMenu = async (slug: string) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

export default async function RestaurantMenu({ params }: any) {
  const restaurant = await fetchRestaurantMenu(params.slug);

  return (
    <>
      {restaurant ? (
        <>
          <RestaurantHeader
            location={restaurant.location}
            name={restaurant.name}
          />
          <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
            <div className="bg-white w-[100%] rounded p-3 shadow">
              <RestaurantNavBar slug={params.slug} />
              <Menu menu={restaurant.items} />
            </div>
          </div>
        </>
      ) : (
        <div className=" flex  flex-col justify-center items-center h-full w-full">
          <div className="text-center text-5xl font-extrabold ">
            {" "}
            Restaurant doesnt exist{" "}
          </div>
          <br />
          <div className="">
            {" "}
            <Link
              href={"/"}
              className=" bg-cyan-900 text-white py-2 px-3 my-4 "
            >
              {" "}
              Home
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
