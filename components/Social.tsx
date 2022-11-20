import Link from 'next/link'
import {
  FacebookFilled,
  FacebookOutlined,
  InstagramFilled,
  InstagramOutlined,
} from '@ant-design/icons'

type SocialProps = {
  type: string
}

const Social = (props: SocialProps) => {
  return (
    <div className="social-icons">
      <Link
        href="https://www.facebook.com/HafBuy-101057821401440/"
        className="social-icon social-icon-facebook"
        target={'_blank'}
      >
        <FacebookFilled />
      </Link>
      <Link
        href="https://www.instagram.com/hafbuy/"
        className="social-icon social-icon-instagram"
        target={'_blank'}
      >
        <InstagramFilled />
      </Link>
    </div>
  )
}

export default Social
