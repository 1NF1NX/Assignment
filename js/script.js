
const events = [
  {
    name: "HackIEM 2026",
    date: "September 26, 2026",
    venue: "AIML Lab",
    category: "Hackathon",
    description: "Annual 24-hour hackathon to build innovative solutions."
  },
  {
    name: "AI Workshop",
    date: "October 15, 2026",
    venue: "Seminar Hall",
    category: "Workshop",
    description: "Learn about artificial intelligence and generative AI."
  },
  {
    name: "Annual Cultural Fest",
    date: "November 5, 2026",
    venue: "Main Ground",
    category: "Cultural",
    description: "Celebrate music, dance, creativity and campus talent."
  },
  {
    name: "Tech Quiz 2.0",
    date: "September 10, 2026",
    venue: "Lab 4",
    category: "Competition",
    description: "Challenge your technical knowledge in an exciting quiz."
  },
  {
    name: "Alumni Meet",
    date: "December 12, 2026",
    venue: "Auditorium",
    category: "Networking",
    description: "Reconnect with alumni and share experiences."
  }
];

// Display event cards
const eventList = document.getElementById("event-list");

if (eventList) {
  eventList.innerHTML = events.map(event => `
    <article class="event-card">
      <p class="eyebrow">${event.category}</p>
      <p class="event-date">${event.date}</p>
      <h3>${event.name}</h3>
      <p>${event.description}</p>
      <p><strong>Venue:</strong> ${event.venue}</p>
      <button class="button register-event"
        data-event="${event.name}">
        Register Now
      </button>
    </article>
  `).join("");
}

// Update Indian Standard Time
function updateClock() {
  const clock = document.getElementById("clock");

  if (clock) {
    clock.textContent =
      "Current Time (IST): " +
      new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata"
      });
  }
}

updateClock();
setInterval(updateClock, 1000);

// Select an event and go to registration
document.addEventListener("click", function(event) {
  const button = event.target.closest(".register-event");

  if (button) {
    const eventSelect = document.getElementById("event");

    if (eventSelect) {
      eventSelect.value = button.dataset.event;

      document.getElementById("register").scrollIntoView({
        behavior: "smooth"
      });
    }
  }
});

// Registration form demo
const registrationForm =
  document.getElementById("registration-form");

if (registrationForm) {
  registrationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    document.getElementById("form-message").textContent =
      "Form validated! Connect the backend to save your registration.";

    this.reset();
  });
}

// Feedback form demo
const feedbackForm =
  document.getElementById("feedback-form");

if (feedbackForm) {
  feedbackForm.addEventListener("submit", function(event) {
    event.preventDefault();

    document.getElementById("feedback-status").textContent =
      "Feedback form validated!";

    this.reset();
  });
}

