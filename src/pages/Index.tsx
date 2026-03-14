import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SparklesCursor from "@/components/SparklesCursor";
import FloatingParticles from "@/components/FloatingParticles";
import PinEntry from "@/components/PinEntry";
import HeroSection from "@/components/HeroSection";
import MessageCard from "@/components/MessageCard";
import ReasonsSection from "@/components/ReasonsSection";
import CakeSection from "@/components/CakeSection";
import GiftBoxes from "@/components/GiftBoxes";

const Index = () => {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="relative min-h-screen bg-background">
      <SparklesCursor />
      <AnimatePresence>
        {!unlocked && <PinEntry onSuccess={() => setUnlocked(true)} />}
      </AnimatePresence>

      {unlocked && (
        <>
          <FloatingParticles />
          <HeroSection showConfetti />
          <MessageCard />
          <CakeSection />
          <ReasonsSection />
          <GiftBoxes />
        </>
      )}
    </div>
  );
};

export default Index;
