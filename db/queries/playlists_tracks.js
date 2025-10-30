import db from "#db/client";

export async function createPlaylists_tracks(playlists_id, tracks_id) {
  const sql = ` 
    INSERT INTO playlists_tracks
    ( playlists_id, 
     tracks_id)
     VALUES 
     ($1, $2)
     RETURNING * 
     `;
  const {
    rows: [playlist_track],
  } = await db.query(sql, [playlists_id, tracks_id]);
  return playlist_track;
}
