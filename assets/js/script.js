document.getElementById('image-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const fileInput = document.getElementById('image-upload');
    const colorInput = document.getElementById('color-input');
    const donut = document.getElementById('donut');
    const downloadBtn = document.getElementById('download-btn');
  
    const file = fileInput.files[0];
    const hexColor = colorInput.value;
  
    if (!file || !hexColor) {
        alert('Please upload an image and specify a hex color code.');
        return;
    }
  
    const reader = new FileReader();
    reader.onload = function(event) {
        const imageUrl = event.target.result;
  
        const styleSheet = document.styleSheets[0];
        const donutBeforeRule = Array.from(styleSheet.cssRules).find(rule => rule.selectorText === '.donut::before');
        const donutAfterRule = Array.from(styleSheet.cssRules).find(rule => rule.selectorText === '.donut::after');
  
        if (donutBeforeRule) {
            donutBeforeRule.style.background = hexColor;
        }
  
        if (donutAfterRule) {
            donutAfterRule.style.backgroundImage = `url(${imageUrl})`;
        }
  
        // Capture the .donut element as an image and provide a download link
        html2canvas(donut).then(canvas => {
            const dataURL = canvas.toDataURL('image/png');
            downloadBtn.href = dataURL;
            downloadBtn.style.display = 'block';
        });
    };
  
    reader.readAsDataURL(file);
  });
  