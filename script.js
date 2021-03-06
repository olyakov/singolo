
// navigation active
const NAVIGATION = document.getElementById('navigation');
const HOME_SECTION = document.getElementById('header');
const SERVICES_SECTION = document.getElementById('services');
const PORTFOLIO_SECTION = document.getElementById('portfolio');
const ABOUT_SECTION = document.getElementById('about');
const CONTACTS_SECTION = document.getElementById('contact');

const removeLinkActive = () => {
    NAVIGATION.querySelectorAll('span').forEach(item => {
        item.classList.remove('link-active');
    });
}

NAVIGATION.addEventListener('click', (event) => {
    if (event.target.tagName == 'SPAN') {
        removeLinkActive();
        event.target.classList.add('link-active');
    }
})

// anchors scroll
const ANCHORS = document.querySelectorAll('a[href*="#"]')

for (let anchor of ANCHORS) {
    anchor.addEventListener('click', event => {
        event.preventDefault()
        const blockID = anchor.getAttribute('href').substr(1)
        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}

// change active link with scrolling
window.addEventListener('scroll', () => {
    if (window.scrollY < SERVICES_SECTION.offsetTop - HOME_SECTION.offsetHeight) {
        removeLinkActive();
        document.getElementById('home_link').classList.add('link-active');
        document.getElementById('header').style.opacity = '1';
        document.getElementById('header').style.height = '89px';
    }
    if (window.scrollY >= SERVICES_SECTION.offsetTop - HOME_SECTION.offsetHeight && window.scrollY < PORTFOLIO_SECTION.offsetTop - HOME_SECTION.offsetHeight) {
        removeLinkActive();
        document.getElementById('services_link').classList.add('link-active');
        document.getElementById('header').style.opacity = '0.5';
        document.getElementById('header').style.height = '50px';

    }
    if (window.scrollY >= PORTFOLIO_SECTION.offsetTop - HOME_SECTION.offsetHeight) {
        removeLinkActive();
        document.getElementById('portfolio_link').classList.add('link-active');
    }
    if (window.scrollY >= ABOUT_SECTION.offsetTop - HOME_SECTION.offsetHeight) {
        removeLinkActive();
        document.getElementById('about_link').classList.add('link-active');
    }
    if (window.scrollY >= CONTACTS_SECTION.offsetTop - HOME_SECTION.offsetHeight) {
        removeLinkActive();
        document.getElementById('contact_link').classList.add('link-active');
    }
    if (window.scrollY + 1 >= document.documentElement.scrollHeight - document.documentElement.clientHeight) {
        removeLinkActive();
        document.getElementById('contact_link').classList.add('link-active');
    }

});

// slider
let items = document.querySelectorAll('.item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('active', direction);
    })
}

function showItem(direction) {
    items[currentItem].classList.add('next', direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled = true;
    })
}

function previousItem(n) {
    hideItem('to-right');
    changeCurrentItem(n - 1);
    showItem('from-left');
}

function nextItem(n) {
    hideItem('to-left');
    changeCurrentItem(n + 1);
    showItem('from-right');
}
document.querySelector('.arrow-right').addEventListener('click', function() {
    if (isEnabled) {
        previousItem(currentItem)
    }
});
document.querySelector('.arrow-left').addEventListener('click', function() {
    if (isEnabled) {
        nextItem(currentItem)
    }
});

// lock phone
const PHONE_WALLPAPER_ONE = document.getElementById('slider__img-one');
const PHONE_WALLPAPER_TWO = document.getElementById('slider__img-two');
const delWallpaperOne = () => {
    if (PHONE_WALLPAPER_ONE.classList.contains('none'))
        PHONE_WALLPAPER_ONE.classList.remove('none')
    else
        PHONE_WALLPAPER_ONE.classList.add('none');
}
const delWallpaperTwo = () => {
    if (PHONE_WALLPAPER_TWO.classList.contains('none'))
        PHONE_WALLPAPER_TWO.classList.remove('none')
    else
        PHONE_WALLPAPER_TWO.classList.add('none');
}

