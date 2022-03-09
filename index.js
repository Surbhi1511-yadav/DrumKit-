var audio_volume = 0.6;

var image_url;
const api_call = () => {
    const URL = "https://api.unsplash.com/photos/random?query=drum"
    fetch(URL,{
        headers:{
            'Authorization' : 'Client-ID I4TyHO6RrxvIP4tbViMsG83DkDWUlpGDbO3TI1Fyx3k'
        }
    }).then(res=>res.json())
        .then(res => {
            image_url = res.urls.small
            change_background(image_url)
        })
         .catch(error => console.log(error))
}
api_call()

const change_background = (image_src) => {
    let container_style=document.getElementsByClassName('container')[0].style
    let bg_color = getComputedStyle(document.documentElement).getPropertyValue("--background_low")

    container_style.background = `linear-gradient(300deg,${bg_color},${bg_color}),url(${image_src})`
    container_style.backgroundSize='cover'
    container_style.backgroundPosition='center'

}

// to do select all the drum elements and add event listener
// add animation when a button is clicked
//play music()
const animate = (key) => {
    const currentKey = document.querySelector(`.${key}`)
    currentKey.classList.add('pressed')
    setTimeout(() => {
        currentKey.classList.remove('pressed')
    }, 250)
}

const playMusic = (path) =>{
    const audio = new Audio(path);
    audio.volume = audio_volume;
    audio.play();
}

document.addEventListener("keypress", (event) => {
    const triggeredKey = event.key;
    makeSound(triggeredKey)
    animate(triggeredKey)
})

//theme 1
const theme_1__background = "#091921";
const theme_1__background_low = "rgba(9,25,33,0.8)";
const theme_1__text = "#00fff1";

//theme 2
const theme_2__background = "#f7c340";
const theme_2__background_low = "rgba(247,195,64,0.85)";
const theme_2__text = "#2d2d2d";

const change_theme = (theme) => {
    let root = document.documentElement
    if(theme === "theme_1"){
        root.style.setProperty('--background', theme_1__background)
        root.style.setProperty('--background_low', theme_1__background_low)
        root.style.setProperty('--text',theme_1__text)
    }
    else{
        root.style.setProperty('--background',theme_2__background)
        root.style.setProperty('--background_low', theme_2__background_low)
        root.style.setProperty('--text', theme_2__text)
    }
}

var current_theme = "theme_1"
const theme_changer = document.getElementById("util__button-theme")
theme_changer.addEventListener("click",() => {
    theme_changer.classList.add("change_theme__pressed")
    setTimeout(() => {
        theme_changer.classList.remove("change_theme__pressed")
    },200)
    if(current_theme == "theme_1"){
        change_theme("theme_2")
        current_theme = "theme_2"
    }
    else{
        change_theme("theme_1")
        current_theme = "theme_1"
    }
})

var auto_music_id;
var auto_music_on = false;
const start_auto_music = () => {
    const letters = ["w","a","s","d","j","k","l"]

    auto_music_id = setInterval(() => {
        const current_key = letters[Math.floor(Math.random()* letters.length)]
        makeSound(current_key)
        animate(current_key)
    },200)
}

const auto_music_button = document.getElementById("util_button-auto")
auto_music_button.addEventListener("click",() => {
    if(auto_music_on){
        clearInterval(auto_music_id)
        auto_music_on = false
        auto_music_button.innerText = "start auto music"
        auto_music_button.classList.remove("auto_music_on")
    }
    else{
        start_auto_music()
        auto_music_on = true
        auto_music_button.innerText = "stop auto music"
        auto_music_button.classList.add("auto_music_on")
    }
})
const slider = document.getElementById("volume_slider")
slider.oninput = (event) => {
    audio_volume = event.target.value /100
}


const makeSound = (key) => {
    switch (key) {
        case "w":
            playMusic("sounds/sounds_sound-1.mp3");
            break;
        case "a":
            playMusic("sounds/sounds_sound-2.mp3");
            break;
        case "s":
            playMusic("sounds/sounds_sound-3.mp3");
            break;
        case "d":
            playMusic("sounds/sounds_sound-4.mp3");
            break;
        case "j":
            playMusic("sounds/sounds_sound-5.mp3");
            break;
        case "k":
            playMusic("sounds/sounds_sound-6.mp3");
            break;
        case "l":
            playMusic("sounds/sounds_sound-7.mp3");
            break;
        default:
            console.log("Hey, you pressed wrong button!!!");
    }
}
const handleDrumClick = (event) => {
    var innerHTML = event.target.innerHTML;
    // console.log(innerHTML);
    animate(innerHTML)
    makeSound(innerHTML)
}
var drums = document.querySelectorAll(".drum")
for (let i = 0; i < drums.length; i++) {
    drums[i].addEventListener("click", handleDrumClick)
}