import Link from 'next/link'
import { FacebookFilled, InstagramFilled, MailFilled } from '@ant-design/icons'
import styles from '../styles/Social.module.scss'

type SocialProps = {
  type?: 'header'
  size?: 'small' | 'large'
}

const Social = (props: SocialProps) => {
  let className = styles.social

  switch (props.type) {
    case 'header':
      className += ` ${styles['social-header']}`
      break
  }

  switch (props.size) {
    case 'small':
      className += ` ${styles['social-small']}`
      break

    case 'large':
      className += ` ${styles['social-large']}`
      break
  }

  return (
    <article className={className}>
      <Link
        href="https://www.facebook.com/profile.php?id=100066751616477&mibextid=LQQJ4d"
        className={`${styles['social-icon']} ${styles['social-icon-facebook']}`}
      >
        <FacebookFilled rev={undefined} />
      </Link>
      <Link
        href="https://www.instagram.com/hafbuy/"
        className={`${styles['social-icon']} ${styles['social-icon-instagram']}`}
        target={'_blank'}
      >
        <InstagramFilled rev={undefined} />
      </Link>
      <Link
        href="email:info@hafbuy.com"
        className={`${styles['social-icon']} ${styles['social-icon-email']}`}
        target={'_blank'}
      >
        <MailFilled rev={undefined} />
      </Link>
    </article>
  )
}

export default Social
