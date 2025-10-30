import express from "express";
const router = express.Router();
export default router;
import {
  createPlaylist,
  getPlaylistById,
  getPlaylists,
} from "#db/queries/playlist";
import { getTracksByPlaylistId } from "#db/queries/tracks";
import { createPlaylists_tracks } from "#db/queries/playlists_tracks";

router.get("/", async (req, res) => {
  const playlists = await getPlaylists();
  res.send(playlists);
});

router.post("/", async (req, res) => {
  const { name, description } = req.body || {};
  if (!req.body) return res.status(400).send("request must have body");
  if (!name || !description)
    return res.status(400).send("Request must have : name and description");
  const playlist = await createPlaylist(name, description);
  res.status(201).send(playlist);
});

router.param("id", async (req, res, next, id) => {
  if (!/^\d+$/.test(id))
    return res.status(400).send("ID must be a positive integer");
  const playlist = await getPlaylistById(id);
  if (!playlist) return res.status(404).send(" playlist does not exsist");
  req.playlist = playlist;
  next();
});

router.get("/:id", async (req, res) => {
  res.send(req.playlist);
});

router.get("/:id/tracks", async (req, res) => {
  const tracks = await getTracksByPlaylistId(req.playlist.id);
  res.send(tracks);
});

router.post("/:id/tracks", async (req, res) => {
  if (!req.body) return res.status(400).send("Request must have a body");
  const { tracks_id } = req.body;
  if (!tracks_id) return res.status(400).send("Request must have : tracks_id");

  const playlistTrack = await createPlaylists_tracks(
    req.playlist.id,
    tracks_id
  );
  res.status(201).send(playlistTrack);
});
