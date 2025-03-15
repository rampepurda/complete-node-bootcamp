import React, { FormEvent, lazy, Suspense, useState } from 'react'
import { PlaylistT } from '../../types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { environment } from '../../configuration/environment'
import { Button, Loader } from '../../Components'

const ReactPlayerCard = lazy((): Promise<any> => import('./ReactPlayerCard'))

export const Playlist = ({ url, title, id, isCompleted, like }: PlaylistT) => {
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
    <div className="hasOutline width-is-7">
      <h2>{title}</h2>

      {isCompleted ? (
        <>
          <p className="color-is-green">video is Completed</p>

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
        <p className="color-is-red">video is not Completed</p>
      )}

      <div className="display-flex-start like-box">
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

        <span className="numLike" aria-label="number of likes">
          {like}
        </span>
        {!isCompleted && <span className="message">| You can vote after seeing video</span>}
      </div>

      <Suspense fallback={<Loader />}>
        <ReactPlayerCard url={`${url}`} id={id} title={title} />
      </Suspense>
    </div>
  )
}
