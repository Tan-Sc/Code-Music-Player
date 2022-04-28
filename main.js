const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
var audio = $("#audio");
const cd = $(".cd");
const btnPlay = $(".btn-toggle-play");
const btnPlayer = $(".player");
//const isPlaying = $(".playing")

const app = {
    currentIndex: 0,
    isPlaying: false,
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
            src: "https://data37.chiasenhac.com/downloads/1905/1/1904537-f05041fa/128/Roi%20Nguoi%20Thuong%20Cung%20Hoa%20Nguoi%20Dung%20-%20H.mp3",
            img: "https://data.chiasenhac.com/data/cover/88/87532.jpg",
        },
        {
            id: 159373,
            name: "Khi Nào (Hoàn Châu Cách Cách OST)",
            artists: ["Hương Ly"],
            src: "https://data.chiasenhac.com/down2/2236/1/2235964-02092078/128/Khi%20Nao%20Hoan%20Chau%20Cach%20Cach%20OST_%20-%20Huong.mp3",
            img: "https://data.chiasenhac.com/data/cover/160/159373.jpg",
        },
        {
            id: 159999,
            name: "Sau Lưng Anh Có Ai Kìa",
            artists: ["Thiều Bảo Trâm"],
            src: "https://data.chiasenhac.com/down2/2238/1/2237724-1570b544/128/Sau%20Lung%20Anh%20Co%20Ai%20Kia%20-%20Thieu%20Bao%20Tram.mp3",
            img: "https://data.chiasenhac.com/data/cover/160/159999.jpg",
        },
        {
            id: 160129,
            name: "Buồn Không Thể Buông",
            artists: ["Dreamer", "Phí Phương Anh", "RIN9", "MiiNa"],
            src: "https://data.chiasenhac.com/down2/2239/1/2238042-d955f6f0/128/Buon%20Khong%20The%20Buong%20-%20Dreamer_%20Phi%20Phuo.mp3",
            img: "https://data.chiasenhac.com/data/cover/161/160129.jpg",
        },
        {
            id: 158976,
            name: "Anh Không Muốn Ra Đi (Lofi Version)",
            artists: ["Vicky Nhung", "Long Rex"],
            src: "https://data.chiasenhac.com/down2/2235/1/2234887-44357607/128/Anh%20Khong%20Muon%20Ra%20Di%20Lofi%20Version_%20-%20Vic.mp3",
            img: "https://data.chiasenhac.com/data/cover/159/158976.jpg",
        },
        {
            id: 160323,
            name: "Tháng Mấy Em Nhớ Anh (Cover in Hoa Concert)",
            artists: "Bùi Anh Tuấn",
            src: "https://data.chiasenhac.com/down2/2239/1/2238621-8b6f8734/128/Thang%20May%20Em%20Nho%20Anh%20Cover%20in%20Hoa%20Concer.mp3",
            img: "https://data.chiasenhac.com/data/cover/161/160323.jpg",
        },
        {
            id: 157878,
            name: "Đám Cưới Nha?",
            artists: ["Hồng Thanh", "DJ Mie"],
            src: "https://data.chiasenhac.com/down2/2232/1/2231831-3e0343cf/128/Dam%20Cuoi%20Nha_%20-%20Hong%20Thanh_%20DJ%20Mie.mp3",
            img: "https://data.chiasenhac.com/data/cover/158/157878.jpg",
        },
        {
            id: 159831,
            name: "Đã Sai Từ Lúc Đầu (Cover in Hoa Concert)",
            artists: ["Trung Quân", "Bùi Anh Tuấn"],
            src: "https://data.chiasenhac.com/down2/2238/1/2237224-b41d4cd5/128/Da%20Sai%20Tu%20Luc%20Dau%20Cover%20in%20Hoa%20Concert_.mp3",
            img: "https://data.chiasenhac.com/data/cover/160/159831.jpg",
        },
        {
            id: 160221,
            name: "Tay Vớt Ánh Trăng (Live)",
            artists: ["Mỹ Tâm"],
            src: "https://data.chiasenhac.com/down2/2239/1/2238252-716cbfe7/128/Tay%20Vot%20Anh%20Trang%20Live_%20-%20My%20Tam_.mp3",
            img: "https://data.chiasenhac.com/data/cover/161/160221.jpg",
        },
        {
            id: 130278,
            name: "Cưới Nhau Đi (Yes I Do)",
            artists: ["Hiền Hồ", "Bùi Anh Tuấn"],
            src: "https://data3.chiasenhac.com/downloads/2129/1/2128097-e1d4a8b2/128/Cuoi%20Nhau%20Di%20Yes%20I%20Do_%20-%20Hien%20Ho_%20Bui%20An.mp3",
            img: "https://data.chiasenhac.com/data/cover/131/130278.jpg",
        },
        {
            id: 157914,
            name: "Cà Phê",
            artists: "Min",
            src: "https://data.chiasenhac.com/down2/2232/1/2231953-a9d619ec/128/Ca%20Phe%20-%20Min.mp3",
            img: "https://data.chiasenhac.com/data/cover/158/157914.jpg",
        },
        {
            id: 160766,
            name: "Ai Chung Tình Được Mãi (Cover)",
            artists: ["Trung Quân", "ACV"],
            src: "https://data.chiasenhac.com/down2/2240/1/2239690-7eaa36fe/128/Ai%20Chung%20Tinh%20Duoc%20Mai%20Cover_%20-%20Trung%20Qu.mp3",
            img: "https://data.chiasenhac.com/data/cover/161/160766.jpg",
        },
        {
            id: 157403,
            name: "Don't Break My Heart",
            artists: ["Binz", "Touliver"],
            src: "https://data.chiasenhac.com/down2/2231/1/2230476-3402ad5a/128/Don_t%20Break%20My%20Heart%20-%20Binz_%20Touliver.mp3",
            img: "https://data.chiasenhac.com/data/cover/158/157403.jpg",
        },
        {
            id: 160693,
            name: "Bước Qua Nhau (Live)",
            artists: ["Mỹ Tâm", "Vũ"],
            src: "https://data.chiasenhac.com/down2/2240/1/2239499-dcad4a32/128/Buoc%20Qua%20Nhau%20Live_%20-%20My%20Tam_%20Vu.mp3",
            img: "https://data.chiasenhac.com/data/cover/161/160693.jpg",
        },
        {
            id: 157283,
            name: "Hẹn Ước Từ Hư Vô (Live)",
            artists: ["Mỹ Tâm"],
            src: "https://data.chiasenhac.com/down2/2231/1/2230177-067507fa/128/Hen%20Uoc%20Tu%20Hu%20Vo%20Live_%20-%20My%20Tam_.mp3",
            img: "https://data.chiasenhac.com/data/cover/158/157283.jpg",
        },
        {
            id: 160967,
            name: "Kiếp Rong Buồn (Lofi Version)",
            artists: ["Vicky Nhung", "Long Rex"],
            src: "https://data.chiasenhac.com/down2/2241/1/2240156-0c73190d/128/Kiep%20Rong%20Buon%20Lofi%20Version_%20-%20Vicky%20Nhu.mp3",
            img: "https://data.chiasenhac.com/data/cover/161/160967.jpg",
        },
        {
            id: 157112,
            name: "Tình Đơn Côi (Lofi Version)",
            artists: ["Vicky Nhung", "Long Rex"],
            src: "https://data.chiasenhac.com/down2/2230/1/2229752-0d0e7dff/128/Tinh%20Don%20Coi%20Lofi%20Version_%20-%20Vicky%20Nhung.mp3",
            img: "https://data.chiasenhac.com/data/cover/158/157112.jpg",
        },
        {
            id: 128364,
            name: "Đúng Cũng Thành Sai",
            artists: ["Mỹ Tâm"],
            src: "https://data3.chiasenhac.com/downloads/2120/1/2119974-401a7459/128/Dung%20Cung%20Thanh%20Sai%20-%20My%20Tam.mp3",
            img: "https://data.chiasenhac.com/data/cover/129/128364.jpg",
        },
        {
            id: 154910,
            name: "Ngày Đầu Tiên",
            artists: ["Đức Phúc"],
            src: "https://data.chiasenhac.com/down2/2224/1/2223570-77fd7172/128/Ngay%20Dau%20Tien%20-%20Duc%20Phuc.mp3",
            img: "https://data.chiasenhac.com/data/cover/155/154910.jpg",
        },
        {
            id: 161377,
            name: "Tự Sự (Qua Bển Làm Chi OST)",
            artists: ["Orange"],
            src: "https://data.chiasenhac.com/down2/2242/4/2241202-2664d006/128/Tu%20Su%20Qua%20Ben%20Lam%20Chi%20OST_%20-%20Orange.mp3",
            img: "https://data.chiasenhac.com/data/cover/162/161377.jpg",
        },
        {
            id: 99800,
            name: "Nơi Mình Dừng Chân",
            artists: ["Mỹ Tâm"],
            src: "https://data33.chiasenhac.com/downloads/1990/1/1989453-f609d9b4/128/Noi%20Minh%20Dung%20Chan%20-%20My%20Tam.mp3",
            img: "https://data.chiasenhac.com/data/cover/100/99800.jpg",
        },
        {
            id: 160865,
            name: "Chơi Vơi",
            artists: ["K-ICM", "Trung Quân"],
            src: "https://data.chiasenhac.com/down2/2240/4/2239924-5f9fa42a/128/Choi%20Voi%20-%20K-ICM_%20Trung%20Quan.mp3",
            img: "https://data.chiasenhac.com/data/cover/161/160865.jpg",
        },
        {
            id: 152195,
            name: "Gieo Quẻ",
            artists: ["Hoàng Thuỳ Linh", "Đen"],
            src: "https://data.chiasenhac.com/down2/2216/1/2215074-8d51eab0/128/Gieo%20Que%20-%20Hoang%20Thuy%20Linh_%20Den.mp3",
            img: "https://data.chiasenhac.com/data/cover/153/152195.jpg",
        },
        {
            id: 151033,
            name: "Lối Nhỏ",
            artists: ["Đen", "Phương Anh Đào"],
            src: "https://data.chiasenhac.com/down2/2211/1/2210420-cad860c9/128/Loi%20Nho%20-%20Den_%20Phuong%20Anh%20Dao.mp3",
            img: "https://data.chiasenhac.com/data/cover/152/151033.jpg",
        },
    ],
    // render ra view
    render: function () {
        const htmls = this.songs.map((song) => {
            return `<div class="song">
         <div class="thumb" style="background-image: url('${song.img}')">
         </div>
         <div class="body">
           <h3 class="title">${song.name}</h3>
           <p class="author">${song.artists}</p>
         </div>
         <div class="option">
           <i class="fas fa-ellipsis-h"></i>
         </div>
       </div>`;
        });
        $(".playlist").innerHTML = htmls.join("");
    },
    //xu ly events
    handelEvents: function () {
        const _this = this
        const cdWidth = cd.offsetWidth;
        // xu ly cd
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
                _this.isPlaying = false
                audio.pause();
                btnPlayer.classList.remove("playing");
            } else {
                _this.isPlaying = true
                audio.play();
                btnPlayer.classList.add("playing");
            }
        };
    },
    //dinh nghia thuoc tinh
    defineProperty: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            },
        });
    },

    loadCurrentSong: function () {
        // console.log(this.currentsong.name)
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`;
        //console.log(this.currentSong.path)
        audio.src = this.currentSong.src;
        // console.log(audio.src)
    },

    start: function () {
        this.defineProperty();

        this.handelEvents();

        //tai tt bai hat dau tien vao ui khi khoi dong ung dung
        this.loadCurrentSong();

        this.render(); // goi lai render
    },
};

app.start();
