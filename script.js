// Variables
let audio_input = document.getElementsByClassName("file_chooser")[0];
let music_playlist = document.querySelector(".music-playlist");

// Functions
function file_selection_handler(event) {
  let selected_file = event.target.files[0];

  if (selected_file) {
    let reader = new FileReader();
    console.log(reader);

    reader.onload = function (e) {
      let data = e.target.result;
      // play_audio(data);
    };

    let file_data = reader.readAsDataURL(selected_file);
    get_file_info(selected_file);
  }

  if (audio_input.files.length > 0) {
    let audio_tag = document.createElement("audio");
    audio_tag.classList = "w-[80%] h-[30px] bg-color-black"
    let source_tag = document.createElement("source");

    source_tag.src = URL.createObjectURL(audio_input.files[0]);
    source_tag.type = "audio/mp3";    
    audio_tag.appendChild(source_tag);
    audio_tag.style.aspectRatio = "1/1"
    audio_tag.style.height = "23px"
    audio_tag.style.backgroundColor = "red"

    music_playlist.appendChild(audio_tag);
  } else {
    console.log("No file selected.");
  }
}

function play_audio(url) {
  let audio = new Audio(url);
  audio.play();
}

function get_file_info(file) {
  let file_name = file.name;
}

audio_input.addEventListener("change", file_selection_handler);
