import { motion } from "framer-motion";

export default function CircleAnimationGroup() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-background">
      <div className="space-y-8 text-center">
        {/* Logo placeholder - can be replaced with your actual logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="relative w-20 h-20 mx-auto"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-full bg-primary/20"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.2,
            }}
            className="absolute inset-2 rounded-full bg-primary/40"
          />
          <motion.div className="absolute inset-4 rounded-full bg-primary text-background/90 flex items-center justify-center">
            {/* <Cpu className="w-6 h-6 animate-pulse" /> */}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
