document.addEventListener("DOMContentLoaded", () => {
  const audioContext = new Audio();

  let music_playlist = document.querySelector(".music_playlist");
  let playlist = [];
  let audio_chooser = document.querySelector(".file_chooser");
  // Creating Playlist Items
  let play = document.querySelector(".play");
  let forward = document.querySelector(".forward");
  let rewind = document.querySelector(".rewind");
  let seek_bar = document.querySelector(".progress_bar");

  audio_chooser.addEventListener("change", (e) => {
    let play_list_item = document.createElement("div");
    Array.from(audio_chooser.files).forEach((file) => {
      playlist.push(file);
      playlist.forEach((i) => {
        audio_URL = URL.createObjectURL(i);
        play_list_item.innerText = i.name.split(".")[0];
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
        play_list_item.className = "indie_audio";
        music_playlist.appendChild(play_list_item);
      });

      document.querySelector(".indie_audio").addEventListener("click", () => {
        audioContext.src = audio_URL;
        console.log(audioContext.currentSrc);
        audioContext.play();
        play.src = "SVG/pause.svg";
        play.addEventListener("click", () => {
          if (audioContext.paused) {
            audioContext.play();
            play.src = "SVG/play.svg";
          } else {
            audioContext.pause();
            play.src = "SVG/pause.svg";
          }
        });
      });
    });
  });
});
