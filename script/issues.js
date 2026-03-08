function loadissues() {
  toggleSpinner(true);

  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((response) => response.json())
    .then((result) => {
      setTimeout(() => {
        displayIssues(result.data);
        toggleSpinner(false);
      }, 0); // 3000 ms = 3 second
    })
    .catch((error) => {
      console.error("Error fetching issues:", error);

      setTimeout(() => {
        toggleSpinner(false);
      }, 0);
    });
}

const displayIssues = (issues) => {
  const issueCardContainer = document.getElementById("issue-card");
  issueCardContainer.innerHTML = "";
  issues.forEach((issue) => {
    const issueCard = document.createElement("div");
    issueCard.innerHTML = `



              <div class="max-w-full bg-white rounded-xl shadow-md border border-gray-200">
                ${
                  issue.status === "open"
                    ? '<div class="w-full h-2 rounded-t-xl bg-green-400"></div>'
                    : '<div class="w-full h-2 rounded-t-xl bg-violet-500"></div>'
                }

                  <div class="flex  justify-between items-center p-4">

                    ${
                      issue.status === "open"
                        ? `<img class="w-8 h-8 rounded-full flex items-center justify-center " src="assets/Open-Status.png" alt="Open Status" />`
                        : `<img class="w-8 h-8 rounded-full flex items-center justify-center"  src="assets/Closed- Status .png" alt="Closed Status" />`
                    }
                    


                    ${
                      issue.priority === "high"
                        ? '<span class="bg-red-100 text-red-500 text-sm px-4 py-1 rounded-full font-semibold">HIGH</span>'
                        : issue.priority === "medium"
                          ? '<span class="bg-yellow-100 text-yellow-600 text-sm px-4 py-1 rounded-full font-semibold">MEDIUM</span>'
                          : '<span class="bg-gray-100 text-green-600 text-sm px-4 py-1 rounded-full font-semibold">LOW</span>'
                    }

                  </div>

                  <div  class="px-4">
                      <h2 class="text-xl font-semibold text-gray-800">
                      ${issue.title}
                      </h2>

                      <p class="text-gray-500 mt-2">
                      ${issue.description}
                      </p>
                  </div>


                  <div class="flex gap-3 px-4 mt-4">
                    ${
                      issue.labels && issue.labels.length > 0
                        ? issue.labels
                            .map((label) => {
                              if (label.toLowerCase() === "bug") {
                                return `<span class="border border-red-300 text-red-500 px-3 py-1 rounded-full text-xs"><i class='fa-solid fa-bug'></i> BUG</span>`;
                              } else if (
                                label.toLowerCase() === "enhancement"
                              ) {
                                return `<span class="border border-blue-300 text-blue-500 px-3 py-1 rounded-full text-xs"><i class='fa-solid fa-wand-magic-sparkles'></i> ENHANCEMENT</span>`;
                              } else if (
                                label.toLowerCase() === "documentation"
                              ) {
                                return `<span class="border border-gray-300 text-gray-500 px-3 py-1 rounded-full text-xs"><i class='fa-solid fa-book'></i> DOCUMENTATION</span>`;
                              } else if (
                                label.toLowerCase() === "help wanted"
                              ) {
                                return `<span class="border border-yellow-400 text-yellow-600 px-3 py-1 rounded-full text-xs"><i class='fa-solid fa-hands-helping'></i> HELP WANTED</span>`;
                              } else if (
                                label.toLowerCase() === "good first issue"
                              ) {
                                return `<span class="border border-green-300 text-green-600 px-3 py-1 rounded-full text-xs"><i class='fa-solid fa-seedling'></i> GOOD FIRST ISSUE</span>`;
                              } else {
                                return `<span class="border border-gray-200 text-gray-400 px-3 py-1 rounded-full text-xs">${label.toUpperCase()}</span>`;
                              }
                            })
                            .join("")
                        : ""
                    }
                  </div>


                  <hr class="my-4 border-gray-300" />
                  <div class="flex justify-between items-start p-4 text-gray-500 text-xs">
                    <div>
                      <div>Author</div>
                      <div class="font-semibold text-gray-700">#${issue.id} ${issue.author || "-"}</div>
                      <div class="mt-2">Assignee</div>
                      <div class="font-semibold text-gray-700">${issue.assignee || "-"}</div>
                    </div>
                    <div class="text-right">
                      <div>Created</div>
                      <div class="font-semibold text-gray-700">${issue.createdAt ? issue.createdAt.slice(0, 10) : "-"}</div>
                      <div class="mt-2">Updated</div>
                      <div class="font-semibold text-gray-700">${issue.updatedAt ? issue.updatedAt.slice(0, 10) : "-"}</div>
                    </div>
                  </div>

              </div>

        `;
    issueCardContainer.appendChild(issueCard);
  });

  countcards(issues.length);
};

// button selection
const filterButtons = [
  document.getElementById("btn-all"),
  document.getElementById("btn-open"),
  document.getElementById("btn-closed"),
];
filterButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    filterButtons.forEach((b) => b.classList.remove("btn-active"));
    this.classList.add("btn-active");
    hidden(this.id);
  });
});

const hidden = (status) => {
  toggleSpinner(true);

  const issueCards = document.querySelectorAll("#issue-card > div");
  let c = 0;
  issueCards.forEach((card) => {
    if (status === "btn-all") {
      card.style.display = "block";
      c++;
    } else if (status === "btn-open") {
      if (card.innerHTML.includes("Open Status")) {
        card.style.display = "block";
        c++;
      } else {
        card.style.display = "none";
      }
    } else if (status === "btn-closed") {
      if (card.innerHTML.includes("Closed Status")) {
        card.style.display = "block";
        c++;
      } else {
        card.style.display = "none";
      }
    }
  });
  countcards(c);

  toggleSpinner(false);
};

const countcards = (cnt) => {
  const count = document.getElementById("count");
  if (count) {
    count.textContent = cnt;
  }
};

function toggleSpinner(show) {
  const spinner = document.getElementById("spinner");

  if (show) {
    spinner.style.display = "flex";
  } else {
    spinner.style.display = "none";
  }
}

loadissues();
