const screens = [
    { header: 'Hello!', content: 'intro', info: 'Welcome to Stat.' },
    { header: 'Feed', content: 'feed', info: 'Explore posts from athletes around the world.' },
    { header: 'Discover Athletes', content: 'discover', info: 'Find and follow the top athletes.' },
    { header: 'Your Profile', content: 'profile', info: 'Manage your profile and check your posts.' }
];

const screenContent = document.querySelector('.screen-content');
const infoBox = document.querySelector('.info-box');
// const progress = document.querySelector('.progress');
let currentScreenIndex = 0;
let isTransitioning = false;

function updateScreen(index) {
    if (index < 0 || index >= screens.length) return;
    currentScreenIndex = index;
    screenContent.style.opacity = 0;
    infoBox.style.opacity = 0;

    setTimeout(() => {
        screenContent.innerHTML = `
            <div class="header">${screens[currentScreenIndex].header}</div>
            ${getScreenContent(screens[currentScreenIndex].content)}
            <div class="nav-bar">
                <div class="nav-item"></div>
                <div class="nav-item"></div>
                <div class="nav-item"></div>
                <div class="nav-item"></div>
            </div>
        `;

        infoBox.innerHTML = `<h2>${screens[currentScreenIndex].header}</h2><p>${screens[currentScreenIndex].info}</p>`;

        screenContent.style.opacity = 1;
        infoBox.style.opacity = 1;
    }, 250);
}

function getScreenContent(type) {
    switch(type) {
        case 'intro':
            return '<div class="intro-content"><h3>Welcome to Stat!</h3><p>Your journey into sports analytics begins here.</p></div>';
        case 'feed':
            return '<div class="feed-item"><div class="user-profile"><div class="profile-pic"></div><div class="username">@athlete_pro</div></div><div class="post-image"></div></div>';
        case 'discover':
            return '<div class="feed-item"><div class="user-profile"><div class="profile-pic"></div><div class="username">@pro_athlete</div></div><div class="post-image"></div></div>';
        case 'profile':
            return '<div class="user-profile" style="margin-bottom: 20px;"><div class="profile-pic"></div><div class="username">@your_profile</div></div><div class="feed-item"><div class="post-image"></div></div>';
        default:
            return '';
    }
}

window.addEventListener('wheel', (event) => {
    if (isTransitioning) return;
    isTransitioning = true;

    if (event.deltaY > 0) {
        if (currentScreenIndex < screens.length - 1) {
            updateScreen(currentScreenIndex + 1);
        }
    } else {
        if (currentScreenIndex > 0) {
            updateScreen(currentScreenIndex - 1);
        }
    }

    setTimeout(() => {
        isTransitioning = false;
    }, 700);
});


updateScreen(0);

document.querySelector('.button1').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('next-section').scrollIntoView({ behavior: 'smooth' });
});