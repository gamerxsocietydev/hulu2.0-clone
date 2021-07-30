import Image from "next/image";
import HeaderItem from "./HeaderItem";
import {
    BadgeCheckIcon,
    CollectionIcon,
    HomeIcon,
    LightningBoltIcon,
    SearchIcon,
    UserIcon,

} from '@heroicons/react/outline'

export default function Header () {
    return (
<header className ="flex flex-col sm:flex-row m-5 justify-between items-center h-auto ">
<div className=" flex flex-grow justify-evenly max-w-2xl">
<HeaderItem title="Home" Icon={HomeIcon} />
<HeaderItem title="Home" Icon={LightningBoltIcon} />
<HeaderItem title="Home" Icon={BadgeCheckIcon} />
<HeaderItem title="Home" Icon={CollectionIcon} />
<HeaderItem title="Home" Icon={SearchIcon} />
<HeaderItem title="Home" Icon={UserIcon} />
</div>
<Image className="object-contain" 
src = "https://links.papareact.com/ua6" 
width={200} 
height={100}
/>
</header>
    )
}


