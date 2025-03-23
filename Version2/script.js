document.addEventListener('DOMContentLoaded', () => {
  // Matrix-style background animation
  const matrixCanvas = document.createElement('canvas');
  const ctx = matrixCanvas.getContext('2d');
  matrixCanvas.style.position = 'fixed';
  matrixCanvas.style.top = '0';
  matrixCanvas.style.left = '0';
  matrixCanvas.style.zIndex = '-1';
  document.body.appendChild(matrixCanvas);

  let width = window.innerWidth;
  let height = window.innerHeight;
  matrixCanvas.width = width;
  matrixCanvas.height = height;

  const chars = '01';
  const fontSize = 20;
  const columns = width / fontSize;
  const drops = Array(Math.floor(columns)).fill(height);

  function drawMatrix() {
      ctx.fillStyle = 'rgba(0, 20, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#0f0';
      ctx.font = fontSize + 'px monospace';

      drops.forEach((drop, i) => {
          const char = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(char, i * fontSize, drop * fontSize);
          
          if (drop * fontSize > height && Math.random() > 0.975) {
              drops[i] = 0;
          }
          drops[i]++;
      });

      requestAnimationFrame(drawMatrix);
  }


  // Scanning line animation
  const scanLine = document.createElement('div');
  scanLine.style.position = 'fixed';
  scanLine.style.width = '100%';
  scanLine.style.height = '2px';
  scanLine.style.background = 'linear-gradient(to bottom, transparent 0%, #0f0 50%, transparent 100%)';
  scanLine.style.boxShadow = '0 0 10px #0f0';
  scanLine.style.zIndex = '9999';
  scanLine.style.pointerEvents = 'none';
  scanLine.style.opacity = '0.3';
  document.body.appendChild(scanLine);

  let scanPosition = 0;
  function animateScanLine() {
      scanPosition = (scanPosition + 2) % height;
      scanLine.style.top = `${scanPosition}px`;
      requestAnimationFrame(animateScanLine);
  }

  // Binary floating animation
  function createBinaryFloat() {
      const binary = document.createElement('div');
      binary.textContent = Math.random().toString(2).substr(2, 8);
      binary.style.position = 'fixed';
      binary.style.color = '#0f0';
      binary.style.opacity = '0.3';
      binary.style.left = `${Math.random() * 100}%`;
      binary.style.top = '-50px';
      binary.style.fontSize = `${Math.random() * 20 + 10}px`;
      document.body.appendChild(binary);

      let position = -50;
      function float() {
          position += 1;
          binary.style.top = `${position}px`;
          
          if (position > height + 100) {
              binary.remove();
          } else {
              requestAnimationFrame(float);
          }
      }
      float();
  }

  // Continuous effects
  setInterval(createBinaryFloat, 500);
  animateScanLine();
  drawMatrix();

  // Particle effect on mouse move
  const particles = [];
  document.addEventListener('mousemove', (e) => {
      for(let i = 0; i < 3; i++) {
          const particle = document.createElement('div');
          particle.style.position = 'fixed';
          particle.style.width = '4px';
          particle.style.height = '4px';
          particle.style.background = '#0f0';
          particle.style.borderRadius = '50%';
          particle.style.left = `${e.clientX + Math.random() * 10 - 5}px`;
          particle.style.top = `${e.clientY + Math.random() * 10 - 5}px`;
          particle.style.pointerEvents = 'none';
          document.body.appendChild(particle);
          
          particles.push({
              element: particle,
              x: e.clientX,
              y: e.clientY,
              vx: (Math.random() - 0.5) * 4,
              vy: (Math.random() - 0.5) * 4,
              life: 1
          });
      }
  });

  // Particle animation loop
  function animateParticles() {
      particles.forEach((p, index) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.1;
          p.life -= 0.02;
          
          p.element.style.left = `${p.x}px`;
          p.element.style.top = `${p.y}px`;
          p.element.style.opacity = p.life;
          
          if (p.life <= 0) {
              p.element.remove();
              particles.splice(index, 1);
          }
      });
      requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // Terminal cursor blink
  const cursors = document.querySelectorAll('.terminal-text');
  cursors.forEach(cursor => {
      setInterval(() => {
          cursor.classList.toggle('cursor-blink');
      }, 500);
  });
});

// Add this to your existing script.js
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    const image = card.querySelector('.project-image img');
    const originalSrc = image.src;
    
    // Add hover effect
    card.addEventListener('mouseenter', () => {
        image.src = originalSrc.replace('text=', 'text=>>>+>>>');
    });
    
    card.addEventListener('mouseleave', () => {
        image.src = originalSrc;
    });
});