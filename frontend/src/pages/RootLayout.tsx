import { Header } from '../Components'
import DocsPage from './docs'

export default function RootLayout() {
  return (
    <>
      <Header />

      <main>
        <DocsPage />
      </main>
    </>
  )
}
