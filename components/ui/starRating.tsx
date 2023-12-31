"use client"

import {ReactNode} from "react";
import {uuid} from "@/lib/utils";

const yellowStarSvg = (uid: string) => <svg key={uid} aria-hidden="true" className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"
                           xmlns="http://www.w3.org/2000/svg"><title>Yellow star</title>
  <path
    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
</svg>

const grayStarSvg = (uid: string) => <svg key={uid} aria-hidden="true" className="h-5 w-5 text-gray-300 dark:text-gray-500" fill="currentColor"
                         viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Gray star</title>
  <path
    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
</svg>

export type StarProps = {
  count: number
  rating?: number
}

function makeStars(count: number): ReactNode[] {
  const stars = []
  for (let i = 0; i < count; i++) {
    stars.push(yellowStarSvg(uuid()))
  }
  for (let i = 0; i < 5 - count; i++) {
    stars.push(grayStarSvg(uuid()))
  }
  return stars
}

export function StarRating({count, rating}: StarProps) {
  const stars = count < 0 ? 0 : count;
  return <div className="flex items-center">
      {makeStars(stars)}
      {
        //<p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">{rating}</p>
        <p className="sr-only">{count} stars, {rating} rating</p>
      }
    </div>
}
