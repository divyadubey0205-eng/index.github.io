const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");
const progressBar = document.querySelector("#progress .bar");
const progressWrap = document.getElementById("progress");
const curtime = document.getElementById("curtime");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");

const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const list = document.getElementById("list");
const count = document.getElementById("count");

let songs = [
  {title:"Beedi Jalaile", artist:"Dhinchak Pooja", src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover:"https://picsum.photos/200?1"},
  {title:"Kala Chashma", artist:"Badshah", src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover:"https://picsum.photos/200?2"},
  {title:"Tamma Tamma", artist:"Bappi Lahiri", src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover:"https://picsum.photos/200?3"},
  {title:"Lungi Dance", artist:"Yo Yo Honey Singh", src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover:"https://picsum.photos/200?4"},
  {title:"Selfie Le Le Re", artist:"Mohit Chauhan", src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover:"https://picsum.photos/200?5"},
  {title:"Swag Se Swagat", artist:"Vishal-Shekhar", src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover:"https://picsum.photos/200?6"},
  {title:"Baby Doll", artist:"Kanika Kapoor", src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover:"https://picsum.photos/200?7"},
  {title:"London Thumakda", artist:"Neha Kakkar", src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", cover:"https://picsum.photos/200?8"},
  {title:"Coca Cola", artist:"Tony Kakkar", src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover:"https://picsum.photos/200?9"},
  {title:"Baby Shark", artist:"Pinkfong", src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover:"https://picsum.photos/200?10"},
];

let current = 0;
let isShuffle = false;
let isRepeat = false;

function loadSong(i){
  let s = songs[i];
  title.textContent = s.title;
  artist.textContent = s.artist;
  cover.src = s.cover;
  audio.src = s.src;
}

loadSong(current);

function playSong(){audio.play(); playBtn.textContent="⏸";}
function pauseSong(){audio.pause(); playBtn.textContent="▶";}

playBtn.addEventListener("click",()=>audio.paused?playSong():pauseSong());
nextBtn.addEventListener("click",nextSong);
prevBtn.addEventListener("click",prevSong);
shuffleBtn.addEventListener("click",()=>isShuffle=!isShuffle);
repeatBtn.addEventListener("click",()=>isRepeat=!isRepeat);

function nextSong(){
  if(isShuffle) current=Math.floor(Math.random()*songs.length);
  else current=(current+1)%songs.length;
  loadSong(current);
  playSong();
}

function prevSong(){
  current=(current-1+songs.length)%songs.length;
  loadSong(current);
  playSong();
}

audio.addEventListener("timeupdate",()=>{
  let percent=(audio.currentTime/audio.duration)*100;
  progressBar.style.width=percent+"%";
  curtime.textContent=format(audio.currentTime);
  duration.textContent=format(audio.duration);
});

audio.addEventListener("ended",()=>{
  if(isRepeat) playSong();
  else nextSong();
});

progressWrap.addEventListener("click",(e)=>{
  let w=progressWrap.clientWidth;
  audio.currentTime=(e.offsetX/w)*audio.duration;
});

volume.addEventListener("input",()=>{audio.volume=volume.value;});

function format(sec){
  if(isNaN(sec)) return "0:00";
  let m=Math.floor(sec/60),s=Math.floor(sec%60);
  if(s<10) s="0"+s;
  return m+":"+s;
}

function renderList(){
  list.innerHTML="";
  songs.forEach((s,i)=>{
    let div=document.createElement("div");
    div.className="song";
    div.innerHTML=`<img src="${s.cover}"><div class="info"><div class="name">${s.title}</div><div class="artist">${s.artist}</div></div><button class="like">❤️</button>`;
    div.onclick=()=>{current=i;loadSong(i);playSong();}
    div.querySelector(".like").onclick=(e)=>{e.stopPropagation(); div.querySelector(".like").textContent="💚";}
    list.appendChild(div);
  });
  count.textContent=songs.length+" songs";
}

renderList();

// Search filter
document.getElementById("search").addEventListener("input",(e)=>{
  let val=e.target.value.toLowerCase();
  document.querySelectorAll(".song").forEach(s=>{
    s.style.display = s.innerText.toLowerCase().includes(val) ? "flex" : "none";
  });
});
