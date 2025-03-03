import React, { FormEvent, lazy, Suspense, useState } from 'react'
import { PlaylistT } from '../../types'
import { useMutation } from '@tanstack/react-query'
import { environment } from '../../configuration/environment'
import { Button, Loader } from '../../Components'
//import { ReactPlayerCard } from './ReactPlayerCard'

const ReactPlayerCard = lazy(() => import('./ReactPlayerCard'))
export const Playlist = ({ url, title, id, isCompleted }: PlaylistT) => {
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
        <p className="color-is-green">video is Completed</p>
      ) : (
        <p className="color-is-red">video is not Completed</p>
      )}

      <div>
        {isCompleted && (
          <>
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
        )}
      </div>

      <Suspense fallback={<Loader />}>
        <ReactPlayerCard url={`${url}`} id={id} title={title} />
      </Suspense>
    </div>
  )
}
