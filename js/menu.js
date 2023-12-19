$(document).ready(() => {
  // Define constants for the base URL and menu URL
  const BASE_URL = window.location.origin;
  const MENU_URL = `${BASE_URL}/data/menu.json`;

  // Define an object for the AJAX configuration
  const AJAX_CONFIG = {
    cache: false,
    url: MENU_URL,
    global: false,
    method: "GET",
    dataType: "json",
  };

  // Define a function for the success callback
  const successCallback = (menu) => {
    // Get the menu container element
    let container = document.getElementById("menu");

    // Clear the container content
    container.innerHTML = "";

    // Create an unordered list element for the menu tabs
    let ulst = document.createElement("ul");
    // Create a div element for the tab content
    let lstTabs = document.createElement("div");

    // Set the class names for the elements
    lstTabs.className = "tab-content";
    ulst.className = `
      nav nav-pills d-inline-flex
      justify-content-center border-bottom mb-5
    `;

    // Set the role attribute for the ul element
    ulst.role = "tablist";

    // Loop through the menu array and create the tabs and content
    menu.map((category, tabIndex) => {
      // Create a div element for each tab
      let tab = document.createElement("div");
      // Create a div element for the tab items
      let tabItems = document.createElement("div");

      // Set the id for the tab
      tab.id = `tab-${tabIndex}`;
      // Set the class name for the tab items
      tabItems.className = "row g-4";

      // Set the class name for the tab based on the index
      if (tabIndex > 0) {
        tab.className = "tab-pane fade show p-0";
      } else {
        tab.className = "tab-pane fade show p-0 active";
      }

      // Append the tab link to the ul element using template literals
      ulst.innerHTML += `
        <li class="nav-item" role="presentation">
          <a
            role="tab"
            tabindex="-1"
            data-bs-toggle="pill"
            href="#tab-${tabIndex}"
            class="
              d-flex
              align-items-center
              text-start mx-3 ms-0 pb-3
              ${tabIndex > 0 ? "" : "active"}
            "
            aria-selected="${tabIndex > 0 ? "false" : "true"}"
          >
            <i class="${category?.icon} fa-2x text-primary"></i>
            <div class="ps-3">
              <!-- Summary -->
              ${!category?.summary ?'': (`
                 <small class="text-body">
                   ${category?.summary}
                 </small>
              `)}

              <!-- Name -->
              ${!category?.name ?'': (`
                 <h6 class="mt-n1 mb-0"> ${category?.name} </h6>
              `)}
            </div>
          </a>
        </li>
      `;

      // Loop through the category menu array and create the tab items
      category.menu.map((item) => {
        // Append the tab item to the tab items element using template literals
        tabItems.innerHTML += `
          <div class="col-lg-6">
            <div class="d-flex align-items-center">
              ${!item?.image ?'': (`
                  <img
                    loading="lazy"
                    alt="${item?.name}"
                    style="width: 80px;"
                    src="${item?.image}"
                    class="flex-shrink-0 img-fluid rounded"
                  />
              `)}

              <div class="w-100 d-flex flex-column text-start ps-4">
                <!-- Title -->
                <h5 class="d-flex justify-content-between border-bottom pb-2">
                  <!-- Name -->
                  ${!item?.name ?'': (`
                     <span> ${item?.name} </span>
                  `)}

                  <!-- Price -->
                  ${!item?.price ?'': (`
                     <span class="text-primary">
                        ${item?.price}
                     </span>
                  `)}
                </h5>

                <!-- Summary -->
                ${!item?.summary ?'': (`
                    <small class="fst-italic">  ${item?.summary} </small>
                `)}
              </div>
            </div>
          </div>
        `;
      });

      // Append the tab items to the tab
      tab.appendChild(tabItems);

      // Append the tab to the tab content
      lstTabs.appendChild(tab);
    });

    // Append the ul element and the tab content to the container
    container.appendChild(ulst);
    container.appendChild(lstTabs);
  };

  // Make the AJAX request using the configuration and the callback
  $.ajax({
    ...AJAX_CONFIG,
    success: successCallback,
    complete: () => {},
    beforeSend: () => {
      // Set the container content to loading message
      document.getElementById("menu").innerHTML = "Loading Menu";
    },
  });
});