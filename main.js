const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const KEY_PLAYER_STRONGAE = 'NewBie_Player'

const heading = $("header h2");
const cdThumb = $(".cd-thumb");
var audio = $("#audio");
const cd = $(".cd");
const btnPlay = $(".btn-toggle-play");
const btnPlayer = $(".player");
const progress = $("#progress");
const btnPrev = $(".btn-prev");
const btnNext = $(".btn-next");
const btnRandom = $(".btn-random");
const btnRep = $(".btn-repeat");
const Playlist = $(".playlist")
const progressRange = $('.progressRange');
const endTime = $('.endTime');
const rangeValue = $('.rangeValue');
const startTime = $('.startTime');
const volumeSet = $('#volumeAdjust')
const volumeIcon = $('.volume .btn-volume')
const activeSong = $('.song.active');


const app = {
    config: JSON.parse(localStorage.getItem(KEY_PLAYER_STRONGAE)) || {},
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isMute: false,
    songs: [
        {
            id: 158022,
            name: "Rung Động",
            artists: ["Dương Edward"],
            src: "https://data.chiasenhac.com/down2/2233/4/2232283-19d7785c/32/Rung%20Dong%20-%20Duong%20Edward.m4a",
            img: "https://data.chiasenhac.com/data/cover/159/158022.jpg",
        },
        {
            id: 87532,
            name: "Rồi Người Thương Cũng Hoá Người Dưng",
            artists: ["Hiền Hồ"],
            src: "https://data38.chiasenhac.com/downloads/1905/4/1904537-f05041fa/128/Roi%20Nguoi%20Thuong%20Cung%20Hoa%20Nguoi%20Dung%20-%20H.mp3",
            img: "https://data.chiasenhac.com/data/cover/88/87532.jpg",
        },
        {
            id: 159373,
            name: "Khi Nào (Hoàn Châu Cách Cách OST)",
            artists: ["Hương Ly"],
            src: "https://data.chiasenhac.com/down2/2236/4/2235964-02092078/32/Khi%20Nao%20Hoan%20Chau%20Cach%20Cach%20OST_%20-%20Huong.m4a",
            img: "https://data.chiasenhac.com/data/cover/160/159373.jpg",
        },
    ],
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(KEY_PLAYER_STRONGAE, JSON.stringify(this.config));
    },

    loadConfig: function () {

        this.isRepeat = !!this.config.isRepeat;  // convert to boolean
        this.isRandom = !!this.config.isRandom;
    },
    // render ra view
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `<div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
         <div class="thumb" style="background-image: url('${song.img}')">
         </div>
         <div class="body">
           <h3 class="title">${song.name}</h3>
           <p class="author">${[].concat(song.artists).join('; ')}</p>
         </div>
         <div class="option">
           <i class="fas fa-ellipsis-h"></i>
         </div>
       </div>`;
        });
        Playlist.innerHTML = htmls.join("");
    },
    //xu ly events
    handelEvents: function () {
        const _this = this;
        const cdWidth = cd.offsetWidth;
        //cd quay tron

        const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
            duration: 60000,
            interactions: Infinity,
        });
        cdThumbAnimate.pause();
        //Next bai hat
        btnNext.onclick = function () {
            if (this.isRandom) {
                playRandomSong();
            } else {
                _this.nextsong();
            }
            audio.play();
            _this.render();
            _this.ScrollActiveSong()
        };
        function volumeDisplay() {
            volumeSet.value = _this.songVolume;
            var volumeColor = 'linear-gradient(90deg, rgb(75, 36, 173)' + _this.songVolume + '%, rgb(214, 214, 214) ' + _this.songVolume + '%)';
            volumeSet.style.background = volumeColor;
        };
        //Volume adjustment
        volumeSet.oninput = function (e) {
            _this.songVolume = e.target.value;
            audio.volume = _this.songVolume / 100;
            volumeDisplay();
            _this.setConfig("volume", _this.songVolume);
            _this.volumeIconHandle();
        };
        volumeIcon.onmousedown = function () {
            volumeIcon.classList.add('active');
        }
        volumeIcon.onmouseup = function () {
            volumeIcon.classList.remove('active');
        }
        //btnPrev
        btnPrev.onclick = function () {
            if (this.isRandom) {
                playRandomSong();
            } else {
                _this.prvesong();
            }
            audio.play();
            _this.render();
            _this.ScrollActiveSong()
        };
        // xu ly cd
        volumeIcon.onclick = function () {
            audio.volume = 0;
            _this.songVolume = audio.volume;
            volumeDisplay();
            volumeIcon.innerHTML = '<i class="fas fa-volume-mute"></i>'
        };

        document.onscroll = function () {
            const scrollCD = window.scrollY || document.documentElement.scrollTop;
            const newCdWith = cdWidth - scrollCD;
            cd.style.width = newCdWith > 0 ? newCdWith + "px" : 0;
            // console.log(cdWidth)
            // console.log(newCdWith)
            cd.style.opacity = newCdWith / cdWidth; // lam mo cd theo kich thuoc
        };
        //xu ly play/pauseq
        btnPlay.onclick = function () {
            //console.log(audio.src)
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        };
        // bat tat random
        btnRandom.onclick = function (e) {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom);
            btnRandom.classList.toggle('active', _this.isRandom);

        };
        // bat tat repeat bai hat
        btnRep.onclick = function (e) {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat);
            btnRep.classList.toggle('active', _this.isRepeat);
        };
        //console.log(btnRep)
        audio.onplay = function () {
            _this.isPlaying = true;
            btnPlayer.classList.add("playing");
            cdThumbAnimate.play();
        };

        audio.onpause = function () {
            _this.isPlaying = false;
            btnPlayer.classList.remove("playing");
            cdThumbAnimate.pause();
        };

        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            } else {
                btnNext.click()
            }

        };

        Playlist.onclick = function (e) {
            let nextSongNode = e.target.closest('.song:not(.active)');
            let optionNode = e.target.closest('.option');
            // not active song || option button => process
            if (nextSongNode || optionNode) {
                if (nextSongNode && !optionNode) {
                    _this.currentIndex = Number(nextSongNode.dataset.index);
                    _this.loadCurrentSong()
                    _this.render();
                    audio.play();
                }
                else if (optionNode) {
                    console.log('e.target:', e.target, 'optionNode:', optionNode);
                }
            }
        },

            //thay doi time bai hat tua
            (audio.ontimeupdate = function () {
                if (audio.duration) {
                    const progressPercent = Math.floor(
                        (audio.currentTime / audio.duration) * 100
                    );
                    //console.log(progressPercent)
                    progress.value = progressPercent;
                }
            }),
            // tua bai hat
            (progress.oninput = function (e) {
                const seekTime = (audio.duration / 100) * e.target.value;
                audio.currentTime = seekTime;

            });
    },
    //dinh nghia thuoc tinh
    defineProperty: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            },
        });
    },
    volumeIconHandle: function () {
        const volume = this.songVolume;
        if (volume > 50) volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>'
        else {
            if (volume >= 5 && volume <= 50) volumeIcon.innerHTML = '<i class="fas fa-volume-down"></i>'
            else volumeIcon.innerHTML = '<i class="fas fa-volume-mute"></i>'
        }

    },
    volumeLoad: function () {
        ///Volume 
        this.songVolume = this.config.volume;
        volumeSet.value = this.songVolume;
        var volumeColor = 'linear-gradient(90deg, rgb(75, 36, 173)' + this.songVolume + '%, rgb(214, 214, 214) ' + this.songVolume + '%)';
        volumeSet.style.background = volumeColor;
        //Icon
        this.volumeIconHandle();

    },
    //randomsong
    playRandomSong: function () {
        let NIndex
        do {
            NIndex = Math.floor(Math.random() * this.songs.length)
        } while (NIndex == this.currentIndex)

        this.currentIndex = NIndex;

        this.loadCurrentSong();
    },
    ScrollActiveSong: function () {
        setTimeout(() => {
            if (this.currentIndex < 2) {
                $('.song.active').ScrollIntoView({
                    behavior: 'smooth',
                    block: 'end'
                });
            } else {
                $('.song.active').ScrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }

        }, 300)

    },

    loadCurrentSong: function () {
        // console.log(this.currentsong.name)
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`;
        //console.log(this.currentSong.path)
        audio.src = this.currentSong.src;
        // console.log(audio.src)
    },
    nextsong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length - 1) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prvesong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },

    start: function () {

        this.loadConfig();

        this.defineProperty();

        this.playRandomSong();
        this.volumeLoad();
        this.handelEvents();

        //tai tt bai hat dau tien vao ui khi khoi dong ung dung
        this.loadCurrentSong();

        this.render(); // goi lai render
        btnRep.classList.toggle('active', this.isRepeat);
        btnRandom.classList.toggle('active', this.isRandom);

    },
};

app.start();
