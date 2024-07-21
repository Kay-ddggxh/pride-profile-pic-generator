const prideGradients = {
  lgbt: "linear-gradient(180deg, #FE0000 16.66%, #FD8C00 16.66%, 33.32%, #FFE500 33.32%, 49.98%, #119F0B 49.98%, 66.64%, #0644B3 66.64%, 83.3%, #C22EDC 83.3%)",
  bear: "linear-gradient(180deg, #633800 14.285%, #D76300 14.285%, 28.57%, #FFDE58 28.57%, 42.855%, #FFE7B5 42.855%, 57.14%, #FFFFFF 57.14%, 71.425%, #555555 71.425%, 85.71%, #000000 85.71%)",
  asexual:
    "linear-gradient(18180deg, #181818 25%, #A3A3A3 25%, 50%, #FFFFFF 50%, 75%, #800080 75%)",
  bisexual:
    "linear-gradient(180deg, #D60270 40%, #9B4F96 40%, 60%, #0038A8 60%)",
  aromantic:
    "linear-gradient(180deg, #39A33E 20%, #A2CF72 20%, 40%, #FFFFFF 40%, 60%, #A3A3A3 60%, 80%, #181818 80%)",
  nonbinary:
    "linear-gradient(180deg, #FFF430 25%, #FFFFFF 25%, 50%, #9C59D1 50%, 75%, #181818 75%)",
  transgender:
    "linear-gradient(180deg, #5BCEFA 20%, #F5A9B8 20%, 40%, #FFFFFF 40%, 60%, #F5A9B8 60%, 80%, #5BCEFA 80%)",
  genderqueer:
    "linear-gradient(180deg, #B57EDC 33.33%, #FFFFFF 33.33%, 66.66%, #4A8123 66.66%)",
  genderfluid:
    "linear-gradient(180deg, #FF77A3 20%, #FFFFFF 20%, 40%, #BE18D6 40%, 60%, #181818 60%, 80%, #333EBD 80%)",
  pansexual:
    "linear-gradient(180deg, #FF218C 33.33%, #FFD800 33.33%, 66.66%, #21B1FF 66.66%)",
  philly:
    "linear-gradient(180deg, #181818 12.5%, #784F17 12.5%, 25%, #FE0000 25%, 37.5%, #FD8C00 37.5%, 50%, #FFE500 50%, 62.5%, #119F0B 62.5%, 75%, #0644B3 75%, 87.5%, #C22EDC 87.5%)",
  polysexual:
    "linear-gradient(180deg, #F61CB9 33.33%, #07D569 33.33%, 66.66%, #1C92F6 66.66%)",
  neutrois:
    "linear-gradient(180deg, #FFFFFF 33.33%, #1F9F00 33.33%, 66.66%, #181818 66.66%)",
  demigirl:
    "linear-gradient(180deg, #7F7F7F 14.285%, #C3C3C3 14.285%, 28.57%, #FEAEC9 28.57%, 42.855%, #FFFFFF 42.855%, 57.14%, #FEAEC9 57.14%, 71.425%, #C3C3C3 71.425%, 85.71%, #7F7F7F 85.71%)",
  agender:
    "linear-gradient(180deg, #181818 14.285%, #C3C3C3 14.285%, 28.57%, #FFFFFF 28.57%, 42.855%, #B8F483 42.855%, 57.14%, #FFFFFF 57.14%, 71.425%, #C3C3C3 71.425%, 85.71%, #181818 85.71%)",
  demiboy:
    "linear-gradient(180deg, #7F7F7F 14.285%, #C3C3C3 14.285%, 28.57%, #9AD9EB 28.57%, 42.855%, #FFFFFF 42.855%, 57.14%, #9AD9EB 57.14%, 71.425%, #C3C3C3 71.425%, 85.71%, #7F7F7F 85.71%)",
  androgyne:
    "linear-gradient(9180deg, #FE007F 33.33%, #9832FF 33.33%, 66.66%, #00B8E7 66.66%)",
  lesbian:
    "linear-gradient(180deg, #A60061 14.285%, #B95393 14.285%, 28.57%, #D260A7 28.57%, 42.855%, #EDEDEB 42.855%, 57.14%, #E5ABD0 57.14%, 71.425%, #C74D52 71.425%, 85.71%, #8C1D00 85.71%)",
};

document
  .getElementById("image-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const fileInput = document.getElementById("image-upload");
    const donutContainer = document.querySelector(".donut-container");
    const downloadBtn = document.getElementById("download-btn");

    const file = fileInput.files[0];
    const selectedFlag = document.querySelector('input[name="pride_flag"]:checked');

    if (!file || !selectedFlag) {
      alert("Please upload an image and select a pride flag.");
      return;
    }

    const gradient = prideGradients[selectedFlag.value];

    const reader = new FileReader();
    reader.onload = function (event) {
      const imageUrl = event.target.result;

      const styleSheet = document.styleSheets[0];
      const donutBeforeRule = Array.from(styleSheet.cssRules).find(
        (rule) => rule.selectorText === ".donut::before"
      );
      const donutAfterRule = Array.from(styleSheet.cssRules).find(
        (rule) => rule.selectorText === ".donut::after"
      );

      if (donutBeforeRule) {
        donutBeforeRule.style.background = gradient;
        donutBeforeRule.style.border = "none";
      }

      if (donutAfterRule) {
        donutAfterRule.style.backgroundImage = `url(${imageUrl})`;
        donutAfterRule.style.cursor = "move";
      }

      /* 
      drag-drop image with mouse
      Source: https://tonylea.com/how-to-drag-an-element-using-javascript
      */
      let imgEl = document.getElementById("donut"); // might have to change due to :after pseudo-selector
      let newPosX = 0, newPosY = 0, startPosX = 0, startPosY = 0;

      imgEl.addEventListener("mousedown", function(event) {
        event.preventDefault();

        startPosX = event.clientX;
        startPosY = event.clientY;

        document.addEventListener("mousemove", mouseMove);

        document.addEventListener("mouseup", function() {
          document.removeEventListener("mousemove", mouseMove);
        });
      });

      function mouseMove(event) {
        console.log("moving now!!!");
      }


      // Use dom-to-image to capture the .donut-container element and provide a download link
      domtoimage
        .toPng(donutContainer)
        .then(function (dataUrl) {
          downloadBtn.href = dataUrl;
          downloadBtn.style.display = "block";
        })
        .catch(function (error) {
          console.error("oops, something went wrong!", error);
        });
    };

    reader.readAsDataURL(file);
  });
