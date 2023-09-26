// Page init function
$(document).ready(initPage);

function initPage() {
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });

  openAllSections();
  closeAllSections();

  toggleSection();

  $('.grid').masonry({
    // options
    itemSelector: '.grid-item',
    columnWidth: '.grid-item',
    percentPosition: true
  });
}

function openAllSections() {
  $('.all-section-open').click(function () {
    $('.collapse').collapse('show');

    setTimeout(function () {
      $('.grid').masonry('layout');
    }, 400);
  });
}

function closeAllSections() {
  $('.all-section-close').click(function () {
    $('.collapse').collapse('hide');
    setTimeout(function () {
      $('.grid').masonry('layout');
    }, 400);
  });
}

function toggleSection() {
  $('.grid-item .heading').click(function () {
    setTimeout(function () {
      $('.grid').masonry('layout');
    }, 400);
  });
}
