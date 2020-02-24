'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var adFormElement = document.querySelector('.ad-form');
  var avatarBlockElement = adFormElement.querySelector('.ad-form-header__upload');
  var avatarFileFieldElement = avatarBlockElement.querySelector('input[type=file]');
  var avatarPreviewElement = avatarBlockElement.querySelector('.ad-form-header__preview img');
  var housingPhotoBlockElement = adFormElement.querySelector('.ad-form__photo-container');
  var housingPhotoFileFieldElement = housingPhotoBlockElement.querySelector('input[type=file]');
  var housingPhotoPreviewElement = housingPhotoBlockElement.querySelector('.ad-form__photo');

  var onAvatarFileFieldChange = function () {
    var file = avatarFileFieldElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreviewElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var onHousingPhotoFileFieldChange = function () {
    var file = housingPhotoFileFieldElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var imageElement = document.createElement('img');
        imageElement.src = reader.result;
        imageElement.style['max-width'] = '100%';
        housingPhotoPreviewElement.style.display = 'flex';
        housingPhotoPreviewElement.innerHTML = '';
        housingPhotoPreviewElement.appendChild(imageElement);
      });

      reader.readAsDataURL(file);
    }
  };

  avatarFileFieldElement.addEventListener('change', onAvatarFileFieldChange);
  housingPhotoFileFieldElement.addEventListener('change', onHousingPhotoFileFieldChange);
})();
