document
  .getElementById("image-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const fileInput = document.getElementById("image-upload");
    const colorInput = document.getElementById("color-input");
    const donut = document.getElementById("donut");
    const downloadBtn = document.getElementById("download-btn");

    const file = fileInput.files[0];
    const hexColor = colorInput.value;

    if (!file || !hexColor) {
      alert("Please upload an image and specify a hex color code.");
      return;
    }

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
        donutBeforeRule.style.background = hexColor;
      }

      if (donutAfterRule) {
        donutAfterRule.style.backgroundImage = `url(${imageUrl})`;
      }

      // Use dom-to-image to capture the .donut element and provide a download link
      domtoimage
        .toPng(donut)
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
