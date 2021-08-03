import Image from 'next/image'
import HeaderItem from './HeaderItem'
import {
  BadgeCheckIcon,
  CollectionIcon,
  HomeIcon,
  LightningBoltIcon,
  SearchIcon,
  UserIcon,
} from '@heroicons/react/outline'

export default function Header() {
  return (
    <header className="flex flex-col sm:flex-row m-5 justify-between items-center h-auto ">
      <div className=" flex flex-grow justify-evenly max-w-2xl">
        <HeaderItem title="Home" Icon={HomeIcon} />
        <HeaderItem title="Trending" Icon={LightningBoltIcon} />
        <HeaderItem title="Favorite" Icon={BadgeCheckIcon} />
        <HeaderItem title="Collection" Icon={CollectionIcon} />
        <HeaderItem title="Search" Icon={SearchIcon} />
        <HeaderItem title="Profile" Icon={UserIcon} />
      </div>
      <Image
        className="object-contain"
        src="/Gamer X Society Website Layout-4.png"
        width={400}
        height={200}
      />
    </header>
  )
}
