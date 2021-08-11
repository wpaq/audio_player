window.player = {
    cover: document.querySelector('.card-image'),
    title: document.querySelector('.card-content h5'),
    artist: document.querySelector('.artist'),
    audio: document.querySelector('audio'),
    nextTrack: document.querySelector('.card-content .nextTrack'),
    backTrack: document.querySelector('.card-content .backTrack'),
    audioData: audios,
    currentAudio: {},
    currentPlaying: 0,
    start() {
        this.update();  
        this.audio.onended = () => this.next();
        this.nextTrack.onclick = () => this.next();
        this.backTrack.onclick = () => this.back();
    },
    next() {
        this.currentPlaying++;
        if(this.currentPlaying === this.audioData.length) this.restart();
        this.update();
        this.audio.play();
    },
    back() {
        this.currentPlaying--;
        if(this.currentPlaying === -1) this.lastTrack();
        this.update();
        this.audio.play();
    },
    update() {
        this.currentAudio = this.audioData[this.currentPlaying];
        this.cover.style.background = `url('${path(this.currentAudio.cover)}') no-repeat center center / cover`;    
        this.title.innerText = this.currentAudio.title;
        this.artist.innerText = this.currentAudio.artist;
        this.audio.src = path(this.currentAudio.file);
    },
    restart() {
        this.currentPlaying = 0;
        this.update();
    },
    lastTrack() {
        this.currentPlaying = this.audioData.length-1;
        this.update();
    }

}
