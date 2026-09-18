// ================================
// LẤY CÁC PHẦN TỬ HTML
// ================================

const envelope =
    document.getElementById("envelope");

const answerArea =
    document.getElementById("answerArea");

const yesBtn =
    document.getElementById("yesBtn");

const noBtn =
    document.getElementById("noBtn");

const result =
    document.getElementById("result");

const hint =
    document.getElementById("hint");


// Biến kiểm tra thiệp đã mở chưa
let opened = false;


// Đếm số lần bấm Không
let noCount = 0;


// ================================
// TẠO TRÁI TIM BAY
// ================================

const hearts =
    document.getElementById("hearts");


// Danh sách icon trái tim
const heartSymbols = [
    "❤️",
    "💕",
    "💗",
    "💖",
    "💘"
];


// Tạo 18 trái tim
for (let i = 0; i < 18; i++) {

    // Tạo một thẻ div
    const heart =
        document.createElement("div");


    // Gán class
    heart.className = "heart";


    // Chọn icon
    heart.textContent =
        heartSymbols[
            i % heartSymbols.length
        ];


    // Vị trí ngang ngẫu nhiên
    heart.style.left =
        Math.random() * 100 + "%";


    // Kích thước ngẫu nhiên
    heart.style.fontSize =
        (15 + Math.random() * 22) + "px";


    // Tốc độ bay
    heart.style.animationDuration =
        (7 + Math.random() * 8) + "s";


    // Delay ngẫu nhiên
    heart.style.animationDelay =
        (-Math.random() * 10) + "s";


    // Thêm trái tim vào HTML
    hearts.appendChild(heart);
}


// ================================
// MỞ PHONG BÌ
// ================================

envelope.addEventListener(
    "click",
    function () {

        // Nếu đã mở rồi thì không làm gì
        if (opened) {
            return;
        }


        // Đánh dấu đã mở
        opened = true;


        // Thêm class opened
        envelope.classList.add(
            "opened"
        );


        // Thay đổi dòng hướng dẫn
        hint.textContent =
            "Thiệp đã mở 💗";


        // Chờ 0.9 giây
        setTimeout(
            function () {

                // Hiện 2 nút
                answerArea.classList.add(
                    "show"
                );

            },
            900
        );
    }
);


// ================================
// CANVAS PHÁO HOA
// ================================

const canvas =
    document.getElementById(
        "fireworksCanvas"
    );


// Lấy vùng vẽ Canvas
const ctx =
    canvas.getContext("2d");


// Danh sách hạt pháo hoa
let particles = [];


// Kiểm tra pháo hoa đang chạy
let fireworksRunning = false;


// ================================
// THAY ĐỔI KÍCH THƯỚC CANVAS
// ================================

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;
}


// Gọi lần đầu
resizeCanvas();


// Khi thay đổi kích thước màn hình
window.addEventListener(
    "resize",
    resizeCanvas
);


// ================================
// TẠO MỘT QUẢ PHÁO HOA
// ================================

function createFirework(x, y) {

    // Số lượng hạt
    const count = 75;


    // Tạo từng hạt
    for (let i = 0; i < count; i++) {

        // Tính góc
        const angle =
            (Math.PI * 2 * i) / count;


        // Sử dụng math.js
        // để tạo tốc độ ngẫu nhiên
        const speed =
            math.randomInt(35, 80) / 10;


        // Thêm hạt vào mảng
        particles.push({

            x: x,

            y: y,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            life: 1,

            size:
                math.randomInt(2, 5),

            hue:
                math.randomInt(0, 360)
        });
    }
}


// ================================
// ANIMATION PHÁO HOA
// ================================

function animateFireworks() {

    // Nếu không còn pháo hoa
    // thì dừng animation
    if (
        !fireworksRunning &&
        particles.length === 0
    ) {
        return;
    }


    // Tạo lớp nền trong suốt
    ctx.fillStyle =
        "rgba(0,0,0,0.15)";


    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Duyệt từng hạt
    particles.forEach(
        function (p) {

            // Di chuyển theo chiều ngang
            p.x += p.vx;


            // Di chuyển theo chiều dọc
            p.y += p.vy;


            // Trọng lực
            p.vy += 0.035;


            // Giảm thời gian sống
            p.life -= 0.012;


            // Bắt đầu vẽ hạt
            ctx.beginPath();


            // Vẽ hình tròn
            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI * 2
            );


            // Màu hạt
            ctx.fillStyle =
                `hsla(
                    ${p.hue},
                    100%,
                    65%,
                    ${p.life}
                )`;


            // Hiển thị
            ctx.fill();
        }
    );


    // Xóa các hạt đã hết thời gian
    particles =
        particles.filter(
            function (p) {
                return p.life > 0;
            }
        );


    // Tiếp tục animation
    requestAnimationFrame(
        animateFireworks
    );
}


