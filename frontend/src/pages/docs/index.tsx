import { Outlet, useLocation } from 'react-router-dom'
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
  const { pathname } = useLocation()
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
        {pathname === '/' && (
          <section className="hasOutline">
            <h2>Project dependencies:</h2>
            <ul className="hasTypeDisc">
              <li>
                <strong>"react":</strong> "^19.0.0",
              </li>
              <li>
                <strong>"react-router-dom":</strong> "7",
              </li>
              <li>
                <strong>"typescript":</strong> "^5.7.3",
              </li>
            </ul>
          </section>
        )}

        <Outlet />
      </div>
    </div>
  )
}
