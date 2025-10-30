DROP TABLE IF EXISTS playlists_tracks;
DROP TABLE IF EXISTS playlists;
DROP TABLE IF EXISTS tracks;



CREATE TABLE playlists(
    id serial PRIMARY KEY, 
    name text NOT NULL, 
    description text NOT NULL
);

CREATE TABLE tracks(
    id serial PRIMARY KEY,
    name text NOT NULL, 
    duration_ms integer NOT NULL 
);

CREATE TABLE playlists_tracks(
    id serial PRIMARY KEY, 
    playlists_id integer NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
    tracks_id integer NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
    UNIQUE (playlists_id, tracks_id)
);
