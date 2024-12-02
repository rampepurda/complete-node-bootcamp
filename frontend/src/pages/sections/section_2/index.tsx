import { Outlet, useLocation } from 'react-router-dom'

export default function Section_2Index() {
  const { pathname } = useLocation()

  return (
    <>
      {pathname === '/section2' && <h2>Section 2: Select Chapter</h2>}

      <Outlet />
    </>
  )
}
