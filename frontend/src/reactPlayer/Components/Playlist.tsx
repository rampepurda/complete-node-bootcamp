import React, { FormEvent, useState } from 'react'
import { PlaylistT } from '../../types'
import { useMutation } from '@tanstack/react-query'
import { environment } from '../../configuration/environment'
import { Button } from '../../Components'
import { ReactPlayerCard } from './ReactPlayerCard'

export const Playlist = ({ url, title, id, isCompleted }: PlaylistT) => {
  const [toggleEditForm, setToggleEditForm] = useState<boolean>(false)

  /**
   * isVideoCompleted: In progress, status is Open
   *  const isVideoCompletedMutation = useMutation({
   *     mutationKey: [],
   *     mutationFn: async (arg: { id: string | number; isCompleted: string }) => {
   *       await fetch(`${environment.localPlaylistURL}/${arg.id}`, {
   *         method: 'PATCH',
   *         headers: { 'Content-Type': 'application/json' },
   *         body: JSON.stringify(arg.isCompleted),
   *       })
   *     },
   *     onError: (err) => alert(err),
   *   })
   *   async function videoIsCompleted() {
   *     return isVideoCompletedMutation.mutate({ id, isCompleted: 'true' })
   *   }
   */
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
      isCompleted: true,
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
      </div>

      <ReactPlayerCard url={`${url}`} />
    </div>
  )
}
