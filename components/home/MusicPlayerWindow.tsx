const MusicPlayerWindow = () => {
  return (
    <div className="w-full h-full bg-black">
      <iframe
        title="Spotify Embed: Build Inc. Playlist"
        src="https://open.spotify.com/embed/playlist/6pEbErhMyNati1TEcZ8jsz?utm_source=generator&theme=0"
        width="100%"
        height="100%"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-lg"
      />
    </div>
  );
};

export default MusicPlayerWindow;
