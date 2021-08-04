import React from 'react'
import Image from 'next/image'
import Results from './Results'
import { ThumbUpIcon } from '@heroicons/react/outline'
import { forwardRef } from 'react'
import { Head } from 'next/head'
// import {rewards} from '../testRewards';

const Thumbnail = forwardRef(({ result }, ref) => {
  const BASE_URL = 'https://image.tmdb.org/t/p/original'
  return (
    <div
      ref={ref}
      className="group cursor-pointer p-2 transition duration-200 ease-in transform sm:hover:scale-105 sm:hover:z-50"
    >
      {/* <Image src={`${BASE_URL}${result.backdrop_path || result.poster_path}` || 
                        `${BASE_URL}${result.poster_path}`
                        } 
                layout="responsive"
                height={1080}
                width={1920}
            /> */}
      <video controls width="640" height="360" layout="responsive">
        <source
          src="/images/Call of Duty®_ Modern Warfare® & Warzone™ - Official Season Six Trailer.mp4"
          type="video/mp4"
        />
      </video>

      <div className="p-2 ">
        <p className="truncate max-w-md">{result.overview}</p>

        <h2 className="mt-1 text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-bold">
          {result.title || result.title}
        </h2>
        <p className="flex items-center opacity-0 group-hover:opacity-100">
          {result.media_type && `${result.media_type} *`}{' '}
          {result.release_date || result.first_air_date} *{' '}
          <ThumbUpIcon className="h-5 mx-2" /> {result.vote_count}
        </p>
      </div>
    </div>
  )
})

export default Thumbnail
