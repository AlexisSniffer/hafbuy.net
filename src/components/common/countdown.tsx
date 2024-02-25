import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { useEffect, useState } from 'react'

dayjs.extend(duration)

export default function Countdown({ targetDate }: any) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate))

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate))
    }, 1000)

    return () => clearInterval(intervalId)
  }, [targetDate])

  function calculateTimeLeft(targetDate: any) {
    const now = dayjs()
    const target = dayjs(targetDate)
    const diff = target.diff(now)
    const duration = dayjs.duration(diff)

    return {
      days: duration.days(),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    }
  }

  return (
    <>
      {timeLeft.days} días, {timeLeft.hours}:{timeLeft.minutes}:
      {timeLeft.seconds}
    </>
  )
}
