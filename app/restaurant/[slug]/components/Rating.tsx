import { Review } from "@prisma/client";
import { calculateReviewRatingAverage } from "../../../../utils/calculateReviewRatingAverage";

import { calculateRating } from "../../../components/RestaurantCard";
import Star from "../../../components/Star";

export default function Rating({ reviews }: { reviews: Review[] }) {
  const rating = calculateRating(reviews);
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Star value={rating} />
        <p className="text-reg ml-3">
          {calculateReviewRatingAverage(reviews).toFixed(1)}
        </p>
      </div>
      <div>
        <p className="text-reg ml-4">
          {reviews.length} Review{reviews.length === 1 ? "" : "s"}
        </p>
      </div>
    </div>
  );
}
