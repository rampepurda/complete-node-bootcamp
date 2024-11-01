import { Link, Outlet } from 'react-router-dom'
import { SubNav } from '../../Components'
import React from 'react'
import { navigation } from '../../configuration'

export default function DocsPage() {
  const subNavData = navigation.subDocs

  return (
    <div className="cols">
      <div className="col-4">
        <ul>
          {subNavData.map((item, idx: number) => {
            return (
              <SubNav key={idx} id={idx} title={item.title} subNavigation={[item.subNavigation]} />
            )
          })}
        </ul>
      </div>

      <div className="col-8">
        <Outlet />
      </div>
    </div>
  )
}
