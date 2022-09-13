// console.log("Welcome to Melody"); to check print

// Initialize the Variables
let songIndex = 0; //list starting from 0 to n
let audioElement = new Audio('songs/1.mp3'); // nyi audio tag  bnayega // kuch ni play kiya to 1st audio play ho jayega  //timeupdate and change
let masterPlay = document.getElementById('masterPlay'); // master button index.html usko js se link krne k liye 
let myProgressBar = document.getElementById('myProgressBar'); //0 to 100 
let gif = document.getElementById('gif'); // jis document se js call hori //getelementtbyid id tag dhudega 
let masterSongName = document.getElementById('masterSongName'); //same as above 
let songItems = Array.from(document.getElementsByClassName('songItem')); //multiple ids chahiye thi to class wise dhuda array jitne bhi items bnayege wo is variable me aa jayege


//songs ka aaray bnaye jo dikhana h wo songname or jo dhundna h wo file and cover
let songs = [
    {songName: "Akhiyaan Milavanga - Arijit Singh", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Baarish - Yaariyan", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Baddlan De Kaalje - Amrinder Gill", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Baarishien - Anuv Jain", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Darasal - Raabta (Atif Aslam)", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Distance-Love", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Ed-Sheeran-Photograph", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Jadon Tusi Hass De Ho Yaara V", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Jinne Saah Channa Mereya", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Ki Samjhaiye - Amrinder Gill", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
   
] // 


//jitni divisions hongi jo song name yha se aari h
// for each -for loop ka shortcut
// => lambda function syntax{}
// song item k ander element "img" dhundo usko start se songs jo array bnaya tha is array ka ith index me cover .src path ko dhudo
// testing song ame ko cut krra h or jo array se dhundra h 
    songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
}) //for loop khtm

// Handle play/pause click
// add event jo sune
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play(); //play audio
        masterPlay.classList.remove('fa-play-circle'); //play ko htaya
        masterPlay.classList.add('fa-pause-circle');//pause ko add kro
        gif.style.opacity = 1; //opacity true
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    // Update Seekbar apne ap
    //progress function defi og progress bar( int taki decimal me na jaye)
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);//kitne percent chra h
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{ //hum change krne pr
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{  //ek k bad ek play ho song
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

// songitmpl class se chla konse button ne konsa chlega
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();// apne ap ho jayega song or previous song ka icon apne ap change ho jayega 
        songIndex = parseInt(e.target.id); ///kon se no. wala song chlana
        e.target.classList.remove('fa-play-circle'); //jis pr target hua use utha liya
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`; //jo bhi song h uska index+1 0 +1 song play krna hai
        masterSongName.innerText = songs[songIndex].songName;// seekbar me update ho jayega
        audioElement.currentTime = 0; //song start from initial 
        audioElement.play();
        gif.style.opacity = 1;//jese play hua gif aa jaye
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

// next button
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

// previous button
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
