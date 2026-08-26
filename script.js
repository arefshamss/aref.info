const card = document.querySelector(".glass-card");

if (card && window.matchMedia("(pointer: fine)").matches) {
  let targetRotateX = 0;
  let targetRotateY = 0;

  let currentRotateX = 0;
  let currentRotateY = 0;

  function animateCard() {
    currentRotateX += (targetRotateX - currentRotateX) * 0.08;
    currentRotateY += (targetRotateY - currentRotateY) * 0.08;

    card.style.transform = `
      perspective(1200px)
      rotateX(${currentRotateX}deg)
      rotateY(${currentRotateY}deg)
    `;

    requestAnimationFrame(animateCard);
  }

  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    const maxRotate = 5;

    targetRotateY = (0.5 - mouseX) * maxRotate * 2;
    targetRotateX = (mouseY - 0.5) * maxRotate * 2;
  });

  document.addEventListener("mouseleave", () => {
    targetRotateX = 0;
    targetRotateY = 0;
  });

  animateCard();
}

// Add click ripple effect to social links
document.querySelectorAll(".social-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Add typing effect to title (optional enhancement)
const title = document.querySelector(".title");
const originalText = title.textContent;
title.textContent = "";
let charIndex = 0;

function typeWriter() {
  if (charIndex < originalText.length) {
    title.textContent += originalText.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 100);
  }
}

// Start typing effect when page loads
setTimeout(typeWriter, 1000);
