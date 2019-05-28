// functions for manipulating the status section
export const status = (function () {
   // shows the status section
   function set(text) {
      const statusSection = document.querySelector('#status');
      const statusHolder = document.querySelector('#status-holder');
      statusHolder.classList.remove('hidden');
      statusSection.innerHTML = text;
   }

   // hides the status section
   function unset() {
      const statusHolder = document.querySelector('#status-holder');
      const statusSection = document.querySelector('#status');
      statusHolder.classList.add('hidden');
      statusSection.innerHTML = '';
   }

   // shows a status message for a moment
   function quick(text, timeout = 1000) {
      set(text);
      setTimeout(() => {
         unset();
      }, timeout);
   }

   return { set, unset, quick };
})();