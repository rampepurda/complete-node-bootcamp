import React, { FormEvent, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { PlaylistT } from '../../types'
import { useMutation } from '@tanstack/react-query'
import { environment } from '../../configuration/environment'

export const Playlist = ({ url, title, id, isCompleted }: PlaylistT) => {
  const [isCompleteD, setIsCompleted] = useState<boolean>(false)
  const [toggleEditForm, setToggleEditForm] = useState<boolean>(false)
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const isVideoCompletedMutation = useMutation({
    mutationKey: [],
    mutationFn: async (arg: { id: string | number; onEnded: string }) => {
      await fetch(`${environment.localPlaylistURL}/${arg.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg.onEnded),
      })
    },
    onError: (err) => alert(err),
  })
  const patchPlaylistMutation = useMutation({
    mutationKey: [],
    mutationFn: async (arg: { id: string | number; dataForm: Record<string, any> }) => {
      await fetch(`${environment.localPlaylistURL}/${arg.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg.dataForm),
      })
    },
    onError: (err) => alert(err),
  })
  const handleSubmitStatus = async (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget)
    const formData = Object.fromEntries(data)

    patchPlaylistMutation.mutate({ id: id, dataForm: formData })
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
        <button
          className="btn btn-edit"
          type="button"
          onClick={() => setToggleEditForm(!toggleEditForm)}
        >
          {toggleEditForm ? 'Close' : 'Edit'}
        </button>

        {toggleEditForm && (
          <form method="patch" onSubmit={handleSubmitStatus} aria-expanded={toggleEditForm}>
            <input name="title" type="text" placeholder="change title" required={true} />
            <label htmlFor="checkVideo">
              Is video completed:
              <input
                id="checkVideo"
                className="width-is-1"
                name="isCompleted"
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                aria-label={isChecked ? 'is completed' : 'not completed'}
              />
            </label>

            <button className="btn btn-submit" type="submit">
              Submit
            </button>
          </form>
        )}
      </div>

      <ReactPlayer url={`${url}`} controls={true} onEnded={() => setIsCompleted(true)} />
    </div>
  )
}
