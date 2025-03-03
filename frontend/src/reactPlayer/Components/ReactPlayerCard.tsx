import ReactPlayer from 'react-player'
import { Loader } from '../../Components'
import { useMutation } from '@tanstack/react-query'
import { environment } from '../../configuration/environment'

type Props = {
  url: string
  id: string | number
  title: string
}

const ReactPlayerCard = ({ url, id, title }: Props) => {
  const { mutate } = useMutation({
    mutationKey: [`video-${id}`],
    mutationFn: async (arg: { title: string; isCompleted: boolean }) => {
      await fetch(`${environment.localPlaylistURL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
      })
    },
    onSuccess: () => alert('Video is Completed'),
    onError: (error) => alert(error),
  })

  return (
    <ReactPlayer
      url={`${url}`}
      controls={true}
      onEnded={() => mutate({ title: title, isCompleted: true })}
    />
  )
}
export default ReactPlayerCard
