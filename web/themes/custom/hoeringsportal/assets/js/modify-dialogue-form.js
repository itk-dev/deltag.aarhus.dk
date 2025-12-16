Drupal.behaviors.modifyDialogueForm = {
  attach: function (context, settings) {
    once("modifyDialogueForm", ".file-resup", context).forEach(
      function (element) {
        let imageDescription = document.querySelector(
          ".field--name-field-image-upload .form-item > .description",
        );
        let dropArea = document.querySelector(
          ".field--name-field-image-upload .form-item .file-resup-wrapper .drop-message",
        );

        imageDescription.classList.toggle("d-block");
        if (dropArea) {
          dropArea.append(imageDescription);
        }
      },
    );
  },
};
