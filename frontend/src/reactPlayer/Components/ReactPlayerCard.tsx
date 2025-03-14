import ReactPlayer from 'react-player'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { environment } from '../../configuration/environment'
import { PlaylistT } from '../../types'

type Props = {
  url: string
  id: string | number
  title: string
}

const ReactPlayerCard = ({ url, id, title }: Props) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: [`video-${id}`],
    mutationFn: async (arg: { title: string; isCompleted: boolean }) => {
      await fetch(`${environment.localPlaylistURL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
      })
    },
    onMutate: async (
      newPlaylist
    ): Promise<
      { playlist: PlaylistT; message: string; playlistTotal: number | undefined } | unknown
    > => {
      await queryClient.cancelQueries({ queryKey: ['playlist'] })
      const previousPlaylist = queryClient.getQueryData(['playlist'])
      queryClient.setQueryData(['playlist'], (playlistOldData) => [playlistOldData, newPlaylist])

      return { previousPlaylist }
    },
    onError: (error) => alert(error),
    onSuccess: () => alert('Video is Completed'),
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['playlist'] })
    },
  })

  return (
    <ReactPlayer
      url={`${url}`}
      controls={true}
      onEnded={() => mutate({ title: title, isCompleted: true })}
      style={{ marginTop: '1rem' }}
    />
  )
}
export default ReactPlayerCard
