import { useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useScrollAnimations() {
  useEffect(() => {
    gsap.from("section", {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: "section",
        start: "top 80%",
      },
      stagger: 0.2,
    });
  }, []);
}
