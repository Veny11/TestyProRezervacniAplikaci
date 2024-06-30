const captureBtn = document.querySelector('.captureBtn');
const previewContainer = document.querySelector(".previewContainer");
const downloadButton = document.querySelector(".downloadBtn");

captureBtn.addEventListener('click', async () => {
    downloadButton.classList.remove("hide");
    const canvas = await html2canvas(platno);
    const imageURL = canvas.toDataURL();
    previewContainer.innerHTML = `<img src="${imageURL}" id="planek">`;
    downloadButton.href = imageURL;
    downloadButton.download = "planek.png";
});

downloadButton.classList.add("hide");
previewContainer.innerHTML = "";