let allIssues = [];

function loadissues() {
  toggleSpinner(true);

  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((response) => response.json())
    .then((result) => {
      setTimeout(() => {
        allIssues = result.data;
        displayIssues(allIssues);
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
    issueCard.className =
      "card cursor-pointer max-w-full bg-white rounded-xl shadow-md border border-gray-200";
    issueCard.innerHTML = `

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
                    </div>
                    <div class="text-right">
                      <div>Created</div>
                      <div class="font-semibold text-gray-700">${issue.createdAt ? issue.createdAt.slice(0, 10) : "-"}</div>
                     
                    </div>
                  </div>

  

        `;

    issueCard.addEventListener("click", () => {
      displayModal(issue.id);
    });

    issueCardContainer.appendChild(issueCard);
  });

  countcards(issues.length);
};

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
  loadissues();
});

const hidden = (status) => {
  searchInput.value = "";

  if (status === "btn-all") {
    displayIssues(allIssues);
  } else if (status === "btn-open") {
    displayIssues(allIssues.filter((issue) => issue.status === "open"));
  } else if (status === "btn-closed") {
    displayIssues(allIssues.filter((issue) => issue.status === "closed"));
  }
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

function displayModal(issueId) {
  const issueModal = document.getElementById("my_modal");
  if (!issueModal) return console.error("Modal element not found!");

  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`)
    .then((response) => response.json())
    .then((result) => {
      const issue = result.data;

      const formattedDate = issue.createdAt
        ? new Date(issue.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "-";

      const statusClass =
        issue.status === "open" ? "bg-green-500" : "bg-violet-500";
      const statusText = issue.status === "open" ? "Opened" : "Closed";
      const priorityClass =
        issue.priority === "high"
          ? "bg-red-500 text-white"
          : issue.priority === "medium"
            ? "bg-yellow-400 text-white"
            : "bg-green-500 text-white";

      const labelsHTML =
        issue.labels && issue.labels.length > 0
          ? issue.labels
              .map((label) => {
                switch (label.toLowerCase()) {
                  case "bug":
                    return `<span class="bg-red-50 border border-red-300 text-red-500 px-4 py-1.5 rounded-full text-sm font-medium"><i class="fa-solid fa-bug"></i> BUG</span>`;
                  case "enhancement":
                    return `<span class="bg-blue-50 border border-blue-300 text-blue-500 px-4 py-1.5 rounded-full text-sm font-medium"><i class="fa-solid fa-wand-magic-sparkles"></i> ENHANCEMENT</span>`;
                  case "documentation":
                    return `<span class="bg-gray-50 border border-gray-300 text-gray-500 px-4 py-1.5 rounded-full text-sm font-medium"><i class="fa-solid fa-book"></i> DOCUMENTATION</span>`;
                  case "help wanted":
                    return `<span class="bg-yellow-50 border border-yellow-400 text-yellow-600 px-4 py-1.5 rounded-full text-sm font-medium"><i class="fa-solid fa-hands-helping"></i> HELP WANTED</span>`;
                  case "good first issue":
                    return `<span class="bg-green-50 border border-green-300 text-green-600 px-4 py-1.5 rounded-full text-sm font-medium"><i class="fa-solid fa-seedling"></i> GOOD FIRST ISSUE</span>`;
                  default:
                    return `<span class="bg-gray-50 border border-gray-200 text-gray-400 px-4 py-1.5 rounded-full text-sm font-medium">${label.toUpperCase()}</span>`;
                }
              })
              .join("")
          : "";

      issueModal.innerHTML = `
        <div class="modal-box max-w-3xl p-8 rounded-2xl">
          <!-- Title -->
          <h2 class="text-3xl font-bold text-gray-900 mb-3">${issue.title}</h2>

          <!-- Status + Author + Date -->
          <div class="flex items-center gap-2 text-sm text-gray-500 mb-5">
            <span class="${statusClass} text-white text-xs font-semibold px-3 py-1 rounded-full">
              ${statusText}
            </span>
            <span>•</span>
            <span>Opened by ${issue.author || "-"}</span>
            <span>•</span>
            <span>${formattedDate}</span>
          </div>

          <!-- Labels -->
          <div class="flex gap-2 flex-wrap mb-6">
            ${labelsHTML}
          </div>

          <!-- Description -->
          <p class="text-gray-600 text-base leading-relaxed mb-6">${issue.description}</p>

          <!-- Info Box: Assignee & Priority -->
          <div class="bg-gray-50 rounded-xl p-6 flex justify-between items-center mb-6">
            <div>
              <p class="text-gray-400 text-sm mb-1">Assignee:</p>
              <p class="text-gray-800 font-semibold text-lg">${issue.assignee || "-"}</p>
            </div>
            <div class="text-right">
              <p class="text-gray-400 text-sm mb-1">Priority:</p>
              <span class="${priorityClass} text-sm px-5 py-1.5 rounded-full font-semibold">
                ${issue.priority.toUpperCase()}
              </span>
            </div>
          </div>

          <!-- Close Button -->
          <div class="flex justify-end">
            <form method="dialog">
              <button class="btn bg-violet-600 hover:bg-violet-700 border-none text-white px-8 rounded-lg">Close</button>
            </form>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      `;

      // Show modal
      issueModal.showModal();
    })
    .catch((error) => console.error("Error fetching issue details:", error));
}

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

function filterIssues() {
  const query = searchInput.value.toLowerCase();

  toggleSpinner(true);

  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`)
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

searchBtn.addEventListener("click", filterIssues);

loadissues();
