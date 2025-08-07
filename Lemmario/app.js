const lemmiData = vocabolario; // Usa i dati dal file esterno
let currentPage = 1;
const itemsPerPage = 10;
let filteredData = lemmiData;

function toggleContext(lemmaId) {
  const contextDiv = document.getElementById(`context-${lemmaId}`);
  if (contextDiv.style.display === "none" || contextDiv.style.display === "") {
    contextDiv.style.display = "block";
  } else {
    contextDiv.style.display = "none";
  }
}

function renderLemmi(data, page = 1) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = data.slice(startIndex, endIndex);

  const lemmaList = document.getElementById("lemmaList");
  lemmaList.innerHTML = "";

  pageData.forEach((item) => {
    const lemmaItem = document.createElement("div");
    lemmaItem.className = "lemma-item";

    const links = [];

    if (item.mappa) {
      links.push(
        `<a href="${item.mappa}" class="lemma-link link-mappa" target="_blank"><i class="fas fa-map"></i> mappa</a>`
      );
    }
    if (item.aree) {
      links.push(
        `<a href="${item.aree}" class="lemma-link link-aree" target="_blank"><i class="fas fa-globe"></i> aree</a>`
      );
    }
    if (item.forme) {
      links.push(
        `<a href="${item.forme}" class="lemma-link link-forme" target="_blank"><i class="fas fa-shapes"></i> forme</a>`
      );
    }
    if (item.VoDIM) {
      links.push(
        `<a href="https://${item.VoDIM}" class="lemma-link link-VoDIM" target="_blank"><i class="fas fa-book-open"></i> VoDIM</a>`
      );
    }
    if (item.wiktionary) {
      links.push(
        `<a href="${item.wiktionary}" class="lemma-link link-wiktionary" target="_blank"><i class="fab fa-wikipedia-w"></i> wiktionary</a>`
      );
    }

    links.push(
      `<button class="context-btn" onclick="toggleContext(${item.id})"><i class="fas fa-quote-left"></i> contesto</button>`
    );

    lemmaItem.innerHTML = `
                <div class="lemma-row">
                    <div class="lemma-word">${item.lemma}</div>
                    <div class="lemma-info">
                        <div class="frequency-badge">${item.frequenza}</div>
                        <div class="pos-badge">${item.pos}</div>
                    </div>
                </div>
                <div class="lemma-links">
                    ${links.join("")}
                </div>
                <div id="context-${
                  item.id
                }" class="context-content" style="display: none;">
                    "${item.contesto}"
                </div>
            `;

    lemmaList.appendChild(lemmaItem);
  });
}

function renderPagination(data) {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const prevItem = document.createElement("li");
  prevItem.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
  prevItem.innerHTML = `<a class="page-link" href="#" onclick="changePage(${
    currentPage - 1
  })">Precedente</a>`;
  pagination.appendChild(prevItem);

  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageItem = document.createElement("li");
    pageItem.className = `page-item ${i === currentPage ? "active" : ""}`;
    pageItem.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i})">${i}</a>`;
    pagination.appendChild(pageItem);
  }

  const nextItem = document.createElement("li");
  nextItem.className = `page-item ${
    currentPage === totalPages ? "disabled" : ""
  }`;
  nextItem.innerHTML = `<a class="page-link" href="#" onclick="changePage(${
    currentPage + 1
  })">Successivo</a>`;
  pagination.appendChild(nextItem);

  document.getElementById("currentPage").textContent = currentPage;
  document.getElementById("totalPages").textContent = totalPages;
  document.getElementById("totalLemmi").textContent = data.length;
}

function changePage(page) {
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    renderLemmi(filteredData, currentPage);
    renderPagination(filteredData);
  }
}

function applyFilters() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const posFilter = document.getElementById("posFilter").value;
  const frequencyFilter = document.getElementById("frequencyFilter").value;

  filteredData = lemmiData.filter((item) => {
    const matchesSearch = item.lemma.toLowerCase().includes(searchTerm);
    const matchesPos = !posFilter || item.pos === posFilter;
    const matchesFrequency =
      !frequencyFilter ||
      (frequencyFilter === "5"
        ? item.frequenza >= 5
        : item.frequenza == frequencyFilter);
    return matchesSearch && matchesPos && matchesFrequency;
  });

  currentPage = 1;
  renderLemmi(filteredData, currentPage);
  renderPagination(filteredData);
}

// Event listeners
document.getElementById("searchInput").addEventListener("input", applyFilters);
document.getElementById("posFilter").addEventListener("change", applyFilters);
document
  .getElementById("frequencyFilter")
  .addEventListener("change", applyFilters);

// Inizializzazione
renderLemmi(lemmiData, currentPage);
renderPagination(lemmiData);
