// Single source of truth for the website (index.html) and the printable CV (cv.html).
// Edit content here; both pages and the generated PDF pick it up.

export interface Job {
  title: string;
  company: string;
  location: string;
  start: string;
  end: string; // "Present" for the current role
  current?: boolean;
  highlights: string[];
  stack?: string[];
  /** Map marker for the hero map: [longitude, latitude] */
  coords: [number, number];
}

export interface SkillGroup {
  name: string;
  items: string[];
}

export const profile = {
  name: 'Jose Miguel Zambrana Sandoval',
  shortTitle: 'Geospatial Software Engineer & Solution Architect',
  headline:
    'Geospatial Software Engineer & Solution Architect | GIS Technical Lead | Full-Stack GIS Development | MapLibre | Python, FastAPI, C# | PostGIS, ArcGIS Enterprise, GeoServer | AI-Assisted Development (Claude, Cursor)',
  tagline:
    'I build geospatial platforms that stay fast when the data gets big, from enterprise ArcGIS architectures to MapLibre mobile apps rendering hundreds of thousands of features.',
  location: 'Brazil – Bolivia · Remote',
  contact: {
    email: 'jmiguelzambrana@gmail.com',
    phone: '+55 67 99132-3903', // printed CV only; not shown on the website
    linkedin: 'https://www.linkedin.com/in/jose-miguel-zambrana/',
    github: 'https://github.com/josemzsandoval',
  },
  stats: [
    { value: '17', label: 'years in GIS & software' },
    { value: '220K+', label: 'points rendered on mobile' },
    { value: '40%', label: 'faster GPS rendering with deck.gl' },
  ],
  summary: [
    'Senior GIS Solutions Architect and Full-Stack Software Engineer with 17 years of experience designing and implementing enterprise geospatial systems with both commercial and open-source technologies. I build scalable spatial architectures and Web GIS applications and integrate them into modern software platforms across energy, utilities, mining, telecommunications, and government.',
    'Extensive experience designing ArcGIS Enterprise architectures, spatial data models, and automated geospatial workflows using ArcPy and open-source libraries such as GeoPandas, Shapely, GDAL, and Rasterio, as well as geospatial ETL pipelines and spatial databases. Experienced in integrating GIS services, APIs, and cloud infrastructure to support high-performance geospatial applications.',
    'Currently a Full-Stack C# GIS Developer at Upstart13, building .NET MAUI mobile mapping features with MapLibre, tuning GeoServer infrastructure, and guiding clients toward GPU-accelerated visualization with deck.gl.',
  ],
  jobs: [
    {
      title: 'Full-Stack C# GIS Developer',
      company: 'Upstart13',
      location: 'Remote',
      start: 'May 2026',
      end: 'Present',
      current: true,
      highlights: [
        'Develop features for a .NET MAUI cross-platform mobile app built on the MapLibre Native SDK.',
        'Re-engineered point-layer rendering: the previous version crashed at ~70K points; the new implementation renders 220K+ points in seconds.',
        'Upgraded the MapLibre SDK, refactored the map codebase, and introduced a per-layer configuration model for the layers loaded on the map.',
        'Diagnosed misconfiguration across 6 GeoServer instances: 5 of 6 ran the default 4 GB memory allocation on ~24 GB servers, causing intermittent hangs; defined the tuning recommendations.',
        'Guided the client’s migration from OpenLayers to deck.gl for high-volume GPS point visualization, reducing loading and rendering time by up to 40% with smoother navigation.',
      ],
      stack: ['C#', '.NET MAUI', 'MapLibre', 'GeoServer', 'deck.gl'],
      coords: [-45.8872, -23.1791],
    },
    {
      title: 'Tech Lead & GIS Backend Engineer',
      company: 'FortyGuard',
      location: 'Remote',
      start: 'Nov 2023',
      end: 'May 2026',
      highlights: [
        'Designed and implemented the backend architecture for the tOS Dashboard (Temperature Operating System), a geospatial platform for urban heat analysis.',
        'Integrated Google Static Maps, Street View Static API, Google Earth Engine, Azure OpenAI (ChatGPT), and Claude Opus via AWS Bedrock with internal systems built on FastAPI, Celery, PostGIS, GPU-based inference servers, Azure Blob Storage, and AWS S3.',
        'Designed and implemented processing pipelines for geospatial datasets and satellite imagery using Rasterio and GDAL.',
        'Developed data ingestion workflows integrating Azure Synapse and AWS Athena to enable on-demand geospatial heatmap analysis.',
        'Promoted to Tech Lead, overseeing sprint planning, task allocation, and technical direction for new system features.',
        'Defined the technology stack for new features and managed GitHub CI/CD pipelines, coordinating deployments and environment configuration for development and production clusters.',
      ],
      stack: ['Python', 'FastAPI', 'Celery', 'PostGIS', 'GDAL', 'AWS', 'Azure', 'LLMs'],
      coords: [-45.8872, -23.1791],
    },
    {
      title: 'GIS Solutions Engineer',
      company: 'ZUKK',
      location: 'Brazil',
      start: '2021',
      end: '2023',
      highlights: [
        'Led GIS projects as Technical Lead, coordinating development efforts and ensuring successful delivery of geospatial solutions.',
        'Developed custom GIS solutions using ArcGIS Enterprise/Online and open-source technology (GeoPandas, GeoServer, PostgreSQL + PostGIS).',
        'Designed and implemented APIs with ASP.NET Core (C#), FastAPI (Python), and Node.js to support scalable backend services and integrations.',
        'Developed custom widgets with the ArcGIS Maps SDK for JavaScript, extending web mapping functionality.',
        'Automated geoprocesses in Python and led data integration with client systems.',
      ],
      stack: ['ArcGIS Enterprise', 'ASP.NET Core', 'FastAPI', 'GeoServer', 'PostGIS'],
      coords: [-45.8872, -23.1791],
    },
    {
      title: 'GIS Solutions Engineer',
      company: 'YPFB',
      location: 'Bolivia',
      start: '2020',
      end: '2020',
      highlights: [
        'Built and published operational dashboards displaying oil and gas exploration and production stages.',
        'Migrated a legacy web mapping system to a Vue.js + OpenLayers stack.',
        'Managed GIS infrastructure on ArcGIS Enterprise and the enterprise geodatabase, improving read and edit performance.',
        'Automated GIS data quality-control processes.',
      ],
      stack: ['Vue.js', 'OpenLayers', 'ArcGIS Enterprise'],
      coords: [-63.1812, -17.7834],
    },
    {
      title: 'Upstream Specialist',
      company: 'ANH Bolivia',
      location: 'Bolivia',
      start: '2019',
      end: '2020',
      highlights: [
        'Upgraded ArcGIS infrastructure and implemented secure Active Directory integration, improving security and user management.',
        'Developed operational dashboards to monitor daily drilling reports, enabling faster analysis of field operations.',
        'Designed an enterprise geodatabase centralizing spatial data from multiple sources.',
        'Designed and developed ArcGIS ArcMap add-ins in C#.',
      ],
      stack: ['ArcGIS Enterprise', 'C#', 'Active Directory'],
      coords: [-63.1812, -17.7834],
    },
    {
      title: 'GIS & Data Specialist',
      company: 'YPFB',
      location: 'Bolivia',
      start: '2017',
      end: '2017',
      highlights: [
        'Managed the ProSource (Schlumberger) oilfield data repository and its ArcGIS integration.',
        'Managed GIS infrastructure on ArcGIS Enterprise.',
        'Designed and developed ArcGIS ArcMap add-ins in C#.',
      ],
      stack: ['ArcGIS', 'ProSource', 'C#'],
      coords: [-63.1812, -17.7834],
    },
    {
      title: 'Software & Project Manager',
      company: 'GEOSYSTEMS SRL',
      location: 'Bolivia',
      start: '2009',
      end: '2016',
      highlights: [
        'Led GIS software projects using the ArcGIS Platform, Python, .NET (C#), and JavaScript.',
        'Managed infrastructure, client relations, and teams using Agile/Scrum.',
        'Served as trainer and CIO, overseeing 30+ users and the full IT infrastructure.',
      ],
      stack: ['ArcGIS', 'Python', '.NET', 'JavaScript'],
      coords: [-63.1812, -17.7834],
    },
  ] satisfies Job[],
  skills: [
    {
      name: 'Languages & Frameworks',
      items: ['Python', 'C#', 'JavaScript', 'TypeScript', 'VB.NET', '.NET / ASP.NET Core', '.NET MAUI', 'FastAPI', 'Node.js', 'Celery', 'Vue.js'],
    },
    {
      name: 'Web & Mobile Mapping',
      items: ['MapLibre (Native & GL JS)', 'deck.gl', 'OpenLayers', 'ArcGIS Maps SDK for JavaScript'],
    },
    {
      name: 'GIS & Spatial',
      items: ['ArcGIS Pro', 'ArcGIS Enterprise (Portal, Server)', 'ArcGIS Online', 'ArcPy', 'GeoServer', 'QGIS', 'GDAL', 'Rasterio', 'GeoPandas', 'Shapely', 'Dask-GeoPandas', 'Remote sensing'],
    },
    {
      name: 'Databases',
      items: ['PostgreSQL / PostGIS', 'ArcSDE Geodatabase', 'SQL Server', 'MongoDB', 'MySQL', 'Azure Synapse', 'AWS Athena'],
    },
    {
      name: 'Cloud & DevOps',
      items: ['Azure (Blob Storage, Synapse)', 'AWS (S3, Athena, Bedrock)', 'Docker', 'GitHub Actions CI/CD', 'Git / Bitbucket', 'Linux (Ubuntu, CentOS)', 'Windows Server', 'Agile / Scrum'],
    },
    {
      name: 'AI & LLM',
      items: ['Claude Opus (AWS Bedrock)', 'Azure OpenAI (ChatGPT)', 'AI-assisted development (Claude Code, Cursor)'],
    },
  ] satisfies SkillGroup[],
  education: [
    { title: 'BSc in Systems Engineering', org: 'UPSA, Bolivia' },
    { title: 'Diploma in Web Application Management', org: 'UVIRTUAL, Bolivia' },
  ],
  certifications: [
    { title: 'ArcGIS Enterprise Administration Associate 10.3', org: 'Esri' },
    { title: 'CTT+ Classroom Trainer', org: 'CompTIA' },
  ],
  languages: [
    { name: 'Spanish', level: 'Native' },
    { name: 'English', level: 'Professional working proficiency' },
    { name: 'Portuguese', level: 'Fluent' },
  ],
  cvPdf: '/cv/Jose_Miguel_Zambrana_CV.pdf',
};

export type Profile = typeof profile;
