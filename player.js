import audios from "./base/data.js";
import { path } from "./utils.js";
import elements from "./playerElements.js";

export default {
    nextTrack: document.querySelector('.card-content .nextTrack'),
    backTrack: document.querySelector('.card-content .backTrack'),
    audioData: audios,
    currentAudio: {},
    currentPlaying: 0,
    isPlaying: false,
    start() {
        elements.get.call(this);
        elements.actions.call(this);

        this.update();  
        this.audio.onended = () => this.next();
        this.nextTrack.onclick = () => this.next();
        this.backTrack.onclick = () => this.back();
    },
    play() {
        this.isPlaying = true;
        this.audio.play();
        this.playPause.innerText = "pause";
    },
    pause() {
        this.isPlaying = false;
        this.audio.pause();
        this.playPause.innerText = "play_arrow";
    },
    togglePlayPause() {
        if(this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
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
        elements.createAudioElement.call(this, path(this.currentAudio.file));
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
