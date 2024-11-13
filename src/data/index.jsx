import {
  floids,
  lstm,
  chess,
  wireframe,
  tiledash,
  fermilab,
  devlog,
  ncsa
} from "../assets";

export const navLinks = [
    {
      id: "Home",
      title: "Home",
    },
    {
      id: "portfolio",  
      title: "Portfolio",
    },
    {
      id: "experience",
      title: "Experience",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];

  const experiences = [
    {
      title: "Deep Learning Research Intern",
      company_name: "NCSA",
      date: "Sep 2024 - Present",
      details: [
        "Developing a <span style='color: white;'>ControlNet</span> model in <span style='color: white;'>Pytorch</span> to predict Alzheimer’s disease progression from MRI data.",
        "Creating a visualization tool to analyze and display over <span style='color: white;'> 1000+ brain MRI images</span>, helping design model architecture.",
        "Trained ImageFlowNet with <span style='color: white;'>A100 GPUs on the Brain Lumiere dataset</span>, , benchmarked performance and developing evaluation metrics to assess its effectiveness in predicting progression, for the development of our new model.",
      ],
      image: ncsa,  
      link: "https://github.com/nickgong1/Disease-Progression"
    },
    {
      title: "Software Engineer Intern - Quarknet",
      company_name: "Fermilab",
      date: "Jun 2023 – Aug 2023",
      details: [
        "Led a team of <span style='color: white;'>3+ in the Quarknet program</span> for the full-stack development of a data visualization website for commissioning a new sensor to detect hidden chambers inside the Kukulkan Pyramid in Mexico.",
        "Developed a web visualization tool using <span style='color: white;'>Three.JS</span> to construct real-time interactive 3D cross-sectional representations of particle and sensor intersections.",
        "Presented results to <span style='color: white;'>50+</span> scientists and professors and helped revive the project for the future.",
      ],
      image: fermilab,  
      link: "https://www.linkedin.com/in/brian-li-0748a426a/overlay/1728281523651/single-media-viewer/?profileId=ACoAAEH7xVgBk1sL6XOXF9WKoXKOZ1H8Cf2sfM8"
    },
    {
      title: "Dev Vlogger",
      company_name: "ExtraMediumDev on Youtube",
      date: "2020-2021",
      details: [
        "Over <span style='color: white;'>3600+ views</span> with coding demonstrations on game engine effects, perlin noise, and my discord chess bot project."
      ],
      image: devlog,  
      link: "https://www.youtube.com/channel/UC6apnoSAww1AghWrpyfx0gw"
    }
  ];
  
  const portfolio = [
    {
      name: "Boids and Fireflies",
      description:
        "Created for the background of my portfolio website. A cool 3D web simulation of boids and fireflies, created using Three.js and TypeScript.",
      image: floids,  
      link: "https://boids-and-fireflies.vercel.app/"
    },
    {
      name: "Predicting SPY Equity with TensorFlow",
      description:
        "Built a high-precision stock prediction model using TensorFlow and AlphaVantage, processing 641,000 data points to achieve 91% accuracy on SPY’s three-day outlook.",
      image: lstm,
      link: "https://github.com/ExtraMediumDev/SPY-Prediction-using-LSTM-Neural-Network"
    },
    {
      name: "Discord Chess Bot",
      description:
        "Created a fully interactive, multiplayer chess bot on Discord with dynamic visuals, asynchronous gameplay, and win tracking—all powered by Python and discord.py.",
      image: chess,
      link: "https://www.youtube.com/watch?v=ybJBqyN7mXk&ab_channel=ExtraMediumDev"
    },
    {
      name: "Perlin Noise Wireframe Cubes",
      description:
        "Crafted mesmerizing 3D landscapes using Perlin noise and custom-built 3D transformations, blending art with tech through Pygame.",
      image: wireframe,
      link: "https://github.com/ExtraMediumDev/simple_wireframe_cube/tree/master"
    },
    {
      name: "Tile Dash 2D",
      description:
        "Developed and launched *Tile Dash* on Roblox, a fast-paced strategy game engaging over 300 players with secure, server-side game mechanics.",
      image: tiledash,
      link: "https://www.roblox.com/games/8109620521/Tile-Dash-2D"
    }
  ];
  
  export { experiences, portfolio };