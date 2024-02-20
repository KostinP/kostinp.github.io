export const Data = {
  profile: {
    name: "Pavel Kostin",
    ocupation: "FullStack Software Developer",
    location: "Россия, Санкт-Петербург",
    email: "kopavalex@yandex.ru",
    telephone: "+7 (981) 761-76-46",
    image: "images/IMG_5023.png",
  },
  aboutMe: {
    label: "Обо мне",
    description:
      "Получил смешанное образование, поэтому могу и программировать и заниматься дизайном интерфейсов.",
  },
  skills: {
    technicalLabel: "Hard skills",
    softLabel: "Soft skills",
    technicalSkills: [
      "C#",
      "Unity",
      "EntityFramework",
      "LINQ",
      "RabbitMQ",
      "NUnit",
      "Swagger",
      "Postman",
      "React",
      "React-native",
      "Blender",
      "Photoshop",
      "Illustrator",
      "InDesign",
      "SQL",
      "Docker",
      "Linux",
      "Git",
    ],
    softSkills: [
      "Коммуникабельный",
      "Системное мышление",
      "Проактивный",
      "Креативный",
      "Готов обучать других людей",
    ],
  },
  socialMedia: {
    label: "Contacts",
    social: [
      {
        label: "Pavel Kostin",
        name: "linkedin",
        url: "https://www.linkedin.com/in/pavel-kostin",
        className: "bxl-linkedin-square",
      },
      {
        label: "KostinP",
        name: "github",
        url: "https://github.com/KostinP",
        className: "bxl-github",
      },
      {
        label: "Pavel Kostin",
        name: "telegram",
        url: "https://t.me/PashaKostin",
        className: "bxl-telegram",
      },
    ],
  },
  experience: {
    works: [
      {
        title: "FULLSTACK DEVELOPER",
        period: "Oct. 2023 - Now",
        company: "Herzen University",
        description: [
          "Адаптировал легаси React-native проект под новые задачи.", 
          "Frontend (React, Storybook, Three.js, Material UI) developer.",
          "Backend (C#, Entity Framework, SQL Server, NUnit, Swagger, RabbitMQ (MassTransit), ImageSharp, NuGet, GitHub Actions, Docker) developer.",
          "Занимался написанием технической документации.",
        ],
      },
      {
        title: "УЧИТЕЛЬ ПРОГРАММИРОВАНИЯ У ДЕТЕЙ",
        period: "Feb. 2023 - Now",
        company: "uchi.ru",
        description: [
          "Учил детей Unity, Blender, Unreal Engine, Html, CSS, JavaScript, Java, Python, Scratch, ScratchJr, Kodu Game Lab.",
        ],
      },
    ],
    academic: [
      {
        career: "РГПУ им А.И. Герцена",
        date: "2022-Now",
        institution: "Институт информационных технологий и технологического образования",
      },
      {
        career: "Санкт-Петербургский государственный университет, неполное высшее образование",
        date: "2019-2021",
        institution: "Математико-механический факультет",
      },
    ],
    projects: [
      {
        name: "University Helper (backend, mobile)",
        company: "Студенческий проект",
        period: "Mar. 2023 - Dec. 2023",
        description: [
          "Помошник для студента, который состоит из backend и мобильного приложения, интегрирован с системой университета",
          "Backend: C#, Entity Framework, SQL Server, NUnit, Postman, Swagger, RabbitMQ (MassTransit), ImageSharp, NuGet, GitHub Actions",
          "Мобильное приложение: C#, Unity, UI Toolkit",
        ],
      },
      {
        name: "Digital Office (backend)",
        company: "LANIT-TERCOM, студенческий проект",
        period: "Jul. 2020 - Jun. 2021",
        description: [
          "Вторая итерация проекта. Разрабатывал backend при помощи ASP.Net Core REST API Web Services для оптимизации процессов компании: департаменты, проекты, задачи, сотрудники, роли, права, отпуска, файллы, картинки...",
          "Backend: C#, Entity Framework, SQL Server, NUnit, Postman, Swagger, RabbitMQ (MassTransit), ImageSharp, NuGet, GitHub Actions",
        ],
      },
      {
        name: "Office Map (backend)",
        company: "LANIT-TERCOM, студенческий проект",
        period: "Jul. 2019 - May. 2020",
        description: [
          "Разрабатывал backend при помощи ASP.Net Core REST API Web Services для оптимизации процессов компании: департаменты, проекты, задачи, сотрудники.",
          "Backend: C#, Entity Framework, SQL Server, NUnit, Postman, Swagger, AutoMappers, Identity Server 4, GitHub Actions",
        ],
      },
    ],
  },
};
