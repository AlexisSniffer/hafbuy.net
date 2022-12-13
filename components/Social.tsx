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
        href="https://www.facebook.com/HafBuy-101057821401440/"
        className={`${styles['social-icon']} ${styles['social-icon-facebook']}`}
      >
        <FacebookFilled />
      </Link>
      <Link
        href="https://www.instagram.com/hafbuy/"
        className={`${styles['social-icon']} ${styles['social-icon-instagram']}`}
        target={'_blank'}
      >
        <InstagramFilled />
      </Link>
      <Link
        href="email:info@hafbuy.com"
        className={`${styles['social-icon']} ${styles['social-icon-email']}`}
        target={'_blank'}
      >
        <MailFilled />
      </Link>
    </article>
  )
}

export default Social
