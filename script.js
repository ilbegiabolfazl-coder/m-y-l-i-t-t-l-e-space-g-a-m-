const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const scoreElement = document.getElementById("score");

let score = 0;
let isGameOver = false;
let obstacleLeft = 600; // موقعیت اولیه مانع
let speed = 5; // سرعت حرکت مانع

// تابع پرش
function jump() {
    if (isGameOver) return;
    if (!player.classList.contains('jump')) {
        player.classList.add('jump');
        setTimeout(function() {
            player.classList.remove('jump');
        }, 500); // زمان انیمیشن پرش
    }
}

// تشخیص کلید Space
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        jump();
    }
});

// تشخیص لمس یا کلیک (برای موبایل)
document.getElementById('game-container').addEventListener('touchstart', jump);
document.getElementById('game-container').addEventListener('click', jump);

// حلقه اصلی بازی
function gameLoop() {
    if (isGameOver) return;

    obstacleLeft -= speed;
    
    // اگر مانع از سمت چپ خارج شد، دوباره از راست بیاید
    if (obstacleLeft < -20) {
        obstacleLeft = 600;
        score += 10;
        scoreElement.innerText = "امتیاز: " + score;
        // افزایش سرعت به مرور زمان
        if(speed < 15) speed += 0.5; 
    }

    obstacle.style.right = (600 - obstacleLeft) + "px";

    // تشخیص برخورد
    let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
    let playerLeft = 50; // موقعیت ثابت بازیکن
    let playerRight = 50 + 30; // عرض بازیکن

    let obstacleRight = obstacleLeft + 20; // عرض مانع

    // منطق برخورد (اگر مانع در محدوده X بازیکن باشد و بازیکن پایین باشد)
    if (obstacleLeft < playerRight && obstacleRight > playerLeft && playerBottom < 40) {
        isGameOver = true;
        alert("باختی! امتیاز شما: " + score + "\nبرای بازی مجدد صفحه را رفرش کنید.");
    }

    requestAnimationFrame(gameLoop);
}

// شروع بازی
gameLoop();
