import { IconMoonStars, IconSunset, IconSun, IconSunrise } from '@tabler/icons-react'

// export const IconTypes = {
//   //@ts-ignore
//   [SlotType.Bicycle]: <IconBike className="w-6 h-6 " />,
//   //@ts-ignore
//   [SlotType.Bike]: <IconMotorbike className="w-6 h-6 " />,
//   //@ts-ignore
//   [SlotType.Car]: <IconCar className="w-6 h-6 " />,
//   //@ts-ignore
//   [SlotType.Heavy]: <IconTir className="w-6 h-6 " />,
// }

export const IconType = ({ time, className }: { time: string; className?: string }) => {
  const date = new Date(time)
  const hour = date.getHours() // get the hour in UTC

  //@ts-ignore
  if (hour >= 4 && hour < 10) return <IconSunrise className="w-5 h-5" />
  //@ts-ignore
  if (hour >= 10 && hour < 16) return <IconSun className="w-5 h-5" />
  //@ts-ignore
  if (hour >= 16 && hour < 20) return <IconSunset className="w-5 h-5" />
  //@ts-ignore
  return <IconMoonStars className={`w-5 h-5 ${className}`} />
}
