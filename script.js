const aboutLink = document.querySelector('.about-link');
const aboutContent = document.querySelector('.about-content');

aboutLink.addEventListener('click', () => {
    aboutContent.classList.toggle('transform-active');
    aboutContent.classList.toggle('opacity-active');
});

const tagLinks = document.querySelectorAll('.tag-nav ul div');
const logEntries = document.querySelectorAll('.log-entry');

tagLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const tag = link.getAttribute('data-tag');
    if (link.style.textDecoration === 'underline') {
        link.style.textDecoration = 'none'; // Remove underline if already present
    } else {
        link.style.textDecoration = 'underline'; // Add underline if not present
    }    filterLogs(tag);
  });
});

function filterLogs(tag) {
  logEntries.forEach(entry => {
    const entryTag = entry.querySelector('.tag').textContent.trim();
    if (!entryTag.includes(tag)) {
        entry.classList.toggle('hidden');
    }
  });
}


// JavaScript to handle opening and closing images in full screen
function openFullscreen(imgElement) {
    const existingFullscreenImg = document.querySelector('.fullscreen-img');
  
    if (existingFullscreenImg) {
      // If an image is already in fullscreen, remove it
      existingFullscreenImg.remove();
    } else {
      // Create a new div for the full screen image
      const fullscreenDiv = document.createElement('div');
      fullscreenDiv.classList.add('fullscreen-img');
      fullscreenDiv.onclick = closeFullscreen;
  
      // Create an image element for the high-resolution image
      const highResImg = document.createElement('img');
      highResImg.src = imgElement.getAttribute('data-highres');
      fullscreenDiv.appendChild(highResImg);
  
      // Append the fullscreen div to the body
      document.body.appendChild(fullscreenDiv);
    }
  }
  
  function closeFullscreen() {
    const fullscreenImg = document.querySelector('.fullscreen-img');
    if (fullscreenImg) {
      fullscreenImg.remove();
    }
  }
  