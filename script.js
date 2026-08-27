const card = document.querySelector(".glass-card");

if (card) {
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

  function setRotation(clientX, clientY) {
    const mouseX = clientX / window.innerWidth;
    const mouseY = clientY / window.innerHeight;

    const maxRotate = 5;

    targetRotateY = (0.5 - mouseX) * maxRotate * 2;
    targetRotateX = (mouseY - 0.5) * maxRotate * 2;
  }

  function resetRotation() {
    targetRotateX = 0;
    targetRotateY = 0;
  }

  document.addEventListener("mousemove", (e) => {
    setRotation(e.clientX, e.clientY);
  });

  document.addEventListener("mouseleave", resetRotation);
  window.addEventListener("blur", resetRotation);

  document.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length > 0) {
        setRotation(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    { passive: true },
  );

  document.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches.length > 0) {
        setRotation(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    { passive: true },
  );

  document.addEventListener("touchend", resetRotation);
  document.addEventListener("touchcancel", resetRotation);

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

///////////////////////////////////////////////////////////
// Typing Effect

document.addEventListener("DOMContentLoaded", () => {
  const typingElements = document.querySelectorAll(".typing");

  typingElements.forEach((container) => {
    const typingSpeed = Number(container.dataset.speed) || 20;
    const startDelay = Number(container.dataset.delay) || 500;

    const fullHeight = container.getBoundingClientRect().height;

    container.style.minHeight = `${fullHeight}px`;

    const textNodes = [];
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);

    let currentNode;

    while ((currentNode = walker.nextNode())) {
      if (currentNode.nodeValue.trim().length > 0) {
        textNodes.push({
          node: currentNode,
          text: currentNode.nodeValue,
        });
      }
    }

    textNodes.forEach((item) => {
      item.node.nodeValue = "";
    });

    let currentNodeIndex = 0;
    let currentCharIndex = 0;

    function typeWriter() {
      if (currentNodeIndex >= textNodes.length) {
        return;
      }

      const currentTextNode = textNodes[currentNodeIndex];
      const currentText = currentTextNode.text;

      if (currentCharIndex < currentText.length) {
        const char = currentText.charAt(currentCharIndex);

        currentTextNode.node.nodeValue += char;
        currentCharIndex++;

        let delay = char.trim() === "" ? 0 : typingSpeed;

        if ([".", "،", "؛", "؟", "!"].includes(char)) {
          delay = typingSpeed * 4;
        }

        setTimeout(typeWriter, delay);
      } else {
        currentNodeIndex++;
        currentCharIndex = 0;

        typeWriter();
      }
    }

    setTimeout(typeWriter, startDelay);
  });
});

///////////////////////////////////////////////////////////
// Counter Animation
document.addEventListener("DOMContentLoaded", () => {
  const counterElements = document.querySelectorAll(".counter");

  counterElements.forEach((element) => {
    const originalText = element.textContent.trim();
    const targetNumber = Number(originalText.replace(/[^\d]/g, ""));
    const prefix = originalText.match(/^\D+/)?.[0] || "";
    const suffix = originalText.match(/\D+$/)?.[0] || "";

    if (!targetNumber) return;

    element.textContent = `${prefix}0${suffix}`;

    const slowCount = 10;
    const fastTarget = Math.max(0, targetNumber - slowCount);

    const fastDuration = 400;
    let startTime = null;
    function fastPhase(currentTime) {
      if (!startTime) startTime = currentTime;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / fastDuration, 1);
      const eased = 1 - Math.pow(1 - progress, 2);

      const current = Math.floor(fastTarget * eased);
      element.textContent = `${prefix}${current.toLocaleString("en-US")}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(fastPhase);
      } else {
        currentSlowNumber = fastTarget;
        slowPhase();
      }
    }

    let currentSlowNumber = fastTarget;

    function slowPhase() {
      if (currentSlowNumber < targetNumber) {
        currentSlowNumber++;
        element.textContent = `${prefix}${currentSlowNumber.toLocaleString("en-US")}${suffix}`;

        const remaining = targetNumber - currentSlowNumber;
        const stepDelay = 40 + (slowCount - remaining) * 8;

        setTimeout(slowPhase, stepDelay);
      }
    }

    requestAnimationFrame(fastPhase);
  });
});
