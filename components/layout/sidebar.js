(function () {
  const sidebar = document.querySelector('.side-bar');
  if (!sidebar) return;

  const items = sidebar.querySelectorAll('.side-bar__item');
  items.forEach((item) => {
    item.addEventListener('click', () => {
      items.forEach((i) => i.removeAttribute('aria-current'));
      item.setAttribute('aria-current', 'page');
    });
  });

  const actions = sidebar.querySelectorAll('.side-bar__action');
  actions.forEach((action) => {
    action.addEventListener('click', () => {
      actions.forEach((a) => a.removeAttribute('aria-current'));
      action.setAttribute('aria-current', 'true');
    });
  });

  const profile = sidebar.querySelector('.side-bar__profile');
  if (profile) {
    const activate = () => console.log('sidebar:profile');
    profile.addEventListener('click', activate);
    profile.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activate();
      }
    });
  }
})();
