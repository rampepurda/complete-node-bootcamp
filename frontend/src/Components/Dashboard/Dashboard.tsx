import classes from './Dashboard.module.scss'
import { Link } from 'react-router'
import { navigation } from '../../configuration'

export const Dashboard = () => {
  return (
    <div className={classes.module}>
      <section className={classes.dashboard}>
        <h1>
          <Link to="/cnb">Complete Node Bootcamp</Link>
        </h1>

        <ul className="hasVerticalPadding-5">
          {navigation.dashboard.map((item, idx: number) => (
            <li key={idx}>
              <Link to={`${item.link}`}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
