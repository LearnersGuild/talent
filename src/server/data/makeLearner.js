const csv = require('csv-parser');
const fs = require('fs');

var stream = csv({
  raw: false,
  separator: ',',
  quote: '"',
  escape: '"',
  newline: '\n',
});

fs.createReadStream(`./public/Talent: Learner's Form.csv`)
.pipe(stream)
.on('data', function (data) {
  let learnerJSON = makeLearners(data);
  let name = data['What is your first and last name?'];
  fs.writeFile(`./src/server/data/learners/${name.replace(' ', '')}.json`, learnerJSON, function (err) {
    if (err) throw err;
  });
});

function makeLearners(data) {
  let learnerJSON = {};
  learnerJSON.specialty = data['What do you consider your "Specialty" i.e. Front-End, Back-End?'].replace('/', '');
  learnerJSON.github_handle = data['What is your github handle? (We don\'t need the whole link just the /username)'].replace('/', '');
  learnerJSON.linkedin_profile = data['What is your linkedin profile? (We don\'t need the whole link just the /username)'].replace('/', '');
  learnerJSON.twitter = data['What is your twitter? (We don\'t need the whole link just the /username)'].replace('/', '');
  learnerJSON.name = data['What is your first and last name?'];
  learnerJSON.story = data['Describe a little about yourself.'];
  learnerJSON.projects = makeProjects(data);
  learnerJSON.skills = makeSkills(data['Which of these skills do you have? (If you want to add more skills than what is listed you can put your skills in the Other field like so Other: a Skill; another skill; and so on)']);
  learnerJSON.experience = makeExperiences(data);
  learnerJSON.alumni = data['Are you an alumni?'];
  learnerJSON = JSON.stringify(learnerJSON, null, 2);
  return learnerJSON;
}

function makeProjects(data) {
  let projectsArr = [];
  projectsArr.push(data['How many Projects do you want to show off? (Just a Number)']);
  projectsArr.push(data['Please put the names of the images(with file extensions) from above on separate lines i.e. Bookstore.png']);
  projectsArr.push(data['Please put a link for each of your projects (Separate each project on a new line please)']);
  let projectsFormatted = [];
  projectsArr[1] = projectsArr[1].split('\n');
  projectsArr[2] = projectsArr[2].split('\n');
  for (let i = 0; i < parseInt(projectsArr[0]); i++) {
    let project = {};
    if (projectsArr[2][i]) {
      project.link = projectsArr[2][i];
    } else {
      continue;
    }
    if (projectsArr[1][i]) {
      project.title = 'LearnerProjectImages/' +  projectsArr[1][i].split('.')[0] + ' - ' + data['What is your first and last name?'] + '.' + projectsArr[1][i].split('.')[1];
    } else {
      project.title = 'LearnerProjectImages/' +  "GitHub-Mark-64px.png";
    }
    if (Object.keys(project).length !== 0) {
      projectsFormatted.push(project);
    }
  }
  return projectsFormatted;
}

function makeSkills(skills) {
  skills = skills.split(';');
  skills = skills.map(ele => ele = { skills: ele });
  return skills;
}

function makeExperiences(data) {
  let experiencesArr = [];
  experiencesArr.push(data['If you have external experiences from a job or otherwise that could be applied to Software Development, how many would you want to put down.']);
  experiencesArr.push(data['Could you please elaborate on the above experiences?']);
  let experiencesFormatted = [];
  experiencesArr[1] = experiencesArr[1].split('\n');
  for (let i = 0; i < parseInt(experiencesArr[0]); i++) {
    let experience = {};
    experience.projects = experiencesArr[1][i];
    experiencesFormatted.push(experience);
  }
  return experiencesFormatted;
}
