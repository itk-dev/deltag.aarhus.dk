let fromTimeField = document.querySelector('#edit-field-first-meeting-time-wrapper .form-time');
let toTimeField = document.querySelector('#edit-field-last-meeting-time-wrapper .form-time');
let hideTimeCheckbox = document.querySelector('#edit-field-hide-time-value');

hideTimeCheckbox.addEventListener('click', function(event) {
  fromTimeField.classList.toggle('hidden')
  toTimeField.classList.toggle('hidden')
  if (fromTimeField.classList.contains('hidden')) {
    fromTimeField.value = '00:00';
    toTimeField.value = '23:59';
  }
  else {
    const now = new Date();
    const currentHours = ("0" + now.getHours()).slice(-2);
    const currentMinutes = ("0" + now.getMinutes()).slice(-2);
    fromTimeField.value = currentHours + ':' + currentMinutes;
    toTimeField.value = currentHours + ':' + currentMinutes;
  }
})

if (hideTimeCheckbox.checked) {
  fromTimeField.classList.toggle('hidden')
  toTimeField.classList.toggle('hidden')
  fromTimeField.value = '00:00';
  toTimeField.value = '23:59';
}
