document.addEventListener("DOMContentLoaded", () => {
  const audioContext = new AudioContext();

  let music_playlist = document.querySelector(".music_playlist");

  let playlist = [];

  let audio_chooser = document.querySelector(".file_chooser");

  audio_chooser.addEventListener("change", (e) => {
    let play_list_item = document.createElement("div");
    Array.from(audio_chooser.files).forEach((file) => {
      playlist.push(file);
      playlist.forEach((i) => {
        play_list_item.innerText = i.name.split(".mp3")[0];
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
        music_playlist.appendChild(play_list_item);

        music_playlist.addEventListener("click", () => {
          console.log(23);
        });
      });
    });
  });
});
