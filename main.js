let CurrentMusic = 0;

const music = document.querySelector('#audio');

const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.music-artist');
const disk = document.querySelector('.disk');
const CurrentTime = document.querySelector('.Current-time');
const musicDuration = document.querySelector('.Song-duration');
const playBtn = document.querySelector('.play-btn');
const backwardBtn = document.querySelector('.backward-btn');
const forwardbtn = document.querySelector('.forward-btn');

function reset(){
    CurrentTime.textContent = "00:00";
    musicDuration.textContent = "00:00";
    seekBar.value = 0;
}

playBtn.addEventListener('click', () => {
    if (playBtn.className.includes('pause')) {
        music.play();
    } else {
        music.pause();
    }
    playBtn.classList.toggle('pause');
    disk.classList.toggle('play');
})
 
// setup music

const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;

    CurrentTime.innerHTML = '00:00';
    setTimeout(() => {
        seekBar.max = musicDuration;
        musicDuration.innerHTML = formatTime(music.duration)
    }, 300);
}

setMusic(0);

// formatting time in min and seconds format

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60)
    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min} : ${sec}`
}


//seek bar

setInterval(() => {
    seekBar.value = music.CurrentTime;

    if (Math.floor(music.CurrentTime) == Math.floor(seekBar.max)) {
        forwardbtn.click();
    } CurrentTime.innerHTML = formatTime(music.CurrentTime);
}, 500);

const playMusic = () => {
    music.play();
    playBtn.classList.remove('pause');
    disk.classList.add('play');
}

seekBar.addEventListener('change', () => {
    music.CurrentTime = seekBar.value;
})

forwardbtn.addEventListener('click', () => {
    if (CurrentMusic >= songs.length - 1) {
        CurrentMusic = 0;
    } else {
        CurrentMusic++;
    }
    setMusic(CurrentMusic);
    playMusic();
})

backwardBtn.addEventListener('click', () => {
    if (CurrentMusic <= 0) {
        CurrentMusic = 0;
    } else {
        CurrentMusic--;
    }
    setMusic(CurrentMusic);
    playMusic();
})