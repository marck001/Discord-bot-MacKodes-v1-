module.exports = {
    name: 'english',
    description: 'Replies with english resources',
  
    callback: async (client, interaction) => {
      await interaction.deferReply();
  
      interaction.editReply(
        `### Full course
        A collection of popular English learning books for each english level with a folder filled with useful grammar resources.
        https://drive.google.com/drive/u/3/folders/1gpLLRYYK-k3fp-_XcsLF-qSFt0bhYnD4
        
        ### Web Page and blog
        __BBC learning__ - An ok web page for searching resources and practicing your learning
        https://www.bbc.co.uk/learningenglish/
        ABA learning(american and british) - Blog for vocabulary and reading
        https://blog.abaenglish.com
        
        ###  Youtube Channels
        __Learn English with EnglishClass101.com__- Suitable for beginners students and english improvement tips
        https://www.youtube.com/@EnglishClass101/videos
         __Ted Talks__ - Suitable for intermediate-advanced students. This popular youtube channel uploads discussions about world-wide topics, pick up the topic you get interested in
        https://www.youtube.com/@TED/videos
        
        ### Practice english for coding
        __FreeCodeCamp A2__ Practice english conversations while learning some phrases related to coding
        https://www.freecodecamp.org/learn/a2-english-for-developers/`
      );
    },
  };
  