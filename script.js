document.addEventListener("DOMContentLoaded", () => {

  /* --------------------------------------------------
     1) Scroll arrow, jump to About section
  -------------------------------------------------- */
  const scrollBtn = document.getElementById("scrollDownBtn");
  if (scrollBtn) {
    scrollBtn.onclick = () => {
      document.getElementById("about").scrollIntoView({ behavior: "smooth" });
    };
  }

  /* --------------------------------------------------
     2) Dark mode toggle
  -------------------------------------------------- */
  const darkToggle = document.getElementById("darkToggle");

  darkToggle.onclick = () => {
    document.documentElement.classList.toggle("dark-mode");

    // Change icon text
    darkToggle.textContent =
      document.documentElement.classList.contains("dark-mode")
        ? "☀️"
        : "🌙";
  };

  /* --------------------------------------------------
     3) Footer Year (auto-updates)
  -------------------------------------------------- */
  const yearText = document.getElementById("year");
  if (yearText) yearText.textContent = new Date().getFullYear();

  /* --------------------------------------------------
     4) Floating contact bubble → scroll to contact
  -------------------------------------------------- */
  const contactBubble = document.getElementById("contactBubble");
  if (contactBubble) {
    contactBubble.onclick = () => {
      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    };
  }

  /* --------------------------------------------------
     5) Contact form (demo only, no backend)
  -------------------------------------------------- */
  const contactForm = document.getElementById("contactForm");
  const formMsg = document.getElementById("formMsg");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      formMsg.textContent = "Message sent!";
      formMsg.style.color = "var(--primary)";
      contactForm.reset();
    });
  }

  /* =====================================================
       PROJECTS SECTION  (cards + modal popup)
  ===================================================== */

  const projectsGrid = document.getElementById("projectsGrid");

  // Simple data for 3 projects
  const projects = [
    {
      title: "2D Platformer Game (Superhero Runner)",
      desc: "A superhero collects coins and avoids obstacles.",
      full: "This is a side-scrolling platformer where the player controls a superhero who runs, jumps, and collects coins while avoiding obstacles. The game includes a simple health UI, collectible items, and floating platforms that shift the level rhythm. I built the environment, player controller, and basic collision/physics systems to practice sprite animation and gameplay flow.",
      img: "assets/p1.png",
      thumb: "assets/p1.png"
    },
    {
      title: "2D RPG Village (Unity)",
      desc: "Pixel RPG prototype with movement and tilemap design.",
      full: "This project is a small RPG village prototype built using Unity’s tilemap system. The player can walk around the environment, explore houses, and interact with collision boundaries that define the village layout. The goal of this prototype was to practice map design, sprite organization, and simple movement logic within a 2D RPG-style world.",
      img: "assets/p2.png",
      thumb: "assets/p2.png"
    },
    {
      title: "Mobile Math Quiz App",
      desc: "Simple quiz app with scoring and feedback.",
      full: "This lightweight math quiz app allows users to answer quick arithmetic questions, track their score in real time, and receive immediate feedback. It features a clean and minimal UI design to keep the experience simple and engaging",
      img: "assets/p3.png",
      thumb: "assets/p3.png"
    }
  ];

  /* --- Generate project cards --- */
  if (projectsGrid) {
    projects.forEach((p, i) => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
        <img class="project-thumb" src="${p.thumb}" alt="${p.title}">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <button class="project-btn" data-index="${i}">View Full Description</button>
      `;
      projectsGrid.appendChild(card);
    });
  }

  /* --- Project modal --- */
  const modal = document.getElementById("projectModal");
  const pmImg = document.getElementById("pmImg");
  const pmTitle = document.getElementById("pmTitle");
  const pmFull = document.getElementById("pmFull");
  const pmClose = document.getElementById("pmClose");

  // Open modal
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("project-btn")) {
      const p = projects[e.target.dataset.index];
      pmImg.src = p.img;
      pmTitle.textContent = p.title;
      pmFull.textContent = p.full;
      modal.classList.add("active");
    }
  });

  // Close modal
  if (pmClose) pmClose.onclick = () => modal.classList.remove("active");

  /* =====================================================
       ACHIEVEMENTS LIGHTBOX
  ===================================================== */

  const achievementImages = [
    "assets/a1.jpeg", "assets/a2.jpeg", "assets/a3.jpeg", "assets/a4.jpeg",
    "assets/a6.jpeg", "assets/a7.jpeg", "assets/a9.jpeg", "assets/a10.jpeg"
  ];

  const achievementCaptions = [
    "Dean’s List Award – Semester 2, Year 2 (2024/2025)",
    "Bronze Medal – Karnival Sukan MMC (KaSKOMM)",
    "3rd Place – Kejohanan Bola Jaring Dun Kuang",
    "Represented FCSIT in Netball – KESUMAS 23/24",
    "3 Gold & 1 Silver – MSSD Gombak",
    "1st Place – FCSIT Netball Team KESUMAS 24/25",
    "Gold Medal (MSS Gombak) & Bronze Medal (Bola Baling Dun Kuang)",
    "Olahragawati Trophy – Kejohanan Sukan Tahunan SK Seri Kundang Kali Ke-15"
  ];

  const previewArea = document.getElementById("achPreview");
  const achFullBtn = document.getElementById("achFullBtn");

  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbCaption = document.getElementById("lbCaption");
  const lbClose = document.getElementById("lbClose");
  const lbPrev = document.getElementById("lbPrev");
  const lbNext = document.getElementById("lbNext");

  let index = 0;

  /* --- Show 4 preview images --- */
  if (previewArea) {
    achievementImages.slice(0, 4).forEach((src, i) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Achievement " + (i + 1);
      img.onclick = () => openLB(i);
      previewArea.appendChild(img);
    });
  }

  /* --- Open Lightbox --- */
  function openLB(i) {
    index = i;
    lbImg.src = achievementImages[i];
    lbCaption.textContent = achievementCaptions[i];
    lb.classList.add("active");
  }

  /* Navigation */
  if (lbClose) lbClose.onclick = () => lb.classList.remove("active");

  lbNext.onclick = () => {
    index = (index + 1) % achievementImages.length;
    openLB(index);
  };

  lbPrev.onclick = () => {
    index = (index - 1 + achievementImages.length) % achievementImages.length;
    openLB(index);
  };

  if (achFullBtn) achFullBtn.onclick = () => openLB(0);

}); // END DOMContentLoaded



/* =====================================================
   NAVBAR ACTIVE LINK HIGHLIGHT ON SCROLL
===================================================== */

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-item");

window.addEventListener("scroll", () => {
  const y = window.scrollY + 160; // header offset

  sections.forEach(sec => {
    if (y > sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {

      navItems.forEach(a => a.classList.remove("active"));

      const active = document.querySelector(`.nav-item[href="#${sec.id}"]`);
      if (active) active.classList.add("active");
    }
  });
});
