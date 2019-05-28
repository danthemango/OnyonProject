import { iconGen } from "./iconGenerator.js";

// onyonMaps interface
export const ony = (function () {
   const mymap = L.map('mapid').setView([51.505, -0.09], 13);
   function init() {
      //XXX addTiles();
   }

   // append geographic data to map
   function addTiles() {
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
         maxZoom: 18,
         id: 'mapbox.streets',
         accessToken: 'insert api key here'
      }).addTo(mymap);
   }

   const sites = [];

   /** specify site coordinates, returns siteId*/
   function addSite (coords, categories = []) {
      const site = {coords, categories};
      sites.push(site);
      return site;
   }

   // returns a random Hex color
   function getRandomColorHex() {
      const hex = Math.floor(Math.random() * (parseInt("ffffff", 16) + 1)).toString(
         16
      );
      const paddingLength = 6 - hex.length;
      return "#" + "0".repeat(paddingLength) + hex;
   }

   const categories = [];

   /**
    * specify a category to display on the map
    * color will be random if none chosen
    * returns categoryId
    */
   function addCategory (name, color = getRandomColorHex()) {
      const category = {name, color};
      categories.push(category);
      return category;
   }

   /** generates a new marker */
   function genMarker (coords, colors) {
      const newIcon = L.icon({
         iconUrl: iconGen.getUrl(colors), //  'private/test.svg',
         iconSize: [30, 30],
      });
      return L.marker(coords, { icon: newIcon });
   }

   const markers = [];

   /** renders the map data */
   function render () {
      // remove the old markers
      markers.length = 0;
      // add the new ones
      for(const site of sites) {
         const marker = genMarker(site.coords, site.categories.map(i => i.color));
         markers.push(marker);
         marker.addTo(mymap);
      }
      generateLegend();
   }

   // generates the legend of categorical data included
   function generateLegend () {
      const legendHolder = document.querySelector('#mapLegend');
      legendHolder.innerHTML = '';
      for(const category of categories) {
         const legendItem = document.createElement('div');
         legendItem.innerHTML = `
            <span class="legend-color" style="background-color: ${category.color}"></span>
            <span class="legend-text">${category.name}</span>
         `;
         legendHolder.appendChild(legendItem);
         console.log(category.color);
      }
   }

   return { init, addSite, addCategory, render };
})();
