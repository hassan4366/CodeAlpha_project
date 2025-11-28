const playlist = [
  {
    src: "song1.mp3",
    title: "Song One",
    artist: "Artist A",
    cover: "https://picsum.photos/seed/1/600",
  },
  {
    src: "song2.mp3",
    title: "Song Two",
    artist: "Artist B",
    cover: "https://picsum.photos/seed/2/600",
  },
  {
    src: "song3.mp3",
    title: "Song Three",
    artist: "Artist C",
    cover: "https://picsum.photos/seed/3/600",
  },
];

// Elements
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const seek = document.getElementById("seek");
const volume = document.getElementById("volume");
const autoplay = document.getElementById("autoplay");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");
const coverArt = document.getElementById("coverArt");
const nowPlaying = document.getElementById("nowPlaying");
const playlistDiv = document.getElementById("playlist");

let index = 0;
let isPlaying = false;

// Load track
function loadTrack(i) {
  index = i;
  const track = playlist[i];

  audio.src = track.src;
  songTitle.textContent = track.title;
  songArtist.textContent = track.artist;
  coverArt.src = track.cover;
  nowPlaying.textContent = track.title + " — " + track.artist;

  highlightPlaylist();
}

// Play
function play() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "Pause";
}

// Pause
function pause() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "Play";
}

// Toggle
playBtn.onclick = () => (isPlaying ? pause() : play());

// Next & Prev
nextBtn.onclick = () => {
  index = (index + 1) % playlist.length;
  loadTrack(index);
  play();
};

prevBtn.onclick = () => {
  index = (index - 1 + playlist.length) % playlist.length;
  loadTrack(index);
  play();
};

// Time update
audio.ontimeupdate = () => {
  seek.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeEl.textContent = format(audio.currentTime);
};

// Seek
seek.oninput = () => {
  audio.currentTime = (seek.value / 100) * audio.duration;
};

// Volume
volume.oninput = () => {
  audio.volume = volume.value;
};

// Autoplay
audio.onended = () => {
  if (autoplay.checked) nextBtn.click();
};

// Duration
audio.onloadedmetadata = () => {
  durationEl.textContent = format(audio.duration);
};

// Format seconds → mm:ss
function format(sec) {
  if (!sec) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

// Playlist render
function renderPlaylist() {
  playlistDiv.innerHTML = "";
  playlist.forEach((track, i) => {
    const el = document.createElement("div");
    el.className = "track";
    el.textContent = track.title + " — " + track.artist;

    el.onclick = () => {
      loadTrack(i);
      play();
    };

    playlistDiv.appendChild(el);
  });
}

// Highlight active
function highlightPlaylist() {
  document.querySelectorAll(".track").forEach((t, i) => {
    t.classList.toggle("active", i === index);
  });
}

renderPlaylist();
loadTrack(0);
