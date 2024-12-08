"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AOSInitializer: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
    AOS.refresh();
  }, []);
  return null;
};

export default AOSInitializer;
