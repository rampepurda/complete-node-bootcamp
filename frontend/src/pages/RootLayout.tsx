import { Header } from '../Components'
import DocsPage from './docs'
import '../i18n/config'

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
