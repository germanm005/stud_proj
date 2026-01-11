export function initLocation() {
    const cityBtn = document.querySelector('.location__city');
    const cityName = document.querySelector('.location__city-name');
    const sublist = document.querySelector('.location__sublist');

    if (!cityBtn || !cityName || !sublist) return;

    cityBtn.addEventListener('click', () => {
        cityBtn.classList.toggle('location__city--active');
    });

    sublist.addEventListener('click', (evt) => {
        const btn = evt.target.closest('.location__sublink');
        if (!btn) return;

        cityName.textContent = btn.textContent.trim();
        cityBtn.classList.remove('location__city--active');
    });
}