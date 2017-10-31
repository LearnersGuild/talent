const tempInfo = [ //Until Real DB is set up
  {
    name: "About Learners Guild",
    about: "It...is...AWESOME!!!!!!!!!!"
  }
]

const userTempInfo = [ //Until Real DB is set up
  {
    id: 1,
    name: "Aaron Villanueva",
    about: "Some awesome kid who is highly driven to solving problems",
    experience: [
      {
        id: 1,
        projects: "Here is the experience I have"
      },
      {
        id: 2,
        projects: "Here is another experience I have"
      }
    ],
    skills: [
      {
        id: 1,
        skill: 'React'
      },
      {
        id: 2,
        skill: 'express'
      }
    ]
  }
]

const fakeDB = [ //Until Real DB is set up
  {
    id: 1,
    name: "Aaron",
    githubHandle: "handle1"
  },
  {
    id: 2,
    name: "Melissa",
    githubHandle: "handle2"
  },
  {
    id: 3,
    name: "Christine",
    githubHandle: "handle3"
  },
  {
    id: 4,
    name: "Henry",
    githubHandle: "handle4"
  },
  {
    id: 5,
    name: "Joe",
    githubHandle: "handle5"
  },
  {
    id: 6,
    name: "Audrey",
    githubHandle: "handle6"
  }
]

const fakeProjects = [ //Until Real DB is set up
  {
    id: 1,
    title: "React Project",
    link: "https://www.google.com"
  },
  {
    id: 2,
    title: "Postalicious",
    link: "https://www.google.com"
  },
  {
    id: 3,
    title: "Object Oriented Programming",
    link: "https://www.google.com"
  },
  {
    id: 4,
    title: "Functional Programming",
    link: "https://www.google.com"
  },
  {
    id: 5,
    title: "Authentication/Authorization",
    link: "https://www.google.com"
  },
  {
    id: 6,
    title: "I ran out of fake titles for projects",
    link: "https://www.google.com"
  }
]

export {tempInfo, userTempInfo, fakeDB, fakeProjects}
