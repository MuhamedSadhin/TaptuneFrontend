// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import Lenis from "@studio-freight/lenis";
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// gsap.registerPlugin(ScrollTrigger);

// export default function useSmoothScroll() {
//   const location = useLocation();
//   console.log("Location :", location.pathname)

//   useEffect(() => {
//       const publicRoutes = [
//         "/",
//         "/about-us",
//         "/contact",
//         "/docs",
//         "/auth",
//         "/profile",
//       ];

//     if (publicRoutes.includes(location.pathname)) {
//       const lenis = new Lenis({
//         duration: 1,
//         easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//         smooth: true,
//       });

//       function raf(time) {
//         lenis.raf(time);
//         requestAnimationFrame(raf);
//       }
//       requestAnimationFrame(raf);

//       lenis.on("scroll", ScrollTrigger.update);
    

//       return () => {
//         lenis.destroy();
//       };
//     }
//   }, []);
// }






import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true, 
      smoothTouch: false, 
    });

    let frameId;

    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId); 
      lenis.destroy(); 
    };
  }, [enabled]);
}
