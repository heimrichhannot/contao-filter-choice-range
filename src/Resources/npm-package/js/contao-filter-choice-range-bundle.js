import noUiSlider from 'nouislider';
import { FilterBundle } from "@hundh/contao-filter-bundle";
import 'nouislider/distribute/nouislider.css';

// TODO: babel src/Resources/assets/js --out-dir src/Resources/public/js

class FilterChoiceRangeBundle {

  static init() {
    FilterChoiceRangeBundle.initRangeSlider();
    FilterChoiceRangeBundle.initObserver();
  }


  static initRangeSlider() {
    document.querySelectorAll('[data-range]').forEach((elem) => {
      let range = JSON.parse(elem.getAttribute('data-steps')),
          checked = elem.querySelector('input:checked'),
          start = checked ? checked.value : 0;

      if (elem.querySelector('.noUi-base')) {
        elem.noUiSlider.destroy();
      }

      noUiSlider.create(elem, {
        start: start,
        snap: true,
        range: range,
      });

      if (elem.querySelector('.noUi-base')) {
        FilterChoiceRangeBundle.visibleForSROnly(elem);
      }


      elem.noUiSlider.on('update', function() {
        FilterChoiceRangeBundle.updateLabel(elem);
      });

      elem.noUiSlider.on('change', function() {
        let value = Math.floor(elem.noUiSlider.get());

        console.log(value);
        if (0 === value) {
          elem.querySelector('input:checked').checked = false;
          FilterBundle.asyncSubmit(elem.closest('form'));
        } else {
          elem.querySelector('[value="' + value + '"]').click();
        }
      });
    });
  }

  static initObserver() {
    let initialized = false,
        observer = new MutationObserver(function(mutations) {
          mutations.forEach((mutation) => {
            if (mutation.target.getAttribute('data-submit-success') && mutation.target.querySelector('[data-range]') && !initialized) {
              FilterChoiceRangeBundle.init();
              initialized = true;
            }
          });
        });

    document.querySelectorAll('.mod_filter form').forEach((form) => {
      observer.observe(form, {attributes: true, childList: true, characterData: true});
    });
  }

  static visibleForSROnly(field) {
    field.querySelectorAll('.form-check, input, label').forEach((elem) => {
      elem.classList.add('sr-only');
    });
  }

  static updateLabel(elem) {
    let label = elem.parentNode.querySelector('.checkedValue');

    if (label) {
      label.textContent = FilterChoiceRangeBundle.getLabelFromMapping(elem, Math.floor(elem.noUiSlider.get()));
      return;
    }

    label = document.createElement('label');
    label.classList.add('checkedValue');
    label.textContent = elem.getAttribute('data-label');
    elem.parentNode.insertBefore(label, elem.nextSibling);
  }

  static getLabelFromMapping(elem, value) {
    let mapping = JSON.parse(elem.getAttribute('data-titles'));

    if (!mapping[value]) {
      return elem.getAttribute('data-default-label');
    }

    return mapping[value];
  }
}

export {FilterChoiceRangeBundle};
