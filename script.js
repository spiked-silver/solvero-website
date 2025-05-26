/* Initialize Lenis smooth scroll */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.1,
      wheelMultiplier: 1,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
});

/* Initialize GSAP animations */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined') {
    /* Register ScrollTrigger plugin */
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    } else {
      console.warn('ScrollTrigger plugin not found');
    }
    
    /* Animate hero elements on load */
    gsap.utils.toArray('.animate-fade-in-up').forEach((el) => {
      const animProps = {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      };
      
      // Add ScrollTrigger if available
      if (typeof ScrollTrigger !== 'undefined') {
        animProps.scrollTrigger = { trigger: el, start: "top 80%" };
      }
      
      gsap.fromTo(el, { opacity: 0, y: 20 }, animProps);
    });

    /* Scroll-triggered reveals for sections */
    gsap.utils.toArray('section').forEach((section) => {
      const animProps = {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      };
      
      // Add ScrollTrigger if available
      if (typeof ScrollTrigger !== 'undefined') {
        animProps.scrollTrigger = {
          trigger: section,
          start: "top 80%",
        };
      }
      
      gsap.from(section, {
        opacity: 0,
        y: 50,
        ...animProps
      });
    });

    /* Interactive service cards hover effect */
    gsap.utils.toArray('.service-card').forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { scale: 1.05, duration: 0.3, ease: "power2.out" });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out" });
      });
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  /* Optional: subtle cursor effect */
  document.addEventListener('mousemove', (e) => {
    if (typeof gsap !== 'undefined') {
      gsap.to('body', {
        cursor: 'circle',
        duration: 0.2,
        ease: 'power2.out'
      });
    }
  });

  /* Parallax background effect */
  window.addEventListener('scroll', () => {
    document.querySelectorAll('.parallax').forEach(el => {
      const speed = el.getAttribute('data-speed') || 0.5;
      const yPos = -(window.scrollY * speed);
      el.style.backgroundPosition = `center ${yPos}px`;
    });
  });

  /* Initialize Lottie animations (if any) */
  if (typeof lottie !== 'undefined') {
    document.querySelectorAll('.lottie-animation').forEach(container => {
      const path = container.getAttribute('data-lottie');
      lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: path
      });
    });
  }

  /* Accessibility: focus outlines for keyboard users */
  document.addEventListener('keydown', function(e) {
    if(e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
    }
  });
});