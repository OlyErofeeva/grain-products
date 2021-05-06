import styles from './Preloader.module.scss'

import LoadingIcon from '../../svg/LoadingIcon/LoadingIcon'

const Preloader = () => {
  return (
    <div className={styles.root}>
      <LoadingIcon />
    </div>
  )
}

export default Preloader