// portfolio random image
const PORTFOLIO_BUTTONS = document.getElementById('portfolio__buttons');
const PORTFOLIO_IMAGES = document.getElementById('portfolio__images');

const randomImages = (event) => {
    let target = event.target;
    if (target.tagName == 'SPAN') {

        PORTFOLIO_BUTTONS.querySelectorAll('span').forEach(item => {
            item.classList.remove('button-active');
        });
        target.classList.add('button-active');

        let srcArray = [];
        let counter = 0;
        PORTFOLIO_IMAGES.querySelectorAll('img').forEach(item => {
            srcArray.push(item.src);
            counter++;
            item.src = '';
        })

        function random(size) {
            let array = new Array(size).fill(0).map((item, i) => i);
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * i);
                let tmp = array[i];
                array[i] = array[j];
                array[j] = tmp;
            }
            return array;
        }
        let randArray = random(counter);
        console.log(randArray)
        PORTFOLIO_IMAGES.querySelectorAll('img').forEach((item, index) => {
            item.src = srcArray[randArray[index]];
            item.style.boxShadow = "none";
        })
    }
}

// portfolio active image
PORTFOLIO_IMAGES.addEventListener('click', event => {
    let target = event.target;
    if (target.tagName == 'IMG') {
        PORTFOLIO_IMAGES.querySelectorAll('img').forEach(item => {
            item.style.boxShadow = "none";
        });
        event.target.style.boxShadow = "0px 0px 0px 5px #F06C64";
    }

})

//modal window
const MODAL_WINDOW = document.getElementById('modal-window');
const MODAL_BUTTON = document.getElementById('modal-button');
const MODAL_SUBMIT = document.getElementById('modal-submit');

const FORM = document.getElementById('form');
const NAME_INPUT = document.getElementById('name');
const EMAIL_INPUT = document.getElementById('email');
const TEXT_INPUT = document.getElementById('text');
const DESCR_INPUT = document.getElementById('descr');

const closeModal = (event) => {
    if (event.target.tagName == "SECTION" || event.target.tagName == "BUTTON") {
        MODAL_WINDOW.classList.add('display-none');
        MODAL_SUBMIT.querySelectorAll(".added").forEach(item => {
            MODAL_SUBMIT.removeChild(item);
        })
        FORM.reset();
    }
}

FORM.addEventListener('submit', event => {
    if (event.keyCode == 13) {
        event.preventDefault();
    }
    event.preventDefault();
    if (NAME_INPUT.checkValidity() && EMAIL_INPUT.checkValidity()) {
        MODAL_SUBMIT.innerHTML += "<div class='added'>The letter was sent</div>";
        if (TEXT_INPUT.value.length == 0)
            MODAL_SUBMIT.innerHTML += "<div class='added'>Without subject</div>";
        else {
            let VALUE = TEXT_INPUT.value.split('').map(item => { if (item == '<') item = '&lt;'; if (item == '>') item = '&gt;'; return item }).join('');
            MODAL_SUBMIT.innerHTML += `<div class='added'>Subject:<span class='bold'> ${VALUE} </span></div>`;
        }
        if (DESCR_INPUT.value.length == 0)
            MODAL_SUBMIT.innerHTML += "<div class='added'>Without description</div>";
        else {
            let VALUE = DESCR_INPUT.value.split('').map(item => { if (item == '<') item = '&lt;'; if (item == '>') item = '&gt;'; return item }).join('');
            MODAL_SUBMIT.innerHTML += `<div class='added'>Description:<span class='bold'> ${VALUE} </span></div>`;
        }
        MODAL_SUBMIT.innerHTML += `<div style="text-align: center;" class="modal-button added" id='modal-button'><button>ok</button></div>`;
        MODAL_WINDOW.classList.remove('display-none');
    }
})

FORM.addEventListener('keydown', function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
    }
});

