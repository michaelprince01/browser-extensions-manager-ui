// json extension data

const extensionsData = [
  {
    logo: './assets/images/logo-devlens.svg',
    name: 'DevLens',
    description:
      'Quickly inspect page layouts and visualize element boundaries.',
    isActive: true,
  },
  {
    logo: './assets/images/logo-style-spy.svg',
    name: 'StyleSpy',
    description: 'Instantly analyze and copy CSS from any webpage element.',
    isActive: true,
  },
  {
    logo: './assets/images/logo-speed-boost.svg',
    name: 'SpeedBoost',
    description: 'Optimizes browser resource usage to accelerate page loading.',
    isActive: false,
  },
  {
    logo: './assets/images/logo-json-wizard.svg',
    name: 'JSONWizard',
    description:
      'Formats, validates, and prettifies JSON responses in-browser.',
    isActive: true,
  },
  {
    logo: './assets/images/logo-tab-master-pro.svg',
    name: 'TabMaster Pro',
    description: 'Organizes browser tabs into groups and sessions.',
    isActive: true,
  },
  {
    logo: './assets/images/logo-viewport-buddy.svg',
    name: 'ViewportBuddy',
    description:
      'Simulates various screen resolutions directly within the browser.',
    isActive: false,
  },
  {
    logo: './assets/images/logo-markup-notes.svg',
    name: 'Markup Notes',
    description:
      'Enables annotation and notes directly onto webpages for collaborative debugging.',
    isActive: true,
  },
  {
    logo: './assets/images/logo-grid-guides.svg',
    name: 'GridGuides',
    description:
      'Overlay customizable grids and alignment guides on any webpage.',
    isActive: false,
  },
  {
    logo: './assets/images/logo-palette-picker.svg',
    name: 'Palette Picker',
    description: 'Instantly extracts color palettes from any webpage.',
    isActive: true,
  },
  {
    logo: './assets/images/logo-link-checker.svg',
    name: 'LinkChecker',
    description: 'Scans and highlights broken links on any page.',
    isActive: true,
  },
  {
    logo: './assets/images/logo-dom-snapshot.svg',
    name: 'DOM Snapshot',
    description: 'Capture and export DOM structures quickly.',
    isActive: false,
  },
  {
    logo: './assets/images/logo-console-plus.svg',
    name: 'ConsolePlus',
    description:
      'Enhanced developer console with advanced filtering and logging.',
    isActive: true,
  },
];

// importing the tags
const filterAllBtn = document.querySelector('.filter-all-btn');
const filterActiveBtn = document.querySelector('.filter-active-btn');
const filterInactiveBtn = document.querySelector('.filter-inactive-btn');
const themeToggle = document.querySelector('.toggle-img img');
const extensionList = document.querySelector('.extension-list');

// toggle between light & dark mode
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  // change icon
  if (document.body.classList.contains('dark')) {
    themeToggle.src = './assets/images/icon-sun.svg';
  } else {
    themeToggle.src = './assets/images/icon-moon.svg';
  }
});

// create a single extension element
function createExtension(ext) {
  const extensionDiv = document.createElement('div');
  extensionDiv.classList.add('extension');
  if (ext.isActive) {
    extensionDiv.classList.add('active');
  } else {
    extensionDiv.classList.add('inactive');
  }

  extensionDiv.innerHTML = `
    <div class="extension-header">
      <img class="extension-logo" src="${ext.logo}" alt="${ext.name}" />
      <div>
        <h4 class="extension-name">${ext.name}</h4>
        <small class="extension-description">${ext.description}</small>
      </div>
    </div>
    <div class="extension-btn">
      <button class="extension-remove-btn">Remove</button>
      <label class="extension-toggle-switch">
        <input type="checkbox" ${ext.isActive ? 'checked' : ''}/>
        <span class="slider"></span>
      </label>
    </div>
  `;

  extensionList.appendChild(extensionDiv);
}

// populate all extensions data
extensionsData.forEach((ext) => createExtension(ext));

function initToggleLogic() {
  const toggles = document.querySelectorAll('.extension-toggle-switch input');

  toggles.forEach((toggle) => {
    toggle.addEventListener('change', (e) => {
      const checkbox = e.target;
      const extensionDiv = checkbox.closest('.extension');
      extensionDiv.querySelector('.extension-name').textContent;

      if (checkbox.checked) {
        extensionDiv.classList.add('active');
        extensionDiv.classList.remove('inactive');
      } else {
        extensionDiv.classList.add('inactive');
        extensionDiv.classList.remove('active');
      }
    });
  });
}

initToggleLogic();

// filter functions
function showAllExtensions() {
  const extensions = document.querySelectorAll('.extension');
  extensions.forEach((ext) => {
    ext.style.display = 'block';
  });
}

function showActiveExtensions() {
  const extensions = document.querySelectorAll('.extension');
  extensions.forEach((ext) => {
    if (ext.classList.contains('active')) {
      ext.style.display = 'block';
    } else {
      ext.style.display = 'none';
    }
  });
}

function showInactiveExtensions() {
  const extensions = document.querySelectorAll('.extension');
  extensions.forEach((ext) => {
    if (ext.classList.contains('inactive')) {
      ext.style.display = 'block';
    } else {
      ext.style.display = 'none';
    }
  });
}

// events for the filter buttons
filterAllBtn.addEventListener('click', () => {
  showAllExtensions();
  setActiveFilter(filterAllBtn);
});

filterActiveBtn.addEventListener('click', () => {
  showActiveExtensions();
  setActiveFilter(filterActiveBtn);
});

filterInactiveBtn.addEventListener('click', () => {
  showInactiveExtensions();
  setActiveFilter(filterInactiveBtn);
});

// gives visual feedback for which filter button is selected
function setActiveFilter(activeBtn) {
  document
    .querySelectorAll('.extension-filter-btn button')
    .forEach((btn) => btn.classList.remove('active-filter'));

  activeBtn.classList.add('active-filter');
}

// remove extensions
extensionList.addEventListener('click', (e) => {
  const removeBtn = e.target.closest('.extension-remove-btn');
  if (!removeBtn) return;

  const extensionDiv = removeBtn.closest('.extension');
  const id = Number(extensionDiv.dataset.id);

  // animate out
  extensionDiv.classList.add('removing');

  // remove after animation
  setTimeout(() => {
    // remove from DOM
    extensionDiv.remove();

    // remove from data
    const index = extensionsData.findIndex((ext) => ext.id === id);
    if (index !== -1) {
      extensionsData.splice(index, 1);
    }
  }, 200);
});
