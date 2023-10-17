const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const player = $(".player")
const playList = $(".playlist-scroll")
const cd = $(".cd")
const heading = $(".music-title h3")
const singerName = $(".music-title h5")
const cdThumb = $(".cd-thumbnail")
const audio = $("#audio");
const currentTime = $('.time-current')
const endTime = $('.time-end')
const playBtn = $(".btn-toggle-play")
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-shuffle")
const repeatBtn = $(".btn-repeat")
const btnLike = $('.btn-like')
const volumeChange = $(".progress-volume")
const volumeBtn = $('.btn-volume')
const iconUnmuted = $('.icon-unmuted')
const iconVolumeLow = $('.icon-volume-low')
const iconMuted = $('.icon-muted')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: {},

    songs: [
        {
            name: "Fly Up",
            singer: "Hwang Chang young",
            path: "./assets/songs/Fly Up Lookism.mp3",
            image: "./assets/image/Fly_up.jpg",
            id: 1
        },
        {
            name: "Matsuri",
            singer: "Fujii Kaze",
            path: "./assets/songs/Fujii Kaze - Matsuri.mp3",
            image: "./assets/image/Matsuri.jpg",
            id: 2
        },
        {
            name: "Shinunoga Ewa",
            singer: "Fujii Kaze",
            path: "./assets/songs/Fujii Kaze - Shinunoga EWa.mp3",
            image: "./assets/image/Matsuri.jpg",
            id: 3
        },
        {
            name: "Car's Outside",
            singer: "James Arthur",
            path: "./assets/songs/Cars Outside.mp3",
            image: "./assets/image/Cars_outside.jpg",
            id: 4
        },
        {
            name: "Silhouette",
            singer: "KANA BOON",
            path: "./assets/songs/KANABOON - Silhouette.mp3",
            image: "./assets/image/Silhouette.jpg",
            id: 5
        },
        {
            name: "unravel",
            singer: "Kitajima Toru",
            path: "./assets/songs/unravel.mp3",
            image: "./assets/image/unravel.jfif",
            id: 6
        },
        {
            name: "ドラマツルギー",
            singer: "Eve MV",
            path: "./assets/songs/ドラマツルギー - Eve  MV.mp3",
            image: "./assets/image/Dramaturgy.jpg",
            id: 7
        },
        {
            name: "猿芝居",
            singer: "natori",
            path: "./assets/songs/なとり - 猿芝居.mp3",
            image: "./assets/image/Sarushibai.jpg",
            id: 8
        },
        {
            name: "ブルーアーカイブ",
            singer: "Blue Archive",
            path: "./assets/songs/ブルーアーカイブ.mp3",
            image: "./assets/image/Usagi_flap.jpg",
            id: 9
        },
        {
            name: "ただ声一つ",
            singer: "ロクデナシ",
            path: "./assets/songs/ロクデナシ - ただ声一つ.mp3",
            image: "./assets/image/Tada Koe Hitotsu.jpg",
            id: 10
        },
        {
            name: "廻廻奇譚",
            singer: "Eve MV",
            path: "./assets/songs/廻廻奇譚 - Eve MV.mp3",
            image: "./assets/image/jjk.jpg",
            id: 11
        },
        {
            name: "Young Girl A",
            singer: "Shiina Mota",
            path: "./assets/songs/Young Girl A - Shiina Mota.mp3",
            image: "./assets/image/Young_girl_A.jpg",
            id: 12
        },
        {
            name: "Lemon",
            singer: "Yonezu Kenshi",
            path: "./assets/songs/米津玄師 - MVLemon.mp3",
            image: "./assets/image/Lemon.jpg",
            id: 13
        },
    ],
    setConfig: function (key, value) {
        this.config[key] = value;
    },

    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
                            <div class="song ${
                                index === this.currentIndex ? "active" : ""
                                }" data-index="${index}">
                                <div class="thumbnail"
                                    style="background-image: url('${song.image}')">
                                </div>
                                <div class="body">
                                    <h3 class="title">${song.name}</h3>
                                    <p class="author">${song.singer}</p>
                                </div>
                                <div class="option">
                                    <i class="fa-solid fa-ellipsis"></i>
                                </div>
                            </div>
                        `;
        });
        playList.innerHTML = htmls.join("");
    },
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            }
        });
    },

    handleEvents: function() {
        const _this = this

        // Xử lý CD quay / dừng
        // Handle CD spins / stops
        const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
            duration: 10000, // 10 seconds
            iterations: Infinity
        });
        cdThumbAnimate.pause();

        // Xử lý khi click play
        // Handle when click play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                    audio.pause();
                } else {
                    audio.play();
                }
        };

        // Khi song được play
        // When the song is played
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add("playing");
            cdThumbAnimate.play();
        };

        // Khi song bị pause
        // When the song is pause
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove("playing");
            cdThumbAnimate.pause();
        };

        // Khi tiến độ bài hát thay đổi
        // When the song progress changes
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(
                    (audio.currentTime / audio.duration) * 100
                );
                    progress.value = progressPercent;
            }

            // Xử lí thời gian bài hát
            const currentTimeSecond = timeFormat(audio.currentTime)
            currentTime.textContent = currentTimeSecond
            const endTimeSecond = timeFormat(audio.duration)

            function timeFormat(seconds) {
                let minute = Math.floor(seconds / 60);
                let second = Math.floor(seconds % 60);
                minute = minute < 10 ? minute : minute;
                second = second < 10 ? "0" + second : second;
                return minute + ":" + second;
            }
            if (endTimeSecond != 'NaN:NaN') {
                endTime.textContent = endTimeSecond
            }
        };

        // Xử lý khi tua song
        // Handling when seek
        progress.oninput = function (e) {
            const seekTime = (audio.duration / 100) * e.target.value;
            audio.currentTime = seekTime;
        };

        // Khi next song
        // When next song
        nextBtn.onclick = function () {
        if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        };

        // Khi prev song
        // When prev song
        prevBtn.onclick = function () {
        if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        };

        // Xử lý bật / tắt random song
        // Handling on / off random song
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom;
            _this.setConfig("isRandom", _this.isRandom);
            randomBtn.classList.toggle("active", _this.isRandom);
        };

        // Xử lý lặp lại một song
        // Single-parallel repeat processing
        repeatBtn.onclick = function (e) {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig("isRepeat", _this.isRepeat);
            repeatBtn.classList.toggle("active", _this.isRepeat);
        };

        // Xử lí tăng giảm âm lượng
        volumeChange.oninput = function(e) {
            const currentVolume = e.target.value / 100
            audio.volume = currentVolume
        }

        // Xử lí khi ấn vào nút âm lượng
        volumeBtn.onclick = function() {
            
        }

        // Xử lí khi bấm like
        btnLike.addEventListener('click', function() {
            if (_this.isLike) {
                _this.isLike = false
                btnLike.style.color = '#fff'
            } else {
                btnLike.style.color = '#cf243b'
                _this.isLike = true
            }
        })

        // Xử lý next song khi audio ended
        // Handle next song when audio ended
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        };

        // Lắng nghe hành vi click vào playlist
        // Listen to playlist clicks
        playList.onclick = function (e) {
        const songNode = e.target.closest(".song:not(.active)");

            if (songNode || e.target.closest(".option")) {
                // Xử lý khi click vào song
                // Handle when clicking on the song
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }

                // Xử lý khi click vào song option
                // Handle when clicking on the song option
                if (e.target.closest(".option")) {

                }
            }
        };
    },

    scrollToActiveSong: function() {
            setTimeout(() => {
            $(".song.active").scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                });
            }, 300);
    },
    
    loadCurrentSong: function () {
            heading.textContent = this.currentSong.name;
            singerName.textContent = this.currentSong.singer;
            cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
            audio.src = this.currentSong.path;
    },
    loadConfig: function () {
            this.isRandom = this.config.isRandom;
            this.isRepeat = this.config.isRepeat;
    },
    nextSong: function () {
            this.currentIndex++;
            if (this.currentIndex >= this.songs.length) {
                this.currentIndex = 0;
            }
            this.loadCurrentSong();
    },
    prevSong: function () {
            this.currentIndex--;
            if (this.currentIndex < 0) {
                this.currentIndex = this.songs.length - 1;
            }
            this.loadCurrentSong();
    },
    playRandomSong: function () {
            let newIndex;
            do {
              newIndex = Math.floor(Math.random() * this.songs.length);
            } while (newIndex === this.currentIndex);
        
            this.currentIndex = newIndex;
            this.loadCurrentSong();
    },
    start: function () {
            // Gán cấu hình từ config vào ứng dụng
            // Assign configuration from config to application
            this.loadConfig();
        
            // Định nghĩa các thuộc tính cho object
            // Defines properties for the object
            this.defineProperties();
        
            // Lắng nghe / xử lý các sự kiện (DOM events)
            // Listening / handling events (DOM events)
            this.handleEvents();
        
            // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
            // Load the first song information into the UI when running the app
            this.loadCurrentSong();
        
            // Render playlist
            this.render();
        
            // Hiển thị trạng thái ban đầu của button repeat & random
            // Display the initial state of the repeat & random button
            // randomBtn.classList.toggle("active", this.isRandom);
            // repeatBtn.classList.toggle("active", this.isRepeat);
    }
}

app.start()
