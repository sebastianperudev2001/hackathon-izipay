"use client";

import React from "react";
import { SignupFormDemo } from "./ui/sign-up-form";
import { AuroraBackground } from "./ui/aurora-background";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <>
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4"
        >
          <SignupFormDemo />
        </motion.div>
      </AuroraBackground>
    </>
  );
};

export default Hero;
