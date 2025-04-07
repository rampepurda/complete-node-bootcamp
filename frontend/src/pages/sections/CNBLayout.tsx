import { Header, LngSwitcher } from '../../Components'
import React from 'react'
import DocsPage from '../docs'

export default function CNBLayout() {
  return (
    <>
      <title>Complete Node Bootcamp</title>
      <meta name="author" content="Michal" />
      <meta name="keywords" content="node, nodeExpress, react" />

      <Header title={'Complete Node Bootcamp'}>
        <LngSwitcher />
      </Header>

      <main>
        <DocsPage />
      </main>
    </>
  )
}
