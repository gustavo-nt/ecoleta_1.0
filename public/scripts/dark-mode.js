// Dark Mode
const html = document.querySelector('html');
let check = JSON.parse(localStorage.getItem('darkMode'));
const toggle = document.querySelector('#page-home .content header div');

if(!check) {
    localStorage.setItem('darkMode', JSON.stringify({
        value: false
    }));

    check = JSON.parse(localStorage.getItem('darkMode'));
}

// Instantiates the Toggle component
if(toggle) {
    if(check.value) {
        var checkbox = new Toggle({value: true});
    } else {
        var checkbox = new Toggle();
    }
    
    toggle.appendChild(checkbox.getView());
}

// Stores the current theme in LocalStorage
if(checkbox) {
    checkbox.setOnUpdateValue(function(value) {
        if(localStorage.darkMode == null) {
            localStorage.setItem('darkMode', JSON.stringify({
                value: value
            }));
        } else {
            var check = JSON.parse(localStorage.getItem('darkMode'));
            check.value = value;
            localStorage.darkMode =  JSON.stringify(check)
        }
        dark(value);
    });
}

// Altered images
const images = {
    logo: document.querySelector('header img'),
    backHome: document.querySelector('body #page-home'),
    pencilTool: document.querySelectorAll('.edit a img')
}

const initialColors = {
    bg: window.getComputedStyle(html).getPropertyValue('--bg'),
    titleColor: window.getComputedStyle(html).getPropertyValue('--title-color'),
    primaryColor: window.getComputedStyle(html).getPropertyValue('--primary-color'), 
    darkColor: window.getComputedStyle(html).getPropertyValue('--dark-color'),
    form: window.getComputedStyle(html).getPropertyValue('--form'),
    input: window.getComputedStyle(html).getPropertyValue('--input'),
    span: window.getComputedStyle(html).getPropertyValue('--span'),
    liSelected: window.getComputedStyle(html).getPropertyValue('--li-selected'),
    bgResults: window.getComputedStyle(html).getPropertyValue('--bg-results'),
    textResults: window.getComputedStyle(html).getPropertyValue('--text-results')
}

const darkMode = {
    bg: 'rgba(24, 24, 28, 1)',
    titleColor: 'rgba(255, 255, 255, 1)',
    primaryColor: 'rgba(52, 203, 121, 1)',
    darkColor: 'rgba(255, 255, 255, 1)',
    form: 'rgba(49, 49, 49, 0.5)',
    input: 'rgba(245, 245, 245, 1)',
    span: 'rgba(0, 0, 0, 1)',
    liSelected: 'rgba(210, 239, 222, 1)',
    bgResults: 'rgba(24, 24, 28, 1)',
    textResults: 'rgba(255, 255, 255, 1)'
}

const transformKey = key => '--' + key.replace(/([A-Z])/, '-$1').toLowerCase();

function changeColors(colors) {
    Object.keys(colors).map(function(key) {
        html.style.setProperty(transformKey(key), colors[key]);
    });
};

// Function responsible for changing colors
dark(check.value);

// Setting the chosen theme and changing the images
function dark(value) {
    if(value) {
        changeColors(darkMode); 
        images.logo.src = './assets/dark_mode/logo-dark.svg';

        if(images.backHome) {
            images.backHome.style.backgroundImage ='url(./assets/dark_mode/home-background-dark.svg)';

        }
        images.pencilTool.forEach(value => {
            value.src = './assets/dark_mode/pencil-dark.svg'
        });
    } else {
        changeColors(initialColors);
        images.logo.src = './assets/logo.svg';
        
        if(images.backHome) {
            images.backHome.style.backgroundImage = 'url(./assets/home-background.svg)';
        }
        images.pencilTool.forEach(value => {
            value.src = './assets/pencil-tool.svg'
        });
    } 
}