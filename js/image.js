'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var adForm = document.querySelector('.ad-form');
  var avatarBlock = adForm.querySelector('.ad-form-header__upload');
  var avatarFileField = avatarBlock.querySelector('input[type=file]');
  var avatarPreview = avatarBlock.querySelector('.ad-form-header__preview img');
  var housingPhotoBlock = adForm.querySelector('.ad-form__photo-container');
  var housingPhotoFileField = housingPhotoBlock.querySelector('input[type=file]');
  var housingPhotoPreview = housingPhotoBlock.querySelector('.ad-form__photo');

  var onAvatarFileFieldChange = function () {
    var file = avatarFileField.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var onHousingPhotoFileFieldChange = function () {
    var file = housingPhotoFileField.files[0];
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
        housingPhotoPreview.style.display = 'flex';
        housingPhotoPreview.innerHTML = '';
        housingPhotoPreview.appendChild(imageElement);
      });

      reader.readAsDataURL(file);
    }
  };

  avatarFileField.addEventListener('change', onAvatarFileFieldChange);
  housingPhotoFileField.addEventListener('change', onHousingPhotoFileFieldChange);
})();
