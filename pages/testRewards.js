import { useState } from 'react'

function RewardsPage() {
  const [rewards, setRewards] = useState([])
  const fetchRewards = async () => {
    const response = await fetch('/api/testRewards')
    const data = await response.json()
    setRewards(data)
  }
  return (
    <>
      <button
        className="p-1 mt-1 text-white bg-red-500 rounded"
        onClick={fetchRewards}
      >
        Load Rewards
      </button>
      {rewards.map((reward) => {
        return (
          <div
            key={reward.id}
            className=" flex flex-col items-center sm:w-screen md:w-2/3 "
          >
            <div className=" flex flex-col justify-center items-center  ">
              <div className="border-2 rounded-xl p-1 text-xs m-1 bg-gray-600 border-yellow-500">
                {reward.category}
              </div>

              <div className="text-2xl">{reward.display_name}</div>
              {/* <img src={reward.image_url} layout="responsive" height="400" width="400" /> */}
              <video
                layout="responsive"
                height="50%"
                width="95%"
                poster="/images/nike logo.png"
                controls
                autoplay
              >
                <source
                  src="/images/Call of Duty®_ Modern Warfare® & Warzone™ - Official Season Six Trailer.mp4"
                  type="video/mp4"
                />
              </video>
              <button className="flex justify-center items-center border-yellow-500 border-2 rounded-lg bg-yellow-500 text-white mt-1 md:text-xl w-1/2">
                {' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                {reward.point_cost} points to unlock
              </button>
              <div>{reward.description}</div>
              <hr className="border-2 border-gray-800 w-11/12 h-1 m-10 " />
            </div>
          </div>
        )
      })}
    </>
  )
}

export default RewardsPage
