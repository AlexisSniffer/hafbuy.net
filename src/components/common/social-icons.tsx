import styles from '@/styles/social-icons.module.scss'
import SizeProps from '@/types/size-props'
import {
  FacebookFilled,
  InstagramFilled,
  MailFilled,
  PhoneFilled,
  TikTokFilled,
} from '@ant-design/icons'
import Link from 'next/link'

type SocialIconsProps = {
  link: string
  icon: React.ReactNode
  className: string
}

const socialIcons: SocialIconsProps[] = [
  {
    link: 'https://www.facebook.com/people/hafbuy/100066751616477/',
    icon: <FacebookFilled rev={undefined} />,
    className: 'facebook',
  },
  {
    link: 'https://www.instagram.com/hafbuy',
    icon: <InstagramFilled rev={undefined} />,
    className: 'instagram',
  },
  {
    link: 'https://www.tiktok.com/@hafbuyoficial',
    icon: <TikTokFilled rev={undefined} />,
    className: 'tiktok',
  },
  {
    link: 'https://wa.me/62505218',
    icon: <PhoneFilled rev={undefined} />,
    className: 'whatsapp',
  },
  {
    link: 'mailto:no-reply@e-commerce.com',
    icon: <MailFilled rev={undefined} />,
    className: 'mail',
  },
]

export default function SocialIcons({ size = 'md' }: SizeProps) {
  const sizeOptions = {
    xs: 'xs',
    md: 'md',
    lg: 'lg',
  }

  const sizeClass = sizeOptions[size]

  return (
    <div className={styles['social-icons']}>
      {socialIcons.map((socialIcon: SocialIconsProps) => {
        return (
          <Link
            key={socialIcon.link}
            href={socialIcon.link}
            className={`${styles['social-icon']} ${
              styles[`social-icon--${socialIcon.className}`]
            }`}
          >
            {socialIcon.icon}
          </Link>
        )
      })}
    </div>
  )
}
