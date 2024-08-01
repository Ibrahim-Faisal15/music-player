// Creating Objects
let audio_object = new Audio();
let file_reader = new FileReader();

// Global Variables
let playlist = [];
let audio_chooser = document.querySelector(".file_chooser");
let currrent_index = 0;

// Creating Playlist Items
let music_playlist = document.querySelector(".music_playlist");
let play = document.querySelector(".play");
let forward = document.querySelector(".forward");
let rewind = document.querySelector(".rewind");
let seek_bar = document.querySelector(".progress_bar");

// Load playlist from local storage on page load
document.addEventListener("DOMContentLoaded", () => {
  let storedPlaylist = localStorage.getItem("songs");

  if (storedPlaylist !== null) {
    playlist = JSON.parse(storedPlaylist);

    // Create playlist items for each stored item
    for (let i = 0; i < playlist.length; i++) {
      createPlaylistItem(playlist[i]);
    }
  }
});

audio_chooser.addEventListener("change", () => {
  for (let index = 0; index < audio_chooser.files.length; index++) {
    let audioURL = URL.createObjectURL(audio_chooser.files[index]);

    let play_list_data = {
      name: audio_chooser.files[index].name,
      url: audioURL,
    };

    // Update playlist and local storage
    playlist.push(play_list_data);
    localStorage.setItem("songs", JSON.stringify(playlist));

    // Create and append playlist item
    createPlaylistItem(play_list_data);
  }
});

function createPlaylistItem(play_list_data) {
  let play_list_item = document.createElement("div");
  play_list_item.innerText = play_list_data.name;
  play_list_item.style.height = "52px";
  play_list_item.style.backgroundColor = "#2c3e50";
  play_list_item.style.width = "90%";
  play_list_item.style.marginTop = "15px";
  play_list_item.style.marginTop = "15px";
  play_list_item.style.marginLeft = "15px";
  play_list_item.style.borderRadius = "5px";
  play_list_item.style.cursor = "pointer";
  play_list_item.style.display = "flex";
  play_list_item.style.alignItems = "center";
  play_list_item.style.color = "white";
  play_list_item.style.paddingLeft = "23px";

  play_list_item.addEventListener("click", () => {
    audio_object.src = play_list_data.url;
    audio_object.play();
    play.src = "SVG/pause.svg";
  });

  audio_object.addEventListener("", () => {
    progress = (audio_object.currentTime / audio_object.duration) * 100;
    seek_bar.value = progress;
  });

  seek_bar.addEventListener("input", () => {
    if (!audio_object.paused) {
      audio_object.currentTime = (seek_bar.value * audio_object.duration) / 100;
    }
  });

  play.addEventListener("click", () => {
    play.src = "SVG/play.svg";
    if (audio_object.paused || audio_object.currentTime <= 0) {
      audio_object.play();
      play.src = "SVG/pause.svg";
    } else {
      audio_object.pause();
      play.src = "SVG/play.svg";
    }
  });

  forward.addEventListener("click", () => {
    // Check if there are tracks in the playlist
    if (playlist.length > 0) {
      currrent_index++;

      if (currrent_index < playlist.length) {
        let nextAudioURL = URL.createObjectURL(playlist[currrent_index]);
        audio_object.src = nextAudioURL;

        // Play the next track
        audio_object.play();
        play.src = "SVG/pause.svg";
      } else {
        currrent_index = 0;
      }
    }
  });

  rewind.addEventListener("click", () => {
    // Check if there are tracks in the playlist
    if (playlist.length > 0) {
      currrent_index--;

      if (currrent_index >= 0) {
        let prevAudioURL = URL.createObjectURL(playlist[currrent_index]);
        audio_object.src = prevAudioURL;

        // Play the previous track
        audio_object.play();
        play.src = "SVG/pause.svg";
      } else {
        currrent_index = playlist.length - 1;
      }
    }
  });

  music_playlist.appendChild(play_list_item);
}
