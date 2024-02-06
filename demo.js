let currentSong = new Audio();
function secoundsToMinutesSeconds(seconds){
    if(isNaN(seconds) || seconds < 0){
        return "invalid input"
    }
    const minutes = Math.floor(seconds/60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2,'0');
    const formatedSeconds = String(remainingSeconds).padStart(2,'0');

    return `${formattedMinutes}:${formatedSeconds}`
}

async function main(){
    let a = await fetch('http://127.0.0.1:5500/Songs/')
    let res = await a.text();
    // console.log(res);
    let element = document.createElement("div");
    element.innerHTML = res;
    let lis = element.getElementsByTagName("a")
    // console.log(lis);
    const songs = [];
    for (let index = 0; index < lis.length; index++) {
        const element = lis[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split('/Songs/')[1])
        }
        
    }
    // console.log(songs);
    return songs;
}

async function call(){

    
    let songs = await main();
    console.log(songs);
    let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0];
    console.log(songUl);
    for (const song of songs) {
        songUl.innerHTML = songUl.innerHTML + `<li> 
        <img src="Play.svg" alt="" srcset="">
        <div class="info">
            <div>${song}</div>
            <div>Demo</div>
        </div>
        </li>`;
    }

    //attach a event listner to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click", element =>{
            playMusic(e.getElementsByTagName("div")[0].firstElementChild.innerHTML)
            
        })
        // console.log(e.getElementsByTagName("div")[0].firstElementChild.innerHTML)
    })
 
     const playMusic = (track)=>{
        currentSong.src = "/Songs/"+track;
        // let audio = new Audio("/Songs/"+track);
         currentSong.play();
        play.src = "pause.svg";
        document.querySelector(".songInfo").innerHTML = track;
        document.querySelector(".songTime").innerHTML = "00:00 / 00:00";
     }
    //play the first songs
    // let audio = new Audio(songs[0]);
    // audio.play();

    // audio.addEventListener("loadeddata",()=>{
    //     let duration = audio.duration;
    //     console.log(duration)
    // })

    //attach a event listner for previous and next
    play.addEventListener("click",()=>{
        if(currentSong.paused){
            currentSong.play()
            play.src = "pause.svg"
        }else{
            currentSong.pause()
            play.src = "play.svg"
        }
    })
    //event for time update
    currentSong.addEventListener("timeupdate",()=>{
        document.querySelector(".songTime").innerHTML = `${secoundsToMinutesSeconds(currentSong.currentTime)} /
        ${secoundsToMinutesSeconds(currentSong.duration)}`
        // console.log(currentSong.currentTime,currentSong.duration);
     document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration)*100 + '%';
    })

    //add a event listner to seekbar
    document.querySelector(".seekbar").addEventListener("click",(e)=>{
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + '%';
        currentSong.currentTime = ((currentSong.duration)*percent)/100;
    })

};
call();

// document.querySelector(".songInfo").innerHTML = track;
//             document.querySelector(".songTime").innerHTML = "00:00 / 00:00"
