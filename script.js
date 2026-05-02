document.addEventListener("DOMContentLoaded", function () {
  const revealItems = document.querySelectorAll(".reveal-up");
  const contactForm = document.querySelector(".contact-form");
  const aboutPhotoCard = document.querySelector(".about-photo-card");
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".navbar nav a");
  const pageSections = document.querySelectorAll("section[id]");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  function updateNavbar() {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 30);
    }

    let currentSection = "home";

    pageSections.forEach(function (section) {
      const sectionTop = section.offsetTop - 150;

      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + currentSection
      );
    });
  }

  updateNavbar();
  window.addEventListener("scroll", updateNavbar);

  if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const button = contactForm.querySelector("button");
      const status = contactForm.querySelector(".form-status");
      const originalText = button.textContent;
      const formData = new FormData(contactForm);
      const payload = Object.fromEntries(formData.entries());

      button.disabled = true;
      button.textContent = "Sending...";
      if (status) {
        status.textContent = "";
      }

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Message request failed");
        }

        button.textContent = "Message Sent";
        button.classList.add("sent");
        if (status) {
          status.textContent = "Thank you. Your message has been received.";
        }
        contactForm.reset();
      } catch (error) {
        const subject = encodeURIComponent(payload.subject || "Portfolio message");
        const body = encodeURIComponent(
          "Name: " + (payload.name || "") + "\n" +
          "Email: " + (payload.email || "") + "\n\n" +
          (payload.message || "")
        );

        if (status) {
          status.textContent = "The form service is not connected yet. Opening your email app instead.";
        }
        window.location.href = "mailto:nicolegorriceta2003@gmail.com?subject=" + subject + "&body=" + body;
      } finally {
        setTimeout(function () {
          button.disabled = false;
          button.textContent = originalText;
          button.classList.remove("sent");
        }, 1800);
      }
    });
  }

  if (aboutPhotoCard) {
    aboutPhotoCard.addEventListener("mousemove", function (event) {
      const rect = aboutPhotoCard.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 8;
      const rotateX = ((y / rect.height) - 0.5) * -8;

      aboutPhotoCard.style.transform =
        "perspective(900px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
    });

    aboutPhotoCard.addEventListener("mouseleave", function () {
      aboutPhotoCard.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    });
  }
});
