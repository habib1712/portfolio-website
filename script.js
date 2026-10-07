// /* Spotify */

// const spotifyClientId = "b86caca573ff4f22b0fd1fc04b092f2b";
// const spotifyRedirectUri =
//     window.location.hostname === "127.0.0.1"
//         ? "http://127.0.0.1:5500/index.html"
//         : "https://shhabib.netlify.app/callback";

// const spotifyScope =
//     "user-read-currently-playing user-read-playback-state";

// async function connectSpotify() {

//     const codeVerifier = generateRandomString(64);

//     localStorage.setItem("spotify_code_verifier", codeVerifier);

//     const codeChallenge = await generateCodeChallenge(codeVerifier);

//     const params = new URLSearchParams({

//         client_id: spotifyClientId,

//         response_type: "code",

//         redirect_uri: spotifyRedirectUri,

//         code_challenge_method: "S256",

//         code_challenge: codeChallenge,

//         scope: spotifyScope

//     });

//     window.location.href =
//         "https://accounts.spotify.com/authorize?" +
//         params.toString();

// }

// function generateRandomString(length) {

//     const characters =
//         "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

//     let result = "";

//     const randomValues =
//         crypto.getRandomValues(
//             new Uint8Array(length)
//         );

//     for (let i = 0; i < length; i++) {

//         result +=
//             characters[
//                 randomValues[i] % characters.length
//             ];

//     }

//     return result;

// }

// async function generateCodeChallenge(codeVerifier) {

//     const data =
//         new TextEncoder().encode(codeVerifier);

//     const digest =
//         await crypto.subtle.digest(
//             "SHA-256",
//             data
//         );

//     return btoa(
//         String.fromCharCode(...new Uint8Array(digest))
//     )
//         .replace(/\+/g, "-")
//         .replace(/\//g, "_")
//         .replace(/=+$/, "");

// }

// document
//     .getElementById("spotifyLogin")
//     .addEventListener("click", connectSpotify);

// async function handleSpotifyCallback() {

//     const params =
//         new URLSearchParams(window.location.search);

//     const code =
//         params.get("code");

//     if (!code) {
//         return;
//     }

//     const codeVerifier =
//         localStorage.getItem("spotify_code_verifier");

//     if (!codeVerifier) {
//         console.error("Spotify code verifier not found.");
//         return;
//     }

//     const body =
//         new URLSearchParams({

//             client_id: spotifyClientId,

//             grant_type: "authorization_code",

//             code: code,

//             redirect_uri: spotifyRedirectUri,

//             code_verifier: codeVerifier

//         });

//     const response =
//         await fetch(
//             "https://accounts.spotify.com/api/token",
//             {
//                 method: "POST",

//                 headers: {
//                     "Content-Type":
//                         "application/x-www-form-urlencoded"
//                 },

//                 body: body
//             }
//         );

//     const data =
//         await response.json();

//     if (!response.ok) {

//         console.error(
//             "Spotify token error:",
//             data
//         );

//         return;
//     }

//     localStorage.setItem(
//         "spotify_access_token",
//         data.access_token
//     );

//     localStorage.setItem(
//         "spotify_token_expires",
//         Date.now() + (data.expires_in * 1000)
//     );

//     localStorage.removeItem(
//         "spotify_code_verifier"
//     );

//     window.history.replaceState(
//         {},
//         document.title,
//         window.location.pathname
//     );

//     console.log("Spotify connected!");

// getCurrentlyPlaying();

// }

// handleSpotifyCallback();

// async function getCurrentlyPlaying() {

//     const accessToken =
//         localStorage.getItem("spotify_access_token");

//     if (!accessToken) {
//         return;
//     }

//     const response =
//         await fetch(
//             "https://api.spotify.com/v1/me/player/currently-playing",
//             {
//                 headers: {
//                     Authorization:
//                         `Bearer ${accessToken}`
//                 }
//             }
//         );

//     if (response.status === 204) {

//         document.getElementById("songName").textContent =
//             "Nothing playing";

//         document.getElementById("artistName").textContent =
//             "";

//         return;
//     }

//     if (!response.ok) {

//         console.error(
//             "Spotify currently playing error:",
//             response.status
//         );

//         return;
//     }

