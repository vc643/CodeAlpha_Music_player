/* --- JAVASCRIPT LOGIC --- */

// 1. Select DOM Elements
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const bgImage = document.getElementById('bg-image');

// 2. Song Data 
// NOTE: Replace 'src' with actual paths to your mp3 files
// Replace 'cover' with actual image paths
const songs = [
    {
        title: 'Summer Vibes',
        artist: 'Intern Band',
        cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
        bg: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1920&h=1080&fit=crop',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' 
    },
    {
        title: 'Coding Mode',
        artist: 'Dev Team',
        cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop',
        bg: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1920&h=1080&fit=crop',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    },
    {
        title: 'Coffee Break',
        artist: 'Java Script',
        cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400&h=400&fit=crop',
        bg: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=1920&h=1080&fit=crop',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    }
];

// 3. Keep track of song
let songIndex = 0;

// 4. Initial Load
loadSong(songs[songIndex]);

// 5. Function to load song details into DOM
function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.src;
    cover.src = song.cover;
    bgImage.style.backgroundImage = `url('${song.bg}')`;
}

// 6. Play Song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

// 7. Pause Song
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

// 8. Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// 9. Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// 10. Update Progress Bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// 11. Set Progress (Click on bar to seek)
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// 12. Event Listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Change Song Events
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/Song Update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);
