import { Outlet } from 'react-router-dom'
import { SideBarNav } from '../../Components'
import React from 'react'
import { navigation } from '../../configuration'

type SideBarNavT = {
  title: string
  link?: string | undefined
  subNavigation?:
    | {
        title: string
        link: string
      }[]
    | undefined
}
export default function DocsPage() {
  const sideBarSectionsData: SideBarNavT[] = navigation.sideBarSections

  return (
    <div className="cols">
      <div className="col-4">
        <ul>
          {sideBarSectionsData.map((item, idx) => {
            return (
              <SideBarNav
                key={idx}
                tagAttr={'li'}
                Id={idx}
                title={item.title}
                link={item.link}
                subNavigation={item.subNavigation}
              />
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
