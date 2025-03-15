import classes from './Dashboard.module.scss'
import { Link } from 'react-router-dom'

export const Dashboard = () => {
  return (
    <div className={classes.module}>
      <section className={classes.dashboard}>
        <h1>
          <Link to="/cnb">Complete Node Bootcamp</Link>
        </h1>
        <ul className="hasVerticalPadding-5">
          <li>
            <Link to="/reactplayer">ReactPlayer</Link>
          </li>
          <li>
            <Link to="/eShop">eShop</Link>
          </li>
        </ul>
      </section>
    </div>
  )
}
