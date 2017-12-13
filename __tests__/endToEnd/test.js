import { Chrome } from 'navalia';
import App from '../../src/client/components/app';
const pageUrl = 'http://localhost:3000/';

// beforeAll(() => {
//   app.listen(port, () => {
//     console.log(`http://localhost:${port}`)
//   })
// })

describe("Route Testing", () => {
  let chrome = {};

  beforeEach(() => {
    chrome = new Chrome();
  });

  afterEach(() => {
    return chrome.done();
  });

  it("Should render the homepage", () => {
    return chrome.goto(pageUrl)
      .then(() => chrome.exists('.navbar-nav'))
      .then(exists => expect(exists).toEqual(true));
  });

  it("Should render current learners on the homepage", () => {
    return chrome.goto(pageUrl)
      .then(() => chrome.html('body'))
      .then(res => res.match(/img/g))
      .then(match => expect(match.length).toEqual(14));
  });

  it("Should render alumni after clicking on the link", () => {
    return chrome.goto(pageUrl)
      .then(() => chrome.click('a[href="/alumni"]'))
      .then(() => chrome.html('body'))
      .then(res => res.match(/img/g))
      .then(match => expect(match.length).toEqual(6));
  });

  it("Should render all learners after clicking on the link", () => {
    return chrome.goto(pageUrl)
      .then(() => chrome.click('a[href="/learners"]'))
      .then(() => chrome.html('body'))
      .then(res => res.match(/img/g))
      .then(match => expect(match.length).toEqual(20));
  });

  it("Should render a checkbox form after clicking on the link", () => {
    return chrome.goto(pageUrl)
      .then(() => chrome.click('a[href="/skills"]'))
      .then(() => chrome.html('body'))
      .then(res => res.match(/input/g))
      .then(match => expect(match.length).toEqual(3));
  });

  it("Should render a user's profile page after clicking their image", () => {
    return chrome.goto(pageUrl)
      .then(() => chrome.click('.img-responsive'))
      .then(() => chrome.html('body'))
      .then(res => res.match(/Hattie Mcmillan/))
      .then(match => expect(match[0]).toEqual('Hattie Mcmillan'));
  });

  it("Should render all learners with skills after checking boxes and clicking submit", () => {
    return chrome.goto(pageUrl)
      .then(() => chrome.click('a[href="/skills"]'))
      .then(() => chrome.click('input[type="checkbox"]'))
      .then(() => chrome.click('input[type="submit"]'))
      .then(() => chrome.html('body'))
      .then(res => res.match(/img/g))
      .then(match => expect(match.length).toEqual(18));
  });
});

// afterAll(() => {
//   app.close();
// })
