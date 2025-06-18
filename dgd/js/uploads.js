document.addEventListener('DOMContentLoaded', () => {
  const uploadBtn = document.getElementById('upload_image_or_documents_btn');
  const fileInput = document.getElementById('file_input');
  const promptTextBox = document.getElementById('prompt_text_box');
  const previewContainer = document.getElementById('file_preview_container');

  uploadBtn.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      previewContainer.innerHTML = ''; // Clear old previews

      let fileSummaries = [];

      Array.from(files).forEach(file => {
        const fileType = file.type;
        const fileName = file.name;
        const fileSize = (file.size / 1024).toFixed(1);
        let summary = `📄 ${fileName} (${fileSize} KB)`;
        fileSummaries.push(summary);

        const previewItem = document.createElement('div');
        previewItem.classList.add('preview-item');

        if (fileType.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = fileName;
            img.title = fileName;
            previewItem.appendChild(img);
          };
          reader.readAsDataURL(file);
        } else {
          const icon = document.createElement('span');
          icon.textContent = '📄';
          const text = document.createElement('span');
          text.textContent = fileName;
          previewItem.appendChild(icon);
          previewItem.appendChild(text);
        }

        previewContainer.appendChild(previewItem);
      });

      promptTextBox.value += `\nUploaded Files:\n${fileSummaries.join('\n')}`;
    }
  });
});