//     const data =
//         await response.json();

//     if (!data || !data.item) {

//         document.getElementById("songName").textContent =
//             "Nothing playing";

//         document.getElementById("artistName").textContent =
//             "";

//         return;
//     }

//     document.getElementById("songName").textContent =
//         data.item.name;

//     document.getElementById("artistName").textContent =
//         data.item.artists
//             .map(artist => artist.name)
//             .join(", ");

// }

// getCurrentlyPlaying();

/* Parallax */

window.addEventListener("scroll", () => {

    const scrolled = window.scrollY;

    document.querySelectorAll(".parallax-layer").forEach(layer => {

        const speed = parseFloat(layer.dataset.speed);

        layer.style.transform =
            `translateY(${-scrolled * speed}px)`;

    });

});


/* Dark mode */

const themeToggle = document.getElementById("themeToggle");

const parallaxLayers =
    document.querySelectorAll(".parallax-layer");

let darkMode = false;

themeToggle.addEventListener("click", function() {

    if (darkMode === false) {

        parallaxLayers[0].src = "asset/parallax/nightsky.png";
        parallaxLayers[1].src = "asset/parallax/nighthill.png";
        parallaxLayers[2].src = "asset/parallax/nightmountain.png";
        parallaxLayers[3].src = "asset/parallax/nightcliff.png";

        document.body.classList.add("dark-mode");

        darkMode = true;

    } else {

        parallaxLayers[0].src = "asset/parallax/sky.png";
        parallaxLayers[1].src = "asset/parallax/hilly.png";
        parallaxLayers[2].src = "asset/parallax/mountains.png";
        parallaxLayers[3].src = "asset/parallax/cliffs.png";

        document.body.classList.remove("dark-mode");

        darkMode = false;

    }

});


/* Project information */

const projectInfo = {

    project1: {

        title: "Automated Inventory System",

        tool: "POWERAPPS - POWER AUTOMATE - EXCEL",

        description:
            "An inventory management system built with PowerApps, Power Automate and Excel. <br><br>" +

            "It tracks stock levels in real time, sends alerts when items run low and calculates expiry dates automatically. " +

            "The system applies discounts the day before expiry, reverts prices after the discount period and records all purchase activity. " +

            "<br>It also simulates real-time orders to create a more dynamic and realistic inventory flow.",

        media: {

            type: "slideshow",

            slides: [

                {
                    image: "asset/project assets/PP Invmanagement/workflow1.png",
                    title: "Workflow Overview"
                },

                {
                    image: "asset/project assets/PP Invmanagement/workflow2.png",
                    title: "Expiry Date Calculation"
                },

                {
                    image: "asset/project assets/PP Invmanagement/workflow3.png",
                    title: "Low Stock Alert"
                },

                {
                    image: "asset/project assets/PP Invmanagement/workflow4.png",
                    title: "Expiry Tracking"
                },

                {
                    image: "asset/project assets/PP Invmanagement/workflow5.png",
                    title: "Expiry Tracking"
                },

                {
                    image: "asset/project assets/PP Invmanagement/workflow6.png",
                    title: "Discount"
                },

                {
                    image: "asset/project assets/PP Invmanagement/workflow7.png",
                    title: "Price Revert"
                },

                {
                    image: "asset/project assets/PP Invmanagement/workflow8.png",
                    title: "Purchase Logging"
                }

            ]

        }

    },

    project2: {

        title: "VR Therapeutic Room",

        tool: "Unity - C# - XR Toolkit",

        description:
            "A VR therapeutic project built in Unity. It creates calming environments like beaches and forests, along with fear-based scenarios such as heights, darkness and spiders. <br><br>" +

            "It includes interactive features like lighting controls and non-violent mechanics that give users comfort and control, helping them gradually face and manage phobias in a safe and immersive space.",

        media: {

            type: "slideshow",

            slides:[

                {
                    image: "asset/project assets/vrTherapy/UnMenu.png",
                    title: "UI"
                },
                {
                    image: "asset/project assets/vrTherapy/Unroom.png",
                    title: "Main room"
                },
                {
                    image: "asset/project assets/vrTherapy/Unbeach.png",
                    title: "Beach"
                },
                {
                    image: "asset/project assets/vrTherapy/UnForest.png",
                    title: "Forest"
                },
                {
                    image: "asset/project assets/vrTherapy/UnCities.jpg",
                    title: "height phobia"
                },
                {
                    image: "asset/project assets/vrTherapy/Uncaves.jpg",
                    title: "darkness phobia"
                },
                {
                    image: "asset/project assets/vrTherapy/Unspi.jpg",
                    title: "Spider phobia"
                }
            

            ]

        }

    },

    project3: {

        title: "RPG Adventure Game",

        tool: "C#",

        description:
            "A text-based RPG game made in C#.<br><br>" +

            "Players follow a narrative adventure story featuring turn-based combat, where they can fight enemies and use items and abilities from their inventory to play strategically. " +

            "Choices made along the way affect how the story unfolds. <br>" +

            "The game runs in the terminal and delivers a classic, simple RPG experience.",
            
            

        media: {

            type: "slideshow",

        slides: [

                {
                    image: "asset/project assets/rpg/rpg1.png",
                },
                {
                    image: "asset/project assets/rpg/rpg2.png",
                },
{
                    image: "asset/project assets/rpg/rpg3.png",
                }


        ]

        }

    },

    project4: {

        title: "Portfolio Website",

        tool: "HTML - CSS - JavaScript",

        description:
            "Personal portfolio website developed using HTML, CSS and JavaScript. <br><br>" +

            "It shares a bit about me, my skills, my projects and how to get in touch. " +

            "The site consists of interactive elements, small features such as dark mode and a unique design to my liking. As you can tell, lots of purple! ",

        media: {

            type: "image",

            source: "asset/project assets/portfolio_page.png"

        }

    },

    project5: {

        title: "Example Project",

        tool: "Python - Flask - SQL",

        description:
            "Example project description.",

        media: {

            type: "image",

            source: "asset/project assets/example.png"

        }

    }

};


/* Current project */

let currentProject = null;

let currentSlide = 0;


/* Open project */

function Open(projectId) {

    const modal = document.getElementById("Modal");

    const title = document.getElementById("modalTitle");

    const tool = document.getElementById("modalTool");

    const description = document.getElementById("modalDescription");

    const project = projectInfo[projectId];


    /* Check project */

    if (!project) {

        console.error("Project not found:", projectId);

        return;

    }


    currentProject = project;

    currentSlide = 0;


    title.textContent = project.title;

    tool.textContent = project.tool || "";

    description.innerHTML = project.description || "";


    hideAllMedia();


    /* Show media */

    if (project.media.type === "slideshow") {

        showSlideshow(project);

    } else if (project.media.type === "image") {

        showImage(project);

    } else if (project.media.type === "video") {

        showVideo(project);

    } else if (project.media.type === "youtube") {

        showYoutube(project);

    } else if (project.media.type === "none") {

        /* Nothing */

    }


    document.getElementById("Modal").style.display = "block";

}


/* Hide media */

function hideAllMedia() {

    document.querySelectorAll(".media-option").forEach(media => {

        media.style.display = "none";

    });


    const video = document.getElementById("projectVideo");

    if (video) {

        video.pause();

        video.currentTime = 0;

    }

}


/* Show image */

function showImage(project) {

    const container = document.getElementById("imageMedia");

    const image = document.getElementById("projectImage");


    image.src = project.media.source;

    image.alt = project.title;


    image.onclick = function () {

        openSingleImageLightbox();

    };


    container.style.display = "block";

}


function openSingleImageLightbox() {

    const lightbox =
        document.getElementById("imageLightbox");

    const image =
        document.getElementById("lightboxImage");

    const title =
        document.getElementById("lightboxTitle");

    const counter =
        document.getElementById("lightboxCounter");

    const previous =
        document.querySelector(".lightbox-previous");

    const next =
        document.querySelector(".lightbox-next");


    image.src = currentProject.media.source;

    image.alt = currentProject.title;

    title.textContent = currentProject.title;


    previous.style.display = "none";

    next.style.display = "none";

    counter.style.display = "none";


    lightbox.style.display = "flex";

}


/* Show video */

function showVideo(project) {

    const container = document.getElementById("videoMedia");

    const video = document.getElementById("projectVideo");

    const source = document.getElementById("projectVideoSource");


    if (!project.media.source) {

        return;

    }


    source.src = project.media.source;

    video.load();

    container.style.display = "block";

}


