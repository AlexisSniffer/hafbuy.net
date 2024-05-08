import SizeProps from '@/types/size-props'
import Image from 'next/image'
import Link from 'next/link'

export default function Logo({ size = 'md' }: SizeProps) {
  const sizeOptions = {
    xs: { width: 100, height: 30 },
    md: { width: 150, height: 50 },
    lg: { width: 200, height: 70 },
  }

  const { width, height } = sizeOptions[size]

  return (
    <Link href="/">
      <Image
        src="logo.svg"
        alt="logo"
        width={width}
        height={height}
        priority={true}
      />
    </Link>
  )
}
