import Link from "next/link";
import { RestaurantCardType } from "../page";
import Price from "./Price";

import Star from "./Star";
import { Review } from "@prisma/client";

interface Props {
  restaurant: RestaurantCardType;
}
export const calculateRating = (reviews: Review[]) => {
  let value = 0;
  reviews.forEach((review) => {
    value += review.rating;
  });
  const length = reviews.length;
  if (length > 0) {
    return value / length;
  } else {
    return 0;
  }
};

export default function RestaurantCard({ restaurant }: Props) {
  const rating = calculateRating(restaurant.reviews);
  return (
    <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer hover:bg-slate-50 p-2">
      <Link href={`/restaurant/${restaurant.slug}`}>
        <img src={restaurant.main_image} alt="" className="w-full h-36" />
        <div className="p-1">
          <h3 className="font-bold text-2xl mb-2">{restaurant.name}</h3>
          <div className="flex items-start">
            <Star value={rating} />
            <p className="ml-2">
              {restaurant.reviews.length} review
              {restaurant.reviews.length === 1 ? "" : "s"}
            </p>
          </div>
          <div className="flex text-reg capitalize">
            <p className=" mr-3">{restaurant.cuisine.name}</p>
            <Price price={restaurant.price} />
            <p>{restaurant.location.name}</p>
          </div>
          <p className="text-sm mt-1 font-bold">
            Opening Hours:{" "}
            <span className="text-reg font-light">
              {restaurant.open_time.slice(0, 5)}-{" "}
              {restaurant.close_time.slice(0, 5)}
            </span>
          </p>
        </div>
      </Link>
    </div>
  );
}
