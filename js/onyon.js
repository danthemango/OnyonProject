import { helpers } from "./mylib/helpers.js";
import { status } from "./mylib/status.js";
import { demo } from "./mylib/demo.js";

(function () {
   helpers.consoleAnnounce('OnyonMaps'); // make sure we're loaded
   status.quick('loading');

   // run the demo on startup
   demo.run();

   // onyon entrypoints
   document.ony = {
      import: () => console.log('todo'),
      export: () => console.log('todo'),
      upload: () => console.log('todo'),
   }
})();
