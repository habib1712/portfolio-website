window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    document.querySelectorAll('.parallax-layer').forEach(layer => {
        const speed = parseFloat(layer.dataset.speed);
        layer.style.transform = `translateY(${-scrolled * speed}px)`;
    });
});

function scrollProjects(direction) {
    const container = document.querySelector('.projects-container');
    const scrollAmount = container.offsetWidth; 
    container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}


function Open(projectId) {
    const modal = document.getElementById("Modal");
    const tool = document.getElementById("modalTool"); 
    const title = document.getElementById("modalTitle");
    const description = document.getElementById("modalDescription");

    const projectInfo = {
        project1: {
            title: "Automated Inventory System",
            tool: "POWERAPPS - POWER AUTOMATE - EXCEL",
            description: "An inventory management system built with PowerApps, Power Automate and Excel. <br><br>It tracks stock levels in real time, sends alerts when items run low and calculates expiry dates automatically. The system applies discounts the day before expiry, reverts prices after the discount period and records all purchase activity. <br> It also simulates real-time orders to create a more dynamic and realistic inventory flow."
        },
        project2: { 
            title: "VR Therapeutic Room",
            tool: "Unity - C# - XR Toolkit",
            description: "A VR therapeutic project built in Unity. It creates calming environments like beaches and forests, along with fear-based scenarios such as heights, darkness and spiders. <br><br> It Includes interactive features like lighting controls and non-violent mechanics that give users comfort and control, helping them gradually face and manage phobias in a safe and immersive space."
        },
        project3: {
            title: "RPG Adventure Game",
            tool: "C#",
            description: "A text-based RPG game made in C#.<br><br> The players follow a narrative adventure story that features turn-based combat, where they can fight enemies and use items and abilites from their inventory to play strategically. Choices made along the way affect how the story unfolds. <br> The game runs in the terminal and delivers a classic, simple RPG experience."
        },
        project4: {
            title: "Portfolio Website",
            tool: "HTML - CSS - JavaScript",
            description: "Personal portfolio website developed using HTML, CSS and JavaScript. <br><br> It shares a bit about me, my skills, my projects and how to get in touch. The site consists of some interactive elements and a unique design to my liking. As you can tell, lots of purple!"
        }
        ,project5: {
            title: "WIP",
            tool: "WIP",
            description: "WIP"
        }
        
    };

    title.textContent = projectInfo[projectId].title;
    tool.textContent = projectInfo[projectId].tool || "";
    description.innerHTML = projectInfo[projectId].description;

    modal.style.display = "block";
}

function Close() {
    document.getElementById("Modal").style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById("Modal");
    if (event.target === modal) {
        Close();
    }
}
