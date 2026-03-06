"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Code, Cpu, Cloud, Gamepad2, Smartphone, PenTool, Wifi, Database, Briefcase } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const slides = [
    {
        id: 1,
        domain: "Cloud & DevOps",
        icon: Cloud,
        image: "/assets/cloud_devops_cinematics.png",
        description: "Mastering scalable infrastructure, containerization, and continuous deployment pipelines.",
    },
    {
        id: 2,
        domain: "Web Development",
        icon: Code,
        image: "/assets/web_dev_cinematics.png",
        description: "Crafting futuristic, high-performance web experiences using next-gen frameworks.",
    },
    {
        id: 3,
        domain: "Game Development",
        icon: Gamepad2,
        image: "/assets/game_dev_cinematics.png",
        description: "Designing immersive 3D worlds and interactive gameplay mechanics.",
    },
    {
        id: 4,
        domain: "Android Dev & Animation",
        icon: Smartphone,
        image: "/assets/android_dev_cinematics.png",
        description: "Building robust mobile applications and stunning motion graphics.",
    },
    {
        id: 5,
        domain: "ML & Data Science",
        icon: Cpu,
        image: "/assets/ml_ds_cinematics.png",
        description: "Harnessing the power of AI to analyze data and predict the future.",
    },
    {
        id: 6,
        domain: "Graphic Design",
        icon: PenTool,
        image: "/assets/graphic_design_cinematics.png",
        description: "Visualizing ideas through compelling branding and artistic expression.",
    },
    {
        id: 7,
        domain: "Internet of Things",
        icon: Wifi,
        image: "/assets/iot_cinematics.png",
        description: "Connecting the physical and digital worlds through smart embedded systems.",
    },
    {
        id: 8,
        domain: "DSA",
        icon: Database,
        image: "/assets/dsa_cinematics.png",
        description: "Optimizing logic and solving complex algorithmic challenges.",
    },
    {
        id: 9,
        domain: "Corporate Relations",
        icon: Briefcase,
        image: "/assets/corporate_cinematics.png",
        description: "Bridging the gap between the student community and the professional industry.",
    },
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center bg-deep-black pt-20">
            {/* Background Slider */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={slides[currentSlide].id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                >
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/20 to-black/40 z-20" />
                    <Image
                        src={slides[currentSlide].image}
                        alt={slides[currentSlide].domain}
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="relative z-30 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center md:items-end justify-between h-full pb-24 md:pb-32 pt-32">
                <div className="max-w-4xl flex flex-col justify-center h-full md:h-auto">

                    {/* Static Title (No Animation on Slide Change) */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-none font-heading"
                    >
                        <span className="block mb-2">IGNITE IDEAS</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-red via-red-500 to-neon-red bg-[length:200%_auto] animate-text">
                            INSPIRE TOMORROW
                        </span>
                    </motion.h1>

                    {/* Dynamic Content (Domain & Description) */}
                    <div className="h-40 md:h-48 relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={slides[currentSlide].id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="absolute top-0 left-0"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    {/* Dynamic Icon Rendering */}
                                    <div
                                        className="w-10 h-10 rounded-full bg-neon-red/20 border border-neon-red/50 flex items-center justify-center text-neon-red"
                                    >
                                        {(() => {
                                            const Icon = slides[currentSlide].icon;
                                            return <Icon size={20} />;
                                        })()}
                                    </div>
                                    <span className="text-neon-red font-bold tracking-widest uppercase font-heading">
                                        {slides[currentSlide].domain}
                                    </span>
                                </div>

                                <p className="text-gray-300 text-lg md:text-2xl max-w-2xl leading-relaxed font-light border-l-4 border-neon-red pl-6">
                                    {slides[currentSlide].description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Static Button */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8"
                    >
                        <button
                            onClick={() => router.push("/signup")}
                            className="px-8 py-4 bg-neon-red text-white font-bold rounded text-lg shadow-[0_0_30px_rgba(255,0,51,0.4)] hover:shadow-[0_0_50px_rgba(255,0,51,0.6)] transition-all flex items-center gap-3 group font-heading hover:scale-105 active:scale-95"
                        >
                            BE PART OF THE ACTION
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>

                {/* Progress System */}
                <div className="hidden md:flex flex-col gap-3">
                    {slides.map((slide, index) => (
                        <div key={slide.id} className="flex items-center gap-4 group cursor-pointer" onClick={() => setCurrentSlide(index)}>
                            <span className={`text-sm font-bold transition-colors font-heading ${index === currentSlide ? "text-neon-red" : "text-gray-600 group-hover:text-gray-400"}`}>
                                0{index + 1}
                            </span>
                            <div
                                className={`h-[2px] transition-all duration-500 ${index === currentSlide ? "bg-neon-red w-16 shadow-[0_0_10px_#ff0033]" : "bg-white/10 w-8 group-hover:bg-white/30"
                                    }`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
