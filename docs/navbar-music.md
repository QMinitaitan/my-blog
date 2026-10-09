# Compact navbar music

`src/config/musicConfig.ts` exports `navbarPlaylist`: edit each name, artist,
cover and audio URL without changing the player. The initial short melody is
original test audio (`public/music/study-demo.wav`); it is not a recording of
any of the four requested examples. Those examples retain empty URLs until
the owner supplies formal resources. Missing resources show their true state.

`NavbarMusic.astro` sits outside Swup's `main`/`#toc` replacement containers.
It creates one Audio and MusicSession for the document, subscribes once, and
never mounts the retained legacy/sidebar music manager. Article navigation
therefore preserves audio, progress and state. Full page reload starts paused.

Playback state follows audio events. Pause preserves position, selecting a
new song resets it, rejected playback reports failure, and request generations
prevent superseded promise rejections from overwriting a newer song. Metadata
controls seek availability; duration and progress are never simulated.

Browser acceptance should include the original test audio's play, pause,
resume, seek, ended and failure paths, internal navigation while playing,
keyboard song selection, first/last centering, dark/light/theme color, narrow
screens and reduced motion. Formal four-song acceptance remains pending the
owner's audio resources.
