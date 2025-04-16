import React, { FormEvent, lazy, Suspense, useState } from 'react'
import { PlaylistT } from '../../types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { environment } from '../../configuration/environment'
import { Button, Loader } from '../../Components'
import ReactPlayerCard from './ReactPlayerCard'

const Playlist = ({ url, title, id, isCompleted, like, views }: PlaylistT) => {
  const queryClient = useQueryClient()
  const [toggleEditForm, setToggleEditForm] = useState<boolean>(false)
  const patchPlaylistTitleMutation = useMutation({
    mutationKey: [`video${id}`],
    mutationFn: async (arg: { id: string | number; dataForm: Record<string, any> }) => {
      await fetch(`${environment.localPlaylistURL}/${arg.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg.dataForm),
      })
    },
    onError: (err) => alert(err),
    onSuccess: () => alert('Title changed'),
  })
  const patchLikeMutation = useMutation({
    mutationKey: [`like${id}`],
    mutationFn: async (arg: { id: string | number }) => {
      await fetch(`${environment.localPlaylistURL}/vote/${arg.id}`, {
        method: 'PATCH',
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
    onError: (err) => alert(err),
    onSuccess: () => alert('You voted'),
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['playlist'] })
    },
  })
  const handleSubmitStatus = async (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget)
    const formData = Object.fromEntries(data)
    const finalData = {
      title: formData.title,
      isCompleted: false,
    }

    patchPlaylistTitleMutation.mutate({ id, dataForm: finalData })
  }

  return (
    <div className="hasOutline">
      <h2>{title}</h2>

      {isCompleted ? (
        <>
          <p className="color-is-green">Video has been viewed</p>

          <Button
            classesName={'btn btn-edit'}
            OnClick={() => setToggleEditForm(!toggleEditForm)}
            rest={{ type: 'button' }}
            title={toggleEditForm ? 'Close' : 'Edit'}
          />
          {toggleEditForm && (
            <form method="patch" onSubmit={handleSubmitStatus}>
              <input name="title" type="text" placeholder={title} required={true} />
              <button className="btn btn-submit" type="submit">
                Submit
              </button>
            </form>
          )}
        </>
      ) : (
        <p className="color-is-red">Video not viewed yet.</p>
      )}

      <div className="display-flex-start like-box hasOutline">
        <Button
          classesName={'btn-link-has-ico'}
          OnClick={() => patchLikeMutation.mutate({ id })}
          rest={{ type: 'submit', disabled: !isCompleted }}
          ariaLabel={
            !isCompleted ? 'you can not vote after seeing video' : 'vote if you like this video'
          }
        >
          <img src="/ico-thumbs-up.svg" width={24} height={24} aria-hidden={true} />
        </Button>
        <span className="numLike" aria-label="number of likes" style={{ padding: '.3rem 0' }}>
          <strong>{like}</strong>
        </span>
        {!isCompleted && <span className="message">| You can vote after seeing video</span>}&nbsp; |
        &nbsp;Number of views:&nbsp;
        <strong>{views}</strong>
      </div>

      <ReactPlayerCard url={`${url}`} id={id} title={title} />
    </div>
  )
}

export default Playlist