/* Show YouTube */

function showYoutube(project) {

    const container =
        document.getElementById("youtubeMedia");

    const youtube =
        document.getElementById("projectYoutube");


    youtube.src =
        project.media.source;

    container.style.display =
        "block";

}


/* Show slideshow */

function showSlideshow(project) {

    const container =
        document.getElementById("slideshowMedia");


    if (!project.media.slides ||
        project.media.slides.length === 0) {

        return;

    }


    currentSlide = 0;

    showSlide(currentSlide);

    container.style.display = "block";

}


/* Show slide */

function showSlide(index) {

    if (!currentProject ||
        !currentProject.media ||
        currentProject.media.type !== "slideshow") {

        return;

    }


    const slides = currentProject.media.slides;


    if (!slides || slides.length === 0) {

        return;

    }


    const image =
        document.getElementById("slideImage");

    const title =
        document.getElementById("slideTitle");

    const counter =
        document.getElementById("slideCounter");


    /* Keep slide in range */

    if (index >= slides.length) {

        index = 0;

    }

    if (index < 0) {

        index = slides.length - 1;

    }


    currentSlide = index;


    image.src =
        slides[currentSlide].image;

    image.alt =
        currentProject.title;


    title.textContent =
        slides[currentSlide].title;


    counter.textContent =
        `${currentSlide + 1} / ${slides.length}`;


    image.onclick = function () {

        openLightbox();

    };

}


/* Change slide */

function changeSlide(direction) {

    if (!currentProject ||
        !currentProject.media ||
        currentProject.media.type !== "slideshow") {

        return;

    }


    const slides =
        currentProject.media.slides;


    currentSlide += direction;


    if (currentSlide >= slides.length) {

        currentSlide = 0;

    }


    if (currentSlide < 0) {

        currentSlide = slides.length - 1;

    }


    showSlide(currentSlide);

}


/* Open fullscreen */

function openLightbox() {

    if (!currentProject ||
        !currentProject.media ||
        currentProject.media.type !== "slideshow") {

        return;

    }


    const lightbox =
        document.getElementById("imageLightbox");


    lightbox.style.display = "flex";

    updateLightbox();

}


/* Update fullscreen */

function updateLightbox() {

    if (!currentProject ||
        !currentProject.media ||
        currentProject.media.type !== "slideshow") {

        return;

    }


    const slides =
        currentProject.media.slides;

    const image =
        document.getElementById("lightboxImage");

    const title =
        document.getElementById("lightboxTitle");

    const counter =
        document.getElementById("lightboxCounter");


    image.src =
        slides[currentSlide].image;


    title.textContent =
        slides[currentSlide].title;


    counter.textContent =
        `${currentSlide + 1} / ${slides.length}`;

}


/* Change fullscreen slide */

function changeLightboxSlide(direction) {

    if (!currentProject ||
        !currentProject.media ||
        currentProject.media.type !== "slideshow") {

        return;

    }


    const slides =
        currentProject.media.slides;


    currentSlide += direction;


    if (currentSlide >= slides.length) {

        currentSlide = 0;

    }


    if (currentSlide < 0) {

        currentSlide = slides.length - 1;

    }


    updateLightbox();

    showSlide(currentSlide);

}


/* Close fullscreen */

function closeLightbox() {

    document.getElementById("imageLightbox").style.display =
        "none";

}


document
    .getElementById("imageLightbox")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeLightbox();

        }

    });


/* Close project */

function Close() {

    const modal =
        document.getElementById("Modal");

    modal.style.display = "none";


    const video =
        document.getElementById("projectVideo");

    if (video) {

        video.pause();

    }

}


/* Click outside modal */

window.addEventListener("click", function(event) {

    const modal =
        document.getElementById("Modal");


    if (event.target === modal) {

        Close();

    }

});


/* Project scrolling */

function scrollProjects(direction) {

    const container =
        document.querySelector(".projects-container");


    if (!container) {

        return;

    }


    const scrollAmount =
        container.offsetWidth;


    container.scrollBy({

        left: direction * scrollAmount,

        behavior: "smooth"

    });

}