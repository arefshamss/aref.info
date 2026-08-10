// Add interactive glow effect on mouse move
document.addEventListener("mousemove", (e) => {
  const card = document.querySelector(".glass-card");
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  // const angleX = (y - centerY) / 30;
  // const angleY = (centerX - x) / 30;
  // card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;

  const maxRotate = 5;

  const angleX = ((y - centerY) / rect.height) * maxRotate;
  const angleY = ((centerX - x) / rect.width) * maxRotate;

  card.style.transform = `perspective(1200px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
});

// Reset card transform when mouse leaves
document
  .querySelector(".glass-card")
  .addEventListener("mouseleave", function () {
    // this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    this.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
  });

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
