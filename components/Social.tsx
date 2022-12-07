import Link from 'next/link'
import { FacebookFilled, InstagramFilled } from '@ant-design/icons'
import styles from '../styles/Social.module.scss'

type SocialProps = {
  type: 'normal' | 'header'
}

const Social = (props: SocialProps) => {
  let className = styles.social

  switch (props.type) {
    case 'header':
      className = `${styles.social} ${styles['social-header']}`
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
    </article>
  )
}

export default Social
