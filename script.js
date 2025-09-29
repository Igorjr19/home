document.addEventListener("DOMContentLoaded", function () {
  document.documentElement.style.scrollBehavior = "smooth";

  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease-in-out";

  setTimeout(() => {
    document.body.style.opacity = "1";

    setTimeout(() => {
      const nameElement = document.getElementById("name-display");
      if (nameElement) {
        setTimeout(() => {
          typeText(nameElement, "Ígor José Rodrigues", 100);
        }, 1000);
      }
    }, 800);
  }, 100);

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll(
    ".social-links, .about-me, .projects, .footer"
  );
  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.activeElement.blur();
    }
  });
});

function typeText(element, text, speed = 50, callback = null) {
  const cursor = element.querySelector(".typing-cursor");
  let i = 0;

  function type() {
    if (i < text.length) {
      const currentText = text.substring(0, i + 1);
      if (cursor) {
        element.innerHTML =
          currentText + '<span class="typing-cursor">_</span>';
      } else {
        element.innerHTML = currentText;
      }
      i++;
      setTimeout(type, speed);
    } else {
      if (callback) callback();
    }
  }

  type();
}

document.addEventListener("DOMContentLoaded", function () {
  const personalLinks = document.querySelectorAll(
    ".personal-section .social-link"
  );
  let globalClickCount = 0;

  personalLinks.forEach((link, index) => {
    const originalHref = link.getAttribute("href");

    link.removeAttribute("href");
    link.style.cursor = "pointer";
    link.dataset.originalHref = originalHref;

    link.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      globalClickCount++;

      if (globalClickCount === 1) {
        showPopover(link, "Hey! That's personal stuff...");
      } else if (globalClickCount === 2) {
        showPopover(link, "I'm serious!");
      } else {
        closePopover();
        const href = link.dataset.originalHref;
        if (href) {
          setTimeout(() => {
            window.open(href, "_blank");
          }, 10);
        }
      }
    });
  });

  function showPopover(link, message) {
    closePopover();

    const popover = document.createElement("div");
    popover.className = "personal-popover";
    popover.innerHTML = `
      <div class="popover-content">
        ${message}
      </div>
    `;

    link.appendChild(popover);

    // Store timeout reference for cleanup
    popover.showTimeout = setTimeout(() => {
      popover.classList.add("show");
    }, 10);

    popover.hideTimeout = setTimeout(() => {
      closePopover();
    }, 3000);
  }

  function closePopover() {
    const popovers = document.querySelectorAll(".personal-popover");
    popovers.forEach(popover => {
      if (popover) {
        // Clear any existing timeouts to prevent race conditions
        clearTimeout(popover.showTimeout);
        clearTimeout(popover.hideTimeout);
        clearTimeout(popover.removeTimeout);
        
        popover.classList.remove("show");
        
        popover.removeTimeout = setTimeout(() => {
          if (popover.parentNode) {
            popover.parentNode.removeChild(popover);
          }
        }, 300);
      }
    });
  }

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".personal-section")) {
      closePopover();
    }
  });

  const interactiveElements = document.querySelectorAll(
    ".social-link, .project-link, .tech-item"
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      this.style.textShadow =
        "0 0 15px var(--terminal-green-glow), 0 0 25px var(--terminal-green-glow)";
    });

    element.addEventListener("mouseleave", function () {
      this.style.textShadow = "0 0 8px var(--terminal-green-glow)";
    });
  });
});
