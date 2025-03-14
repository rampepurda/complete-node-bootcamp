const express = require("express");
const { v4: generateId } = require("uuid");
const { getAll, replacePlaylist } = require("../dataEvent/event");
const router = express.Router();

router.get("/playlist", async (req, res) => {
  const storedData = await getAll();
  const playlist = storedData.playlist;

  return res.status(200).json({
    playlist,
    message: "Response Successful",
    playlistTotal: playlist.length,
  });
});

router.patch('/playlist/:id', async (req, res, next) => {
  const { title, isCompleted } = req.body
  const dataApi = await getAll()
  const paramsId = Number(req.params.id)
  const index = dataApi.playlist.findIndex((item) => item.id === paramsId)
  const selectedPlaylist = dataApi.playlist[index]

  if(selectedPlaylist) {
    try {
      await replacePlaylist(paramsId, {
        title,
        isCompleted,
        url: selectedPlaylist.url,
        like: selectedPlaylist.like,
      })

      res.json({ message: 'Status was updated.' })
    } catch (error) {
      next(error)
    }
  }

  if(res.status(400)) {
    res.json({message: 'Wrong Id'})
  }
})

router.patch('/playlist/vote/:id', async (req, res, next) => {
  const dataApi = await getAll()
  const paramsId = Number(req.params.id)
  const index = dataApi.playlist.findIndex((item) => item.id === paramsId)
  const selectedPlaylist = dataApi.playlist[index]

  if(selectedPlaylist) {
    const incLike = selectedPlaylist.like + 1

    try {
      await replacePlaylist(paramsId, {
        like: incLike,
        url: selectedPlaylist.url,
        title: selectedPlaylist.title,
        isCompleted: selectedPlaylist.isCompleted,
      })

      res.status(201).json({ message: 'You voted' })
    } catch (error) {
      next(error)
    }
  }

  res.json({message: 'Wrong Id'})
})

module.exports = router;
