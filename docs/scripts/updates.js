// Run synchronously after the listing markup, before Quarto's DOMContentLoaded
// initializer. An empty List.js list has no item template and cannot initialize.
(() => {
  const listing = document.querySelector(".quarto-listing");
  const items = listing?.querySelector(".list");
  const emptyMessage = document.querySelector(".updates-empty");
  const categories = document.querySelector(".quarto-listing-category");

  if (!items?.children.length) {
    listing?.remove();
    categories?.remove();
    document.querySelector(".quarto-listing-category-title")?.remove();
    return;
  }

  if (emptyMessage) emptyMessage.hidden = true;
  if (!categories) return;

  // Keep Quarto's category handling, with a labelled control that remains
  // available when the category sidebar is hidden on narrow screens.
  const control = document.createElement("div");
  control.className = "updates-project-filter";
  const label = document.createElement("label");
  label.htmlFor = "updates-project";
  label.textContent = "Project";
  const select = document.createElement("select");
  select.id = "updates-project";
  select.className = "form-select form-select-sm";

  for (const category of categories.querySelectorAll(".category")) {
    const option = document.createElement("option");
    option.value = category.dataset.category;
    option.textContent = option.value ? category.textContent.trim() : "All projects";
    select.append(option);
  }
  select.addEventListener("change", () => {
    window.quartoListingCategory(select.value);
  });
  control.append(label, select);
  listing.prepend(control);

  const syncSelection = () => {
    select.value = categories.querySelector(".category.active")?.dataset.category || "";
  };
  document.addEventListener("DOMContentLoaded", syncSelection);
  document.addEventListener("click", (event) => {
    if (event.target.closest(".listing-category, .quarto-listing-category, .quarto-listing-category-title")) {
      syncSelection();
    }
  });
})();
