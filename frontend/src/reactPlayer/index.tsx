import { Link } from 'react-router'
//import { Playlist } from './Components/Playlist'
import { useQuery } from '@tanstack/react-query'
import { PlaylistT } from '../types'
import { environment } from '../configuration/environment'
import { Header, Loader } from '../Components'
import React, { lazy, Suspense } from 'react'

const Playlist = lazy(() => import('./Components/Playlist'))

export default function ReactPlayerPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['playlist'],
    queryFn: async (): Promise<
      | {
          playlist: PlaylistT[] | undefined
          message: string
          playlistTotal: number | undefined
        }
      | undefined
    > => {
      try {
        return await fetch(`${environment.localPlaylistURL}`, { method: 'GET' }).then((response) =>
          response.json()
        )
      } catch (err: any) {
        alert(err)
      }
    },
  })

  const styles = {
    link: {
      backgroundColor: '#000',
      padding: '.4rem 1rem',
      color: '#fff',
      textDecoration: 'none',
    },
    cover: {
      margin: '1rem 20%',
    },
  }

  return (
    <>
      <>
        <title>ReactPlayer - all about</title>
        <meta name="author" content="Josh" />
        <meta name="keywords" content="video, react" />
      </>

      <Header title={'ReactPlayer'} />

      <div style={styles.cover}>
        <section>
          {(isLoading && <h3>Loading wait</h3>) || (error && <h3>Ops, something happened</h3>)}
          {data?.playlistTotal && (
            <h2>
              Playlist Total: <span className="color-is-darkmagenta">{data.playlistTotal}</span>
            </h2>
          )}
          <code>npm install react-player | yarn add react-player</code>
          <Link
            className="link-ico-external"
            to="https://www.npmjs.com/package/react-player"
            rel="external"
            target="_blank"
          >
            React Player - see more{' '}
            <img src="/ico-internal.svg" width={24} height={24} aria-hidden={true} />
          </Link>

          {data?.playlist?.map((item) => (
            <Suspense fallback={<Loader />}>
              <Playlist {...item} key={item.id} />
            </Suspense>
          ))}
        </section>
      </div>
    </>
  )
}
