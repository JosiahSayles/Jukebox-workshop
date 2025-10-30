import { getTracks, getTracksById } from "#db/queries/tracks";
import express from "express";
const router = express.Router();
export default router;

router.get("/", async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

router.param("id", async (req, res, next, id) => {
  if (!/^\d+$/.test(id))
    return res.status(400).send("ID must be a positive integer");
  const track = await getTracksById(req.params.id);
  if (!track) return res.status(404).send("Track does not exist");
  req.tracks = track;
  next();
});

router.get("/:id", async (req, res) => {
  res.send(req.tracks);
});
