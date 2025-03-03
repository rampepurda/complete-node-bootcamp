import { Link } from 'react-router-dom'
import { Playlist } from './Components/Playlist'
import { useQuery } from '@tanstack/react-query'
import { PlaylistT } from '../types'
import { environment } from '../configuration/environment'

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
      margin: '1rem',
    },
  }

  return (
    <div style={styles.cover}>
      <title>ReactPlayer - all about</title>
      <meta name="author" content="Josh" />
      <meta name="keywords" content="video, react" />
      <Link to="/" style={styles.link}>
        &larr; Home
      </Link>

      <h2>ReactPlayer</h2>
      <h4 className="color-is-red">
        If video is completed - works, only refresh page. Next in progress
      </h4>
      <h5>npm install react-player # or yarn add react-player</h5>
      <Link to="https://www.npmjs.com/package/react-player" rel="external" target="_blank">
        See more
      </Link>

      <section>
        {(isLoading && <h3>Loading wait</h3>) || (error && <h3>Ops, something happened</h3>)}
        {data?.playlistTotal && (
          <h4>
            Total videos: <mark>{data.playlistTotal}</mark>
          </h4>
        )}

        {data?.playlist?.map((item) => <Playlist {...item} key={item.id} />)}
      </section>
    </div>
  )
}
