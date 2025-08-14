// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");


// Crear partículas interactivas
const particleContainer = document.getElementById('interactiveParticles');
const particles = [];
const particleCount = 30;

// Crear partículas
for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle-heart';
    
    // Posición aleatoria inicial
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    particleContainer.appendChild(particle);
    particles.push({
        element: particle,
        x: x,
        y: y,
        originalX: x,
        originalY: y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
    });
}

// Variables para el mouse
let mouseX = 0;
let mouseY = 0;
const mouseRadius = 100; // Radio de influencia del mouse

// Seguimiento del mouse
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Función de animación
function animateParticles() {
    particles.forEach((particle, index) => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Resetear clases
        particle.element.classList.remove('mouse-near', 'mouse-over');

        if (distance < mouseRadius) {
            if (distance < 50) {
                // Muy cerca del mouse - efecto de dispersión
                particle.element.classList.add('mouse-over');
                
                // Calcular dirección de dispersión
                const angle = Math.atan2(dy, dx);
                const disperseDistance = 100;
                const disperseX = -Math.cos(angle) * disperseDistance;
                const disperseY = -Math.sin(angle) * disperseDistance;
                
                particle.element.style.setProperty('--disperse-x', disperseX + 'px');
                particle.element.style.setProperty('--disperse-y', disperseY + 'px');
                
                // Mover la partícula lejos del mouse
                particle.x -= dx * 0.1;
                particle.y -= dy * 0.1;
            } else {
                // Cerca del mouse - efecto de atracción suave
                particle.element.classList.add('mouse-near');
                
                // Atracción suave hacia el mouse
                particle.x += dx * 0.02;
                particle.y += dy * 0.02;
            }
        } else {
            // Lejos del mouse - volver a la posición original lentamente
            particle.x += (particle.originalX - particle.x) * 0.01;
            particle.y += (particle.originalY - particle.y) * 0.01;
        }

        // Añadir movimiento flotante natural
        particle.x += particle.vx * 0.5;
        particle.y += particle.vy * 0.5;

        // Mantener las partículas dentro de la pantalla
        if (particle.x < 0 || particle.x > window.innerWidth) {
            particle.vx *= -1;
            particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
        }
        if (particle.y < 0 || particle.y > window.innerHeight) {
            particle.vy *= -1;
            particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));
        }

        // Actualizar posición visual
        particle.element.style.left = particle.x + 'px';
        particle.element.style.top = particle.y + 'px';
    });

    requestAnimationFrame(animateParticles);
}

// Iniciar animación
animateParticles();

// Reposicionar partículas al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
    particles.forEach(particle => {
        particle.originalX = Math.random() * window.innerWidth;
        particle.originalY = Math.random() * window.innerHeight;
    });
});

// Crear nuevas partículas al hacer clic
document.addEventListener('click', (e) => {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle-heart';
        
        const x = e.clientX + (Math.random() - 0.5) * 100;
        const y = e.clientY + (Math.random() - 0.5) * 100;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.animation = 'particleFloat 2s ease-out forwards';
        
        particleContainer.appendChild(particle);
        
        // Remover la partícula después de la animación
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 2000);
    }
});




// Animar las letras
function updateLyrics() {
  var time = Math.floor(audio.currentTime);
  var currentLine = lyricsData.find(
    (line) => time >= line.time && time < line.time + 6
  );

  if (currentLine) {
    // Calcula la opacidad basada en el tiempo en la línea actual
    var fadeInDuration = 0.1; // Duración del efecto de aparición en segundos
    var opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);

    // Aplica el efecto de aparición
    lyrics.style.opacity = opacity;
    lyrics.innerHTML = currentLine.text;
  } else {
    // Restablece la opacidad y el contenido si no hay una línea actual
    lyrics.style.opacity = 0;
    lyrics.innerHTML = "";
  }
}

setInterval(updateLyrics, 1000);

//funcion titulo
// Función para ocultar el título después de 216 segundos
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  titulo.style.animation =
    "fadeOut 3s ease-in-out forwards"; /* Duración y función de temporización de la desaparición */
  setTimeout(function () {
    titulo.style.display = "none";
  }, 3000); // Espera 3 segundos antes de ocultar completamente
}

// Llama a la función después de 216 segundos (216,000 milisegundos)
setTimeout(ocultarTitulo, 216000);