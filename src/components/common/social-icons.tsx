import SizeProps from '@/types/size-props'
import {
  FacebookFilled,
  InstagramFilled,
  MailFilled,
  TwitterSquareFilled,
} from '@ant-design/icons'
import Link from 'next/link'
import styles from '@/styles/social-icons.module.scss'

type SocialIconsProps = {
  link: string
  icon: React.ReactNode
  className: string
}

const socialIcons: SocialIconsProps[] = [
  {
    link: 'https://facebook.com',
    icon: <FacebookFilled rev={undefined} />,
    className: 'facebook',
  },
  {
    link: 'https://instagram.com',
    icon: <InstagramFilled rev={undefined} />,
    className: 'instagram',
  },
  {
    link: 'https://twitter.com',
    icon: <TwitterSquareFilled rev={undefined} />,
    className: 'twitter',
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
