import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import image from "../assets/spicial.jpg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const SpicialProducts = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#special-section",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from("#special-img", {
      opacity: 0,
      x: -100,
      duration: 1,
      ease: "power3.out",
    }).from(
      "#special-text",
      {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
      },
      "<0.2"
    );
  }, []);

  return (
    <section
      id="special-section"
      className="py-24 bg-white dark:bg-black overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div
            id="special-img"
            className="overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500"
          >
            <img
              src={image}
              alt="Special Product"
              className="w-full h-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Right - Text */}
          <div id="special-text" className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              🌟 Special Product
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Experience our handpicked special product of the season. Designed
              with passion and crafted to perfection — because you deserve the
              best.
            </p>

            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              From unique design to unbeatable comfort, this product will
              redefine your style and elevate your look.
            </p>

            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Discover more and be part of the trendsetters who appreciate
              premium quality and timeless aesthetics.
            </p>

            {/* CTA Button */}
            <Button className="mt-4 w-fit text-base px-6 py-3">
              <Link to="/products">Shop Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpicialProducts;
