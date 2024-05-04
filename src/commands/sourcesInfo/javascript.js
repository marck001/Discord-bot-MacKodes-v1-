module.exports = {
    name: 'javascript',
    description: 'Replies with javascript resources',
  
    callback: async (client, interaction) => {
      await interaction.deferReply();

      interaction.editReply(
        `### Basics
        Codecademy Introduction to JavaScript (https://www.codecademy.com/learn/introduction-to-javascript)
        Khan Academy Intro to JS: Drawing and Animation - Completely free JavaScript intro. (https://www.khanacademy.org/computing/computer-programming/programming)
        Freecodecamp JavaScript Introduction - Popular free JavaScript course. (https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)
         
        ### Intermediate
        The odin Project -Javascript - Projects starting from scratch 
        (https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript)
        The odin project -NodeJs
        (https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs)
        The odin project -React
        (https://www.theodinproject.com/paths/full-stack-javascript/courses/react)
         
        ###  Reference Sources
        MDN - The best source for JavaScript on the web, by Mozilla. (https://developer.mozilla.org/en-US/)
        Web.dev - A good source for learning modern APIs and optimization tips, by Google. (https://web.dev/)
        W3Schools -source for HTML, CSS, and  JS. (https://www.w3schools.com/)
         
         ###  Blogs
        ByteofDev - A good source on web trends and optimization
        (https://byteofdev.com/)
        CSS-Tricks - A popular blog on CSS and web development in general 
        (https://css-tricks.com/)
        Logrocket Blog - Helpful tips on web development 
        (https://blog.logrocket.com/)
        Smashing Magazine - Tips on UX and front end web development (https://www.smashingmagazine.com/)`
      );
    },
  };
  