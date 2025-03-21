// 3D Szene mit Three.js erstellen
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("starCanvas") });
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// 3D-Objekt erstellen (hier ein einfacher Würfel als Beispiel)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x8a2be2 }); // Violetter Farbton
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Kamera-Position einstellen
camera.position.z = 5;

// Animation der Szene
function animate() {
    requestAnimationFrame(animate);

    // Rotieren des Objekts
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Rendering der Szene
    renderer.render(scene, camera);
}

animate();

// Parallax Effekte für die Sterne
const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let numStars = 500;

function Star(x, y, radius, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
}

Star.prototype.update = function() {
    this.y += this.speed;
    if (this.y > canvas.height) {
        this.y = 0;
        this.x = Math.random() * canvas.width;
    }
};

Star.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
};

function createStars() {
    for (let i = 0; i < numStars; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let radius = Math.random() * 2 + 0.5;
        let speed = Math.random() * 0.5 + 0.2;
        stars.push(new Star(x, y, radius, speed));
    }
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animateStars);
}

createStars();
animateStars();

// GSAP Scroll-Animation für dynamische Effekte
gsap.to(".header", {
    scrollTrigger: {
        trigger: ".content",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
    },
    y: -100,
    opacity: 0.8,
    ease: "power1.out"
});

// Resize Handling
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
