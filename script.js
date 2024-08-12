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
    filterLogs(tag);
  });
});

function filterLogs(tag) {
  logEntries.forEach(entry => {
    const entryTag = entry.querySelector('.tag').textContent.trim();
    if (entryTag.includes(tag)) {
        entry.classList.toggle('hidden');
    }
  });
}
