import {
  floids,
  chess,
  tiledash,
  fermilab,
  devlog,
  ncsa,
  dlab,
  statefarm,
  signalsight,
  hilotrader,
  robloxterrain,
  labmatch,
  chomp
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
    id: "resume",
    title: "Resume",
  },
];

const experiences = [
  {
    title: "Software Engineer Intern",
    company_name: "State Farm",
    date: "May 2025 – Aug 2025",
    details: [
      "Automated deployments of a dozen core services to AWS Fargate with Python-generated Terraform",
      "Improved API latency compliance from ~80% to 100% by shifting heavy work to asynchronous ECS backends on AWS Fargate",
      "Built a service that ties AWS Secrets Manager into GitLab CI/CD for automatic retrieval, rotation, and cross-account replication."
    ],
    image: statefarm,
    link: "https://www.linkedin.com/company/state_farm/"
  },
  {
    title: "Software Engineer",
    company_name: "UIUC Disruption Lab",
    date: "Jan 2025 – May 2025",
    details: [
      "Improved audio pipeline latency by switching from WAV to Opus in our real-time avatar stack.",
      "Built C# API pipelines to power live text-to-speech avatar interactions using OpenAI and Hugging Face.",
      "Shipped VR locomotion/camera scripts in Unity and demoed the system live at IMMERSE 2025."
    ],
    image: dlab,
    link: "https://giesgroups.illinois.edu/disruptionlab/tech-projects/"
  },
  {
    title: "Machine Learning Intern",
    company_name: "NCSA",
    date: "Sep 2024 – Dec 2024",
    details: [
      "Explored tumor-growth prediction by fine-tuning a ControlNet model in PyTorch and generating synthetic MRI slices to expand limited training data.",
      "Built a React + FastAPI dashboard to quickly upload and organize MRI scans for analysis.",
      "Scaled training across A100 GPUs with Docker and Slurm."
    ],
    image: ncsa,
    link: "https://github.com/nickgong1/Disease-Progression"
  },
  {
    title: "Quarknet Intern",
    company_name: "Fermilab",
    date: "Jun 2023 – Aug 2023",
    details: [
      "Led a small team to build a full-stack site for visualizing data from a new sensor aimed at finding hidden chambers in the Kukulkan Pyramid.",
      "Created an interactive Three.js tool to render real-time 3D cross-sections of particle paths and sensor hits.",
      "Presented to 50+ scientists and professors, helping renew momentum for the project."
    ],
    image: fermilab,
    link: "https://www.linkedin.com/in/brian-li-0748a426a/overlay/1728281523651/single-media-viewer/?profileId=ACoAAEH7xVgBk1sL6XOXF9WKoXKOZ1H8Cf2sfM8"
  },
  {
    title: "Dev Vlogger",
    company_name: "ExtraMediumDev on YouTube",
    date: "2020 – 2021",
    details: [
      "Published coding videos on procedural generation, game engine effects, and a Discord chess bot."
    ],
    image: devlog,
    link: "https://www.youtube.com/channel/UC6apnoSAww1AghWrpyfx0gw"
  }
];

const portfolio = [
  {
    name: "LabMatch",
    description:
      "Swipeable professor discovery + outreach generation for college research. An agentic web crawler that helps students find professors by crawling university pages with intent-based scraping.",
    image: labmatch,
    link: "https://lab-match-ai.vercel.app/"
  },
  {
    name: "Chomp",
    description:
      "Building the stealth startup to revolutionize creator economy and destroy restaurant monopolization. For the Social Media Hustler Revolution.",
    image: chomp,
    link: "https://www.usechomp.com"
  },
  {
    name: "Signal Sight",
    description:
      "Chrome extension democratizes CodeSignal assessments by revealing unimplemented details, with a full expanded summary of results, and view score breakdowns by data structures and algorithms topics.",
    image: signalsight,
    link: "https://signalsight.vercel.app/"
  },
  {
    name: "hilotrader.org",
    description:
      "Real-time multiplayer trading game with Flask/MongoDB backend, Socket.IO channels, and React Native frontend for mobile play. Includes live lobbies, room discovery, and session authentication.",
    image: hilotrader,
    link: "https://hilotrader.org"
  },
  {
    name: "Boids and Fireflies",
    description:
      "A 3D background simulation for my site, built with Three.js and TypeScript. Models boid flocking with glowing fireflies in real-time.",
    image: floids,
    link: "https://boids-and-fireflies.vercel.app/"
  },
  {
    name: "Discord Chess Bot",
    description:
      "A multiplayer Discord chess bot built in Python. Supports asynchronous turns, dynamic board visuals, and win/loss tracking.",
    image: chess,
    link: "https://www.youtube.com/watch?v=ybJBqyN7mXk&ab_channel=ExtraMediumDev"
  },
  {
    name: "Perlin Noise Roblox Terrain",
    description:
      "Procedural terrain generation in Roblox using Perlin noise algorithms. Creates realistic, infinite landscapes with smooth elevation transitions.",
    image: robloxterrain,
    link: "https://www.youtube.com/watch?v=y_A4L2YNCFg"
  },
  {
    name: "Tile Dash 2D",
    description:
      "Built an entire Roblox game using only 2D GUI elements and no 3D parts. Custom rendering, collision detection, and game logic all handled through UI frames and scripting.",
    image: tiledash,
    link: "https://www.roblox.com/games/8109620521/Tile-Dash-2D"
  }
];


export { experiences, portfolio };