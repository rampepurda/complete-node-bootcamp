const express = require("express");
const { v4: generateId } = require("uuid");
const { getAll, replacePlaylist } = require("../dataEvent/event");
const { writeData } = require("../util/getData");
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
  const index = dataApi.playlist.findIndex((item) => item.id === req.params.id)
  const selectedPlaylist = dataApi.playlist[index]

  try {
    await replacePlaylist(req.params.id, {
      title,
      url: selectedPlaylist.url,
      isCompleted
    })

    res.json({ message: 'Status was updated.' })
  } catch (error) {
    next(error)
  }
})


module.exports = router;
