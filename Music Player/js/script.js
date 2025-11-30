// Playlist
const playlist = [
  {
    src: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Scott_Holmes_Music/Corporate__Motivational_Music/Scott_Holmes_Music_-_04_-_Upbeat_Party.mp3",

    title: "Song One",
    artist: "Artist A",
    cover: "https://picsum.photos/seed/1/600",
  },
  {
    src: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Kevin_MacLeod/Classical_Sampler/Kevin_MacLeod_-_Canon_in_D_Major.mp3",
    title: "Song Two",
    artist: "Artist B",
    cover: "https://picsum.photos/seed/2/600",
  },
  {
    src: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator Jahzzar/Urban_Elysium/Jahzzar_-_Siesta.mp3",
    title: "Song Three",
    artist: "Artist C",
    cover: "https://picsum.photos/seed/3/600",
  },
];

// Elements
let audio = document.getElementById("audio");
let playBtn = document.getElementById("playBtn");
let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");
let seek = document.getElementById("seek");
let volume = document.getElementById("volume");
let autoplay = document.getElementById("autoplay");
let currentTimeEl = document.getElementById("currentTime");
let durationEl = document.getElementById("duration");
let songTitle = document.getElementById("songTitle");
let songArtist = document.getElementById("songArtist");
let coverArt = document.getElementById("coverArt");
let nowPlaying = document.getElementById("nowPlaying");
let playlistDiv = document.getElementById("playlist");

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

// Day-2

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

// Day-3

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
