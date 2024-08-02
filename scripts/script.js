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

      playlist.forEach((i, index) => {
        let song_details = {
          songName: i.name.split(".")[0],
          songUrl: URL.createObjectURL(i),
          song_index: index,
        };
        play_list_item.innerText = song_details.songName;
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
        play_list_item.className = `song${index}`;
        play_list_item.setAttribute("data-song-URL", song_details.songUrl);
        play_list_item.setAttribute("data-song-index", song_details.song_index);
        music_playlist.appendChild(play_list_item);
      });

      play_list_item.addEventListener("click", (e) => {
        audioContext.src = e.target.getAttribute("data-song-URL");
        let element_index = e.target.getAttribute("data-song-index");
        audioContext.play();
        play.src = "SVG/pause.svg";
        play.addEventListener("click", () => {
          if (audioContext.paused) {
            play.src = "SVG/pause.svg";
            audioContext.play();
          } else {
            audioContext.pause();
            play.src = "SVG/play.svg";
          }
        });

        audioContext.addEventListener("timeupdate", () => {
          let song_progress =
            (audioContext.currentTime / audioContext.duration) * 100;
          if (song_progress === 100) {
            seek_bar.value = 0;
          } else {
            seek_bar.value = song_progress;
          }
        });

        seek_bar.addEventListener("input", (e) => {
          let current_value = e.target.value;
          audioContext.currentTime =
            (current_value * audioContext.duration) / 100;
          play.src = "SVG/play.svg";
        });

        forward.addEventListener("click", () => {
          if (playlist.length <= 1) {
            alert("Add a song.");
          }

          element_index++;

          let next_song = document
            .querySelector(`.song${element_index}`)
            .getAttribute("data-song-URL");
          audioContext.src = next_song;

          audioContext.play();
        });

        rewind.addEventListener("click", () => {
          if (playlist.length == 1 || element_index === 0) {
            audioContext.currentTime = 0;
          }

          element_index--;

          let next_song = document
            .querySelector(`.song${element_index}`)
            .getAttribute("data-song-URL");
          audioContext.src = next_song;

          audioContext.play();
        });
      });
    });
  });
});
