/** generate an icon with an array of colors */
export const iconGen = { getUrl };

/** returns a url encoded svg with the specified colors */
function getUrl (colors) {
   function getCoordinatesForPercent(percent) {
      const x = Math.cos(2 * Math.PI * percent);
      const y = Math.sin(2 * Math.PI * percent);
      return [x, y];
   }

   const numSegments = colors.length;
   const percentDelta = 1 / numSegments;
   let cumulativePercent = 0;
   const paths = [];

   let [startX, startY] = getCoordinatesForPercent(0);
   for (const color of colors) {
      // each slice starts where the last slice ended, so keep a cumulative percent
      cumulativePercent += percentDelta;
      const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

      // if the slice is more than 50%, take the large arc (the long way around)
      const largeArcFlag = percentDelta > 0.5 ? 1 : 0;

      // create an array and join it just for code readability
      const pathData = [
         `M ${startX} ${startY}`, // Move
         `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
         `L 0 0` // Line
      ];

      paths.push(`<path d="${pathData.join(' ')}" fill="${color}" clip-path="url(#clipper)"></path>`);

      [startX, startY] = [endX, endY];
   }

   const demo = `
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 2 2" style="transform: rotate(-90deg)" width="300">
      <defs>
         <clipPath id="clipper">
            <circle cx="0" cy="0" r=".28"></circle>
            <path d="m 0,-1 c -0.552,0 -1,0.448 -1,1 0,0.552 0.448,1 1,1 C 0.552,1 1,0.552 1,0 1,-0.552 0.552,-1 0,-1 Z m 0,1.536 c -0.296,0 -0.536,-0.24 -0.536,-0.536 0,-0.296 0.24,-0.536 0.536,-0.536 0.296,0 0.536,0.24 0.536,0.536 0,0.296 -0.24,0.536 -0.536,0.536 z"></path>
         </clipPath>
      </defs>
      ${paths.join('\n')}
   </svg>
   `;



   return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(demo);
}

/*
    function createCircle() {
      const parent = document.querySelector("#circleHolder");
      // remove any previous elements in parent
      parent.innerHTML = "";
      parent.appendChild(getCircle());
    }


    // returns an array of random colors
    function getRandomColors(num = -1) {
      if (num < 0) {
        num = Math.floor(Math.random() * 20) + 1;
      }
      const colors = [];
      for (let i = 0; i < num; i++) {
        colors.push(getRandomColorHex());
      }
      return colors;
    }

    let fps = 10;

    function changeFps(newfps) {
      document.querySelector('#sliderLabel').innerHTML = newfps;
      if(fps <= 0 && newfps > 0) {
        play();
      }
      fps = newfps;
    }

    function play() {
      createCircle();
      if(fps > 0) {
        setTimeout(play, 1000/fps);
      }
    }

    createCircle();
    play();
}
 */