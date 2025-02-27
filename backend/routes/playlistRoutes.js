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
        url: selectedPlaylist.url,
        isCompleted
      })

      res.json({ message: 'Status was updated.' })
    } catch (error) {
      next(error)
    }
  }
})

module.exports = router;
