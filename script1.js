document.addEventListener("DOMContentLoaded", function () {
  // Variables
  let audio_input = document.getElementsByClassName("file_chooser")[0];
  let music_playlist = document.querySelector(".music_playlist");
  let forward_button = document.querySelector(".forward");
  let rewind_button = document.querySelector(".rewind");
  let play_or_pause_button = document.getElementsByClassName("play")[0];
  let progress_bar = document.querySelector(".progress_bar");
  let song_list = [];
  let audio = new Audio();
  let resume_position = 0;

  // Functions
  function file_selection_handler(event) {
    let selected_file = event.target.files[0];
    song_list.push(selected_file);
    console.log(song_list);

    if (selected_file) {
      let reader = new FileReader();

      reader.onload = function (e) {
        let data = e.target.result;
        let source_tag = document.createElement("source");
        let play_list_item = document.createElement("div");

        play_list_item.style.height = "52px";
        play_list_item.style.backgroundColor = "#2c3e50";
        play_list_item.style.width = "90%";
        play_list_item.style.marginLeft = "40px";
        play_list_item.style.marginTop = "15px";
        play_list_item.style.borderRadius = "5px";
        play_list_item.style.cursor = "pointer";
        play_list_item.style.display = "flex";
        play_list_item.style.alignItems = "center";
        play_list_item.innerText = selected_file.name;

        source_tag.src = URL.createObjectURL(selected_file);
        source_tag.type = "audio/mp3";

        audio.appendChild(source_tag);
        audio.controls = true;
        audio.style.width = "100%";
        audio.style.border = "2px solid white";
        audio.style.display = "none";

        music_playlist.appendChild(audio);
        music_playlist.appendChild(play_list_item);

        forward_button.addEventListener("click", () => {
          play_audio(data);
        });

        play_list_item.addEventListener("click", () => {
          play_audio(data);
          audio.currentTime = 0;
          play_or_pause_button.src = "SVG/pause.svg";
        });

        update_seekbar();
        updating_audio_with_seekbar();

        play_or_pause_button.addEventListener("click", () => {
          if (audio.paused) {
            play_audio(data);
            play_or_pause_button.src = "SVG/pause.svg";
          } else {
            pause_audio();
            play_or_pause_button.src = "SVG/play.svg";
          }
        });
      };

      reader.readAsDataURL(selected_file);
    }
  }

  function update_seekbar() {
    audio.removeEventListener("timeupdate", updateSeekbarHandler);
    audio.addEventListener("timeupdate", updateSeekbarHandler);
  }

  function updateSeekbarHandler() {
    let progress = (audio.currentTime / audio.duration) * 100;
    progress_bar.value = progress;
  }

  function updating_audio_with_seekbar() {
    progress_bar.addEventListener("input", () => {
      let seekValue = progress_bar.value;
      let newTime = (seekValue / 100) * audio.duration;
      audio.currentTime = newTime;
    });
  }

  function play_audio(url) {
    audio.src = url;
    audio.currentTime = resume_position;
    audio.play();
  }

  function pause_audio() {
    resume_position = audio.currentTime;
    audio.pause();
  }

  audio_input.addEventListener("change", file_selection_handler);
});
