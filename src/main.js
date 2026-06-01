import "./style.css";
import dayjs from "dayjs";

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const input = document.getElementById("birthday").value;

  const selectedDate = dayjs(input);

  const day = selectedDate.date();
  const month = selectedDate.month() + 1;

  const now = dayjs();
  const year = now.year();

  let birthday = dayjs(`${year}-${month}-${day}`, "YYYY-M-D");
  let nextBirthday = dayjs(`${now.year()}-${month}-${day}`, "YYYY-M-D");

  if (nextBirthday.isBefore(now, "day")) {
  nextBirthday = nextBirthday.add(1, "year");
  }
  if (birthday.isAfter(now, "day")) {
    birthday = birthday.subtract(1, "year");
  }

  const diffDays = now.diff(birthday, "day");
  const diffWeeks = nextBirthday.diff(now, "week");
  
  if (diffDays == 0) {
    alert("Wszystkiego najlepszego!");
    return;
  }

  if (diffWeeks == 0) {
    document.getElementById("dialog-weeks").textContent =
  `Masz urodziny w tym tygodniu!`;
  } else {
    document.getElementById("dialog-weeks").textContent =
  `Do urodzin zostało: ${diffWeeks} tygodni`;
  }
  document.getElementById("dialog-days").textContent =
  `Od urodzin minęło: ${diffDays} dni`;

  document.getElementById("my-dialog").showModal();
  });

document.getElementById("close-x").addEventListener("click", () => {
  document.getElementById("my-dialog").close();
});
  
