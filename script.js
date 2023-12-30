// Variables
let audio_input = document.getElementsByClassName("file_chooser")[0];
let music_playlist = document.querySelector(".music_playlist");
let play_or_pause_button = document.getElementsByClassName("play")[0];
let progress_bar = document.getElementsByClassName("progress_bar")[0];
let audio; // Declare audio variable outside functions
let resume_position = 0;

// Functions

function file_selection_handler(event) {
  let selected_file = event.target.files[0];

  if (selected_file) {
    let reader = new FileReader();

    reader.onload = function (e) {
      let data = e.target.result;

      audio = new Audio(); // Initialize audio once

      if (audio_input.files.length > 0) {
        let source_tag = document.createElement("source");
        let play_list_item = document.createElement("div");
        play_list_item.style.aspectRatio = "1/1";
        play_list_item.style.height = "30px";
        play_list_item.style.backgroundColor = "#574e4e";
        play_list_item.style.width = "90%";
        play_list_item.style.marginLeft = "8px";
        play_list_item.style.marginTop = "15px";
        play_list_item.style.borderRadius = "5px";
        play_list_item.style.cursor = "pointer";
        play_list_item.style.display = "flex";
        play_list_item.style.alignItems = "center";
        play_list_item.innerText = selected_file.name;

        source_tag.src = URL.createObjectURL(audio_input.files[0]);
        source_tag.type = "audio/mp3";

        audio.appendChild(source_tag);
        audio.controls = true;
        audio.style.width = "100%";
        audio.style.border = "2px solid white";
        audio.style.display = "none";

        music_playlist.appendChild(audio);
        music_playlist.appendChild(play_list_item);

        play_list_item.addEventListener("click", () => {
          play_audio(data);
          audio.currentTime = 0;
        });

        play_or_pause_button.addEventListener("click", () => {
          if (audio.paused) {
            play_audio(data);
            play_or_pause_button.src = "SVG/pause.svg";
            play_or_pause_button.style.height = "58px";
          } else {
            pause_audio();
            play_or_pause_button.src = "SVG/play.svg";
          }
        });
      } else {
        console.log("No file selected.");
      }
    };

    let file_data = reader.readAsDataURL(selected_file);
  }
}

function play_audio(url) {
  audio.src = url; // Set the source
  audio.currentTime = resume_position; 
  audio.play();
}

function pause_audio() {
  resume_position = audio.currentTime; 
  audio.pause();
}

audio_input.addEventListener("change", file_selection_handler);


//implement progress bar