export const helpers = {
   /** for large announcements on console */
   consoleAnnounce: text => {
      // num characters on a line
      let widthCharCount = 50;

      let leftSide = (widthCharCount / 2) - (text.length / 2) - 1;
      let rightSide = (widthCharCount / 2) - (text.length / 2) - 1;
      if(text.length % 2 != 0) {
         leftSide -= 1.5;
         rightSide += 1.5;
      }

      console.log('');
      console.log('#'.repeat(widthCharCount));
      console.log('#'.repeat(leftSide) + ' ' + text + ' ' + '#'.repeat(rightSide));
      console.log('#'.repeat(widthCharCount));
      console.log('');
   }
}
