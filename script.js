const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim() {
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
    .to(".boundingelm", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 1.5,
        delay: -1.5,
        stagger: 0.1
    });
    tl.to(".boundingelm2", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 1.5,
        delay: -1,
    });
    tl.to(".subboundingeelm", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1.6,
        stagger: 0.1
    });

    tl.from("#herofooter", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        delay: -1.4,
        ease: Expo.easeInOut
    });
}

function circleMouseFollower(xscale, yscale) {
    document.querySelector("#minicricle").style.transform = `translate(${window.mouseX}px, ${window.mouseY}px) scale(${xscale}, ${yscale})`;
}

function cirlceMouseOval() {
    // Default scale values
    var xscale = 1;
    var yscale = 1;
    var xprev = 0;
    var yprev = 0;
    var timeout;

    // Track mouse position globally
    window.mouseX = 0;
    window.mouseY = 0;

    window.addEventListener("mousemove", function (details) {
        var xdiff = details.clientX - xprev;
        var ydiff = details.clientY - yprev;

        // Save current mouse position globally
        window.mouseX = details.clientX;
        window.mouseY = details.clientY;

        xprev = details.clientX;
        yprev = details.clientY;

        // Update xscale and yscale based on movement differences
        xscale = gsap.utils.clamp(0.8, 1.2, xdiff / 100);  // Adjust division factor to control scaling
        yscale = gsap.utils.clamp(0.8, 1.2, ydiff / 100);

        circleMouseFollower(xscale, yscale);

        // Clear previous timeout to reset the circle after movement stops
        clearTimeout(timeout);

        // Reset the shape to a perfect circle after 100ms of no movement
        timeout = setTimeout(function () {
            circleMouseFollower(1, 1);  // Reset to a circle
        }, 100);
    });

}

document.querySelectorAll(".elem").forEach(function (elem) {

    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mousemove", function (dets) {
        const img = elem.querySelector("img");
        const elemRect = elem.getBoundingClientRect();
        const imgWidth = img.offsetWidth;   // Get the width of the image
        const imgHeight = img.offsetHeight;  // Get the height of the image

        var diff = dets.clientY-elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        // Calculate mouse position relative to the element
        const mouseX = dets.clientX - elemRect.left; // X position relative to the element
        const mouseY = dets.clientY - elemRect.top;  // Y position relative to the element

        // Update image properties to follow the mouse
        gsap.to(img, {
            opacity: 10,
            ease: Power1,
            top: mouseY - imgHeight / 2, // Center the image under the cursor
            left: mouseX - imgWidth / 2,  // Center the image under the cursor
            rotate: gsap.utils.clamp(-20, 20, diffrot),  // Rotate image based on mouse movement
            duration: 0.3
        });
    });

    // Hide the image when the mouse leaves the element
    elem.addEventListener("mouseleave", function () {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,  // Hide the image when the mouse leaves
            duration: 0.3
        });
    });
});




   

    
  




// Wait for the DOM to be fully loaded before starting animations
window.addEventListener('DOMContentLoaded', function () {
    firstPageAnim();
    cirlceMouseOval();
});
