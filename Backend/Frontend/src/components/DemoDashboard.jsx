import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Clock, TrendingUp, Award, Calendar, ChevronRight, BarChart } from 'lucide-react';

const DemoDashboard = () => {
    // "Live" counters
    const [pageCount, setPageCount] = useState(0);
    const [streak, setStreak] = useState(0);

    // Reset counters when in view
    const triggerCounters = (inView) => {
        if (inView) {
            setPageCount(0);
            setStreak(0);

            const interval = setInterval(() => {
                setPageCount(prev => (prev < 6200 ? prev + 120 : 6200));
                setStreak(prev => (prev < 18 ? prev + 1 : 18));
            }, 50);
            return () => clearInterval(interval);
        }
    };
    // Note: Since framer-motion handles the view detection for the parent, passing a callback might be complex without refactoring.
    // Instead, let's keep it simple: run on mount but since parent unmounts/remounts on scroll due to key/viewport? No, viewport just animates props.
    // To reset counters on scroll, we need useInView hook or similar.
    // simpler approach: The user just asked for "effects", usually meaning the entrance animations.
    // Changing viewport.once to false re-triggers framer motion variants.
    // If they want the NUMBERS to count up again, we need the `onViewportEnter` callback.


    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.5 // Delay slightly to let user settle
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 50 } }
    };

    // Placeholder images for the "Books Read" section
    const books = [
        '/images/placeholder_1.png',
        '/images/placeholder_2.png',
        '/images/placeholder_3.png',
        '/images/1984.jpg',
        '/images/alchemist.jpg'
    ];

    return (
        <section className="py-20 bg-body overflow-hidden relative">
            {/* Background blob decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-orange-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-green-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="container relative z-10">
                <div className="text-center mb-12">
                    <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm mb-2 block">Premium Experience</span>
                    <h2 className="text-4xl font-bold text-main mb-4">Track Your Reading Journey</h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Join thousands of readers who track their progress, build streaks, and discover new favorites.
                    </p>
                </div>

                {/* BENTO GRID */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, margin: "-50px" }}
                    onViewportEnter={() => {
                        // Reset and animate counters
                        setPageCount(0);
                        setStreak(0);
                        let p = 0;
                        let s = 0;
                        const interval = setInterval(() => {
                            p = p < 6200 ? p + 120 : 6200;
                            s = s < 18 ? s + 1 : 18;
                            setPageCount(p);
                            setStreak(s);
                            if (p >= 6200 && s >= 18) clearInterval(interval);
                        }, 50);
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
                >
                    {/* 1. Stats Green Box (Span 2 cols) - Now First */}
                    <motion.div variants={item} className="md:col-span-2 bg-[#dcfce7] rounded-3xl p-8 flex flex-col justify-between hover:shadow-lg transition-shadow duration-500">
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-2xl font-bold text-green-900">2025 Stats</h3>
                            <BarChart className="text-green-600" size={32} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <motion.div
                                className="bg-white/50 backdrop-blur-sm rounded-2xl p-6"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="text-5xl font-bold text-green-700 mb-2">{streak}</div>
                                <div className="text-green-800 font-medium flex items-center gap-2">
                                    <motion.div
                                        animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <TrendingUp size={18} className="text-orange-500 fill-orange-500" />
                                    </motion.div>
                                    Day Streak
                                </div>
                            </motion.div>
                            <motion.div
                                className="bg-white/50 backdrop-blur-sm rounded-2xl p-6"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="text-5xl font-bold text-green-700 mb-2">{(pageCount / 1000).toFixed(1)}k</div>
                                <div className="text-green-800 font-medium flex items-center gap-2">
                                    <Award size={18} className="text-yellow-600" /> Pages Read
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* 2. Currently Reading (Span 1 col) */}
                    <motion.div variants={item} className="md:col-span-1 bg-white rounded-3xl p-6 border border-border shadow-sm hover:shadow-lg transition-shadow duration-500">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold text-main">Current Read</h4>
                            <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-full animate-pulse">42%</span>
                        </div>
                        <img src="/images/Deep_Work.jpg" alt="Current" className="w-20 h-32 object-cover rounded-lg shadow-md mb-4 mx-auto rotate-1 hover:rotate-0 transition-transform" />
                        <h5 className="font-bold text-center text-main text-sm mb-1">Deep Work</h5>
                        <p className="text-xs text-gray-500 text-center mb-3">Cal Newport</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "42%" }}
                                transition={{ duration: 1.5, delay: 1 }}
                                animate={{ boxShadow: ["0 0 0px orange", "0 0 10px orange", "0 0 0px orange"] }}
                                className="bg-orange-500 h-2 rounded-full"
                            ></motion.div>
                        </div>
                    </motion.div>

                    {/* 3. Quick View (Span 1 col) */}
                    <motion.div variants={item} className="md:col-span-1 bg-[#ede9fe] rounded-3xl p-6 hover:shadow-lg transition-shadow duration-500">
                        <h4 className="font-bold text-purple-900 mb-4">Quick View</h4>
                        <ul className="space-y-4">
                            <li className="flex justify-between items-center text-sm">
                                <span className="text-purple-700">Avg Speed</span>
                                <span className="font-bold bg-white text-purple-900 px-2 py-1 rounded-md">42 pg/hr</span>
                            </li>
                            <li className="flex justify-between items-center text-sm">
                                <span className="text-purple-700">Longest Session</span>
                                <span className="font-bold bg-white text-purple-900 px-2 py-1 rounded-md">2.5 hrs</span>
                            </li>
                            <li className="flex justify-between items-center text-sm">
                                <span className="text-purple-700">Top Genre</span>
                                <span className="font-bold bg-gray-900 text-white px-2 py-1 rounded-md">Sci-Fi</span>
                            </li>
                        </ul>
                    </motion.div>
                </motion.div>

                {/* CTA Overlay mostly for effect - optional based on design, keeping clean for now */}
            </div>
        </section>
    );
};

export default DemoDashboard;
