let currentSong =0;


const music = document.querySelector('.audio');
const seekbar = document.querySelector('.seek-bar');
const artist = document.querySelector('.artist');
const songname = document.querySelector('.song-name');
const boxdis = document.querySelector('.box-dis');
const currenttimes = document.querySelector('.current-time');
const musictime = document.querySelector('.music-time');
const btnplaymusic = document.querySelector('.btn-playmusic');
const back = document.querySelector('.back');
const next = document.querySelector('.next');

btnplaymusic.addEventListener('click', () => {
    if(btnplaymusic.className.includes('pause')){
        music.play();
    }else{
        music.pause();
    }
    btnplaymusic.classList.toggle('pause');
    boxdis.classList.toggle('play')
});

// Cài đặt bài hát
const setSong = (i) => {
    seekbar.value = 0;
    let song = songs[i];
    currentSong = i;
    music.src = song.path;
    songname.innerHTML = song.name;
    artist.innerHTML = song.artist;
    boxdis.style.backgroundImage = `url('${song.image}')`;

    // Tính toán và hiển thị thời gian của bài hát
    currenttimes.innerHTML = '00:00';
    setTimeout(() =>{
        seekbar.max=music.duration;
        // console.log(music.duration);
        musictime.innerHTML=formatTimes(music.duration);
    }, 300 );

}

setSong(0);

const formatTimes = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);

    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min}:${sec}`
}

// Cài đặt seek bar
setInterval(() => {
    seekbar.value = music.currentTime;
    currenttimes.innerHTML = formatTimes(music.currentTime);
    if(Math.floor(music.currentTime)==Math.floor(seekbar.max))
    {
        next.click();
    }

}, 500);


seekbar.addEventListener('change',()=>{
    music.currentTime=seekbar.value;
});

const playmusic=()=>{
    music.play();
    btnplaymusic.classList.remove('pause');
    boxdis.classList.add('play');
}


// Next and Preview

next.addEventListener('click',()=>{
    if(currentSong>=songs.length-1){
        currentSong=0;
    }else{
        currentSong++;
    }
    setSong(currentSong);
    playmusic();

})

back.addEventListener('click',()=>{
    if(currentSong<=0){
        currentSong=songs.length-1;
    }else{
        currentSong--;
    }
    setSong(currentSong);
    playmusic();

})