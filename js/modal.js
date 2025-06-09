  function openModal(event, id) {
    const modal = document.getElementById(id);
  const triggerRect = event.target.getBoundingClientRect();
  modal.style.transformOrigin = `${triggerRect.left + triggerRect.width / 2}px ${triggerRect.top + triggerRect.height / 2}px`;
    modal.style.display = 'flex';
    const content = modal.querySelector('.modal-content');
    content.style.transform = 'scale(0.85)';
    setTimeout(() => {
      modal.style.opacity = '1';
      modal.style.visibility = 'visible';
      content.style.transform = 'scale(1)'
    }, 10);
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    modal.style.opacity = '0';
    modal.style.visibility = 'hidden';
    const content = modal.querySelector('.modal-content');
    content.style.transform = 'scale(0.85)'
    setTimeout(() => {
      modal.style.display = 'none';
    }, 400);
  }