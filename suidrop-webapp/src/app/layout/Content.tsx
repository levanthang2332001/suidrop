import React, { useEffect } from 'react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';

export default function Content() {

  useEffect(() => {
    // This code only runs on the client
    let splitText = SplitText.create("#headline", { type: "chars"});
    let tl = gsap.timeline({ repeat: 1});
    gsap.set("#headline", { opacity: 1 });
    tl.from(splitText.chars, {
        duration: 1,
        y: 100,
        rotation: 90,
        opacity: 0,
        ease: "elastic",
        stagger: 0.03
    });
  }, []);
  
  return (
    <main className="flex flex-col items-center justify-center flex-1 px-4 pt-10 pb-24 relative">
        <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 mb-7 shadow-sm border border-[#f3ede7]">
          <span className="bg-[#f5eee7] text-[#b8865b] text-xs font-semibold px-2 py-0.5 rounded">New</span>
          <span className="text-sm font-medium text-[#2d2217]">AI-Powered Optimization</span>
        </div>
        <h1 id='headline' className="text-5xl md:text-6xl font-bold text-center text-[#18181b] mb-5 leading-tight tracking-tight">
          Optimize Your Website<br />with AI Support
        </h1>
        <p className="text-lg md:text-xl text-[#6b5b4a] text-center max-w-2xl mb-10 font-medium">
          Meet our AI-powered SaaS solution to lighten your workload, increase efficiency and make more accurate decisions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-7">
          <a href="#" className="px-8 py-3 rounded-lg bg-[#b8865b] text-white font-semibold text-lg shadow hover:bg-[#a97a4a] transition">Start Free Trial</a>
          <a href="#" className="px-8 py-3 rounded-lg bg-white border border-[#e5e1dc] text-[#2d2217] font-semibold text-lg shadow hover:bg-[#f5eee7] transition">Book a Demo</a>
        </div>
        <div className="absolute left-1/2 -bottom-24 -translate-x-1/2 w-[90vw] h-60 pointer-events-none z-[-1]">
          <div className="w-full h-full rounded-full bg-gradient-to-t from-[#e7d3be]/60 to-transparent blur-2xl opacity-70"></div>
        </div>
      </main>
  )
}
