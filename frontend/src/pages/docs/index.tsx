import { Link, Outlet } from 'react-router-dom'
import { SubNav } from '../../Components'
import React from 'react'
import { navigation } from '../../configuration'

export type NavT = {
  title: string
  subNavigation?:
    | {
        title: string
        link: string
      }[]
    | undefined
}
export default function DocsPage() {
  const subNavData: NavT[] = navigation.subDocs

  return (
    <div className="cols">
      <div className="col-4">
        <ul>
          {subNavData.map((item, idx: number) => {
            return (
              <SubNav key={idx} id={idx} title={item.title} subNavigation={item.subNavigation} />
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
