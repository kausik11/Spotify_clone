

async function getsong(){
    let a = await fetch("http://127.0.0.1:5500/Songs/");
    let res  = await a.text();
    let div = document.createElement("div");
    div.innerHTML = res;
    let songs = [];
    let song = div.getElementsByTagName("a");
    for (let index = 0; index < song.length; index++) {
        const element = song[index];
       if(element.href.endsWith(".mp3")){
        songs.push(element.href);

       }
        
    }
   return songs;
    
};

async function show(){

    let songs = await getsong();
    console.log(songs);

 let lib = document.querySelector(".songList").getElementsByTagName('ul')[0];
 console.log(lib)
  for (const song of songs) {
    lib.innerHTML = lib.innerHTML + `<li>${song}</li>`;
    console.log(song)
    
  }

    let audio = new Audio(songs[1]);
    audio.play();
}
show();