// ================================
// TẠO BONG BÓNG
// ================================

function createBalloons() {

    // Màu bong bóng
    const balloonColors = [

        "#fb7185",

        "#f472b6",

        "#c084fc",

        "#60a5fa",

        "#34d399",

        "#facc15"
    ];


    // Tạo 20 bong bóng
    for (let i = 0; i < 20; i++) {

        // Tạo div
        const balloon =
            document.createElement("div");


        // Gán class
        balloon.className =
            "balloon";


        // Vị trí ngang
        balloon.style.left =
            Math.random() * 100 + "vw";


        // Chọn màu
        balloon.style.background =
            balloonColors[
                i % balloonColors.length
            ];


        // Delay
        balloon.style.animationDelay =
            Math.random() * 2 + "s";


        // Kích thước ngẫu nhiên
        balloon.style.transform =
            `scale(
                ${0.7 + Math.random() * 0.6}
            )`;


        // Thêm vào body
        document.body.appendChild(
            balloon
        );


        // Sau 7.5 giây xóa
        setTimeout(
            function () {
                balloon.remove();
            },
            7500
        );
    }
}


// ================================
// TẠO CONFETTI
// ================================

function createConfetti() {

    // Tạo 100 mảnh
    for (let i = 0; i < 100; i++) {

        // Tạo div
        const piece =
            document.createElement("div");


        // Gán class
        piece.className =
            "confetti";


        // Vị trí ngang
        piece.style.left =
            Math.random() * 100 + "vw";


        // Chiều rộng
        piece.style.width =
            (5 + Math.random() * 8) +
            "px";


        // Chiều cao
        piece.style.height =
            (8 + Math.random() * 12) +
            "px";


        // Sử dụng math.js
        // để tạo màu ngẫu nhiên
        piece.style.background =
            `hsl(
                ${math.randomInt(0, 360)},
                90%,
                60%
            )`;


        // Delay
        piece.style.animationDelay =
            Math.random() * 1.5 + "s";


        // Thêm vào trang
        document.body.appendChild(
            piece
        );


        // Sau 5.5 giây xóa
        setTimeout(
            function () {
                piece.remove();
            },
            5500
        );
    }
}


// ================================
// NÚT CÓ
// ================================

yesBtn.addEventListener(
    "click",
    function () {

        // Hiện lời chúc
        result.innerHTML = `

            <div class="success">

                <div style="font-size: 50px;">
                    🎉💖🎈
                </div>

                <h2 style="
                    color: #db2777;
                    font-size: 30px;
                    margin: 10px 0;
                ">
                    Chúc mừng! 💕
                </h2>

                <p style="
                    color: #666;
                ">
                    Một câu trả lời thật đáng yêu!
                </p>

            </div>
        `;


        // Bật pháo hoa
        fireworksRunning = true;


        // Chạy animation
        animateFireworks();


        // Tạo nhiều quả pháo hoa
        for (let i = 0; i < 12; i++) {

            setTimeout(
                function () {

                    createFirework(

                        80 +
                        Math.random() *
                        (
                            canvas.width -
                            160
                        ),

                        80 +
                        Math.random() *
                        (
                            canvas.height *
                            0.45
                        )
                    );

                },

                i * 280
            );
        }


        // Tạo bong bóng
        createBalloons();


        // Tạo confetti
        createConfetti();


        // Không cho bấm lại
        yesBtn.disabled = true;

        noBtn.disabled = true;
    }
);


// ================================
// NÚT KHÔNG
// ================================

noBtn.addEventListener(
    "click",
    function () {

        // Tăng số lần bấm
        noCount++;


        // Lần đầu
        if (noCount === 1) {

            noBtn.textContent =
                "😳 Không thể từ chối";

            hint.textContent =
                "Ơ... hình như có gì đó sai sai!";

        }

        // Những lần sau
        else {

            noBtn.textContent =
                "😂 Không thể từ chối";
        }


        // Tính khoảng cách di chuyển
        const maxX =
            Math.min(
                100,
                window.innerWidth / 3
            );


        const maxY = 35;


        // Di chuyển nút ngẫu nhiên
        noBtn.style.transform =
            `translate(
                ${(Math.random() * 2 - 1) * maxX}px,
                ${(Math.random() * 2 - 1) * maxY}px
            )`;
    }
);