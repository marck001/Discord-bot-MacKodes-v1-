module.exports = {
    name: 'python',
    description: 'Replies with python resources',
  
    callback: async (client, interaction) => {
      await interaction.deferReply();
  
      interaction.editReply(
        `### Fundamentals
        **Introduction to python course**
        https://drive.google.com/drive/folders/1lImZYjDi8fhguHSxoFJDTZwtarGIi780
        
        ### Basics
        **Freecodecamp Python Introduction **(https://www.freecodecamp.org/learn/scientific-computing-with-python/)
        **Codecademy**
        (https://www.codecademy.com/resources/docs/python)                                                                                                                                                                                                                                                                                                                                                                                                                              
        **W3Schools overview**
        (https://www.w3schools.com/python/default.asp)
        
        `
      );
    },
  };
  