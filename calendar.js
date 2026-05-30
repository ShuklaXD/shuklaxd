/* Minimal month calendar — current month with today highlighted, and prev/next
   navigation. Week starts Monday. No dependencies, no build step. */
(function () {
  const el = document.getElementById("calendar");
  if (!el) return;

  const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const DOW = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const today = new Date();
  let view = new Date(today.getFullYear(), today.getMonth(), 1);

  const sameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  function render() {
    const y = view.getFullYear();
    const m = view.getMonth();
    // Monday-first: JS getDay() is 0=Sun..6=Sat → shift so Mon=0
    const startOffset = (new Date(y, m, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(y, m + 1, 0).getDate();

    let cells = "";
    for (let i = 0; i < startOffset; i++) {
      cells += '<span class="cal-day cal-empty"></span>';
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = sameDay(new Date(y, m, d), today);
      cells += `<span class="cal-day${isToday ? " cal-today" : ""}">${d}</span>`;
    }

    el.innerHTML = `
      <div class="cal-head">
        <button class="cal-nav" type="button" data-dir="-1" aria-label="Previous month">&lsaquo;</button>
        <span class="cal-title">${MONTHS[m]} ${y}</span>
        <button class="cal-nav" type="button" data-dir="1" aria-label="Next month">&rsaquo;</button>
      </div>
      <div class="cal-grid cal-dow">${DOW.map((d) => `<span class="cal-downame">${d}</span>`).join("")}</div>
      <div class="cal-grid cal-days">${cells}</div>`;

    el.querySelectorAll(".cal-nav").forEach((btn) =>
      btn.addEventListener("click", () => {
        view = new Date(view.getFullYear(), view.getMonth() + Number(btn.dataset.dir), 1);
        render();
      })
    );
  }

  render();
})();
