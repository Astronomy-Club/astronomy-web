"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import HornAntennaImage from '../../../../public/horn.png';
import PlanetariumImage from '../../../../public/planetarium.png';
import rocketImage from '../../../../public/rocket.png';
import ObservatoryImage from '../../../../public/observatory.png';
import SatelliteTrackerImage from '../../../../public/satelite.jpg';
import CubeSatImage from '../../../../public/cubesat.png';
import star from '../../../../public/star.png';

//first
// import { initializeApp } from "firebase/app";
// import {getFirestore, collection , doc, setDoc, getDocs} from "firebase/firestore";
// import {Client, Storage} from "appwrite";
// import { firebaseConfig, appwrite_pid } from "@/app/config";

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const client = new Client();
// client.setEndpoint('https://cloud.appwrite.io/v1').setProject(appwrite_pid);
// const storage = new Storage(client);

// let projects = [];

// async function loadProjects(){
//     let counter = 1;
//     const snap = await getDocs(collection(db,"projects"));
//     snap.forEach((doc)=>{
//         const datap = doc.data();
//         counter++;
//         let imgf = false;
//         if(counter&1){
//             imgf=true;
//         }
//         const pimg = storage.getFilePreview('67840116003980398e18',`project-${counter-1}`);
//         const title = datap.title;
//         const des = datap.description;
//         const pobj = {
//             title:title,
//             image:pimg,
//             description:des,
//             imageFirst:imgf
//         }
//         projects.push(pobj);
//     });
// }
// loadProjects();


const projects = [
    {
        title: "Planetarium",
        image: PlanetariumImage,
        description: "The DIY Stargazing Setup by the Astronomy Club, IIT (BHU) Varanasi is a hands-on approach to exploring the night sky from the comfort of an indoor setting. Designed for students and astronomy enthusiasts, this portable planetarium recreates constellations and fundamental celestial patterns, making it easier to visualize and understand the cosmos. Whether used for education or personal curiosity, this interactive tool transforms learning into an engaging experience, bridging the gap between theoretical knowledge and real-world observation.",
        imageFirst: true
    },
    {
        title: "Horn Antenna",
        image: HornAntennaImage,
        description: "Radio astronomy is a major field in observational and computational astronomy. There are many types of antennae to observe radio waves, the most basic of which is Horn Antenna. To encourage advanced astronomy in the institute, the Astronomy Club is developing its own horn antenna to capture radio wave frequencies and explore the radio frequency observation domain. By constructing an efficient and sustainable telescope using metal sheets, we aim to advance our capabilities in radio astronomy observations and unlock new insights into the universe's electromagnetic spectrum.",
        imageFirst: false
    },
    {
        title: "Satellite Team",
        image: CubeSatImage,
        description: "At the Satellite Team, we are committed to student-led space innovation, combining our passion for engineering and space exploration. Here's a sneak peek at our current initiatives:CanSat - A compact atmospheric probe reaching 20 km to collect vital atmospheric data.Agricultural CubeSat - A monitoring satellite for precision farming, analyzing crop health, soil moisture, and weather patterns. Through hands-on projects, we bridge theory and real-world applications, shaping the future of space exploration and Earth observation.",
        imageFirst: true
    },
    {
        title: "Rocket Team",
        image: rocketImage,
        description: (
            <>
                Our team is developing a solid fuel rocket, featuring an in-house manufactured nose cone and fiberglass fins for aerodynamic stability. Powered by H-class motors, it is designed to reach impressive altitudes.
                Our initial goal is a 1,000-meter launch, a crucial step in testing solid-fuel propulsion and refining flight dynamics. With continued improvements in propulsion systems and materials, we aim to push beyond 10,000 meters.
                Every component is crafted in-house, fostering hands-on learning and engineering excellence. This project inspires aerospace enthusiasts and provides a platform for applying interdisciplinary knowledge to real-world challenges.{" "}
                <a href="https://rocket-team-iit-varanasi.github.io/website/" target="_blank" rel="noopener noreferrer" className="text-white-400 underline">
                    Know more about us here
                </a>
            </>
        ),
        imageFirst: false
    },
    {
        title: "Satellite Tracker",
        image: SatelliteTrackerImage,
        description: "Our team has developed a fully functional satellite tracker through tireless dedication and commitment. This sophisticated tool aligns with our overarching goals, empowering us to explore the cosmos with precision and efficiency. With its capabilities, we can delve deeper into our pursuits & unlock new insights into the mysteries of space.",
        imageFirst: true
    },

];

const Projects = () => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="projects-container px-5 py-4 relative">
            <div
                className="fixed top-0 left-0 pointer-events-none hidden sm:block"
                style={{
                    transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
                    zIndex: 1000,
                }}
            >
                <Image src={star} alt="Star Cursor" width={30} height={30} className="hidden sm:block" />
            </div>

            <motion.h1
                className="text-3xl sm:text-4xl font-bold mb-6 mt-10 sm:mt-20 text-center text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                Club Projects
            </motion.h1>
            {projects.map((project, index) => (
                <motion.div
                    key={index}
                    className={`project-item flex flex-col sm:flex-row ${project.imageFirst ? 'sm:flex-row' : 'sm:flex-row-reverse'} mb-16 items-center`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
                    viewport={{ once: true }}
                >
                    <div className="flex-1 flex items-center justify-center mb-4 sm:mb-0">
                        <Image src={project.image} alt={project.title} height={200} width={400} className="max-w-full h-auto" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center px-4 text-white text-center sm:text-left">
                        <h2 className="text-xl sm:text-2xl font-bold mb-2">{project.title}</h2>
                        <p className="text-base sm:text-lg">{project.description}</p>
                    </div>
                </motion.div>
            ))}
        </div >
    );
};

export default Projects;
