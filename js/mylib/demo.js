import { ony } from "./onyonMaps.js";

// from https://stackoverflow.com/questions/11935175/sampling-a-random-subset-from-an-array
function getRandomSubarray(arr) {
   let size = 1 + Math.floor(Math.random()*arr.length);
   var shuffled = arr.slice(0), i = arr.length, min = i - size, temp, index;
   while (i-- > min) {
       index = Math.floor((i + 1) * Math.random());
       temp = shuffled[index];
       shuffled[index] = shuffled[i];
       shuffled[i] = temp;
   }
   return shuffled.slice(min);
}

function run () {
   let MaxCategories = 20;
   const numCategories = 1 + Math.floor(Math.random()*MaxCategories);
   const categories = [];
   for(let i = 0; i < numCategories; i++) {
      categories.push(ony.addCategory('category ' + i));
   }

   const sites = [];
   for(let i = 0; i < 40; i++) {
      const x = 51.490 + (Math.random()*.032);
      const y = -0.13 + (Math.random()*.06);
      sites.push(ony.addSite([x,y], getRandomSubarray(categories)));
   }

   ony.render();
}

export const demo = { run };