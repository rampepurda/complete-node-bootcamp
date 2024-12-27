export const navAriaLabel = {
  isMain: 'primary',
}
export const navigation = {
  sideBarSections: [
    {
      title: 'Section 1: Welcome',
      subNavigation: [
        {
          title: 'Intro',
          link: 'section1',
        },
      ],
    },
    {
      title: 'Section 2: Introduction to Node.js and NPM',
      subNavigation: [
        {
          title: 'Reading and Writing Files (sync, async)',
          link: 'section2/reading-and-writing-files',
        },
        {
          title: 'Creating a Simple Web Server',
          link: 'section2/creating-simple-web-server',
        },
        {
          title: 'Routing & Building Simple Api',
          link: 'section2/routing',
        },
        {
          title: 'Templating and creating Own Modules',
          link: 'section2/templateProducts',
        },
        {
          title: 'npm, package.json about',
          link: 'section2/packageJSON',
        },
      ],
    },
    {
      title: 'Section 3: Introduction to Backend Web Development',
      link: 'section3/backendDevIntro',
    },
    {
      title: 'Section 6: Node Express',
      link: 'section6/backendDevIntro',
      subNavigation: [
        {
          title: 'Intro',
          link: 'section6/node_express_intro',
        },
      ],
    },
  ],
}
