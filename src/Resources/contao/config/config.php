<?php

if (System::getContainer()->get('huh.utils.container')->isFrontend()) {
    $GLOBALS['TL_JAVASCRIPT']['contao-filter-choice-range-bundle'] = 'bundles/contaofilterchoicerange/js/contao-filter-choice-range-bundle.js|static';
}