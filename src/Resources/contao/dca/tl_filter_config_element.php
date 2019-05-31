<?php
$dca = &$GLOBALS['TL_DCA']['tl_filter_config_element'];

/**
 * Selectors
 */

/**
 * Palettes
 */
$dca['palettes'][\HeimrichHannot\FilterBundle\Filter\Type\ChoiceType::TYPE] = str_replace(',inputGroup',',useRangeSlider,inputGroup',$dca['palettes'][\HeimrichHannot\FilterBundle\Filter\Type\ChoiceType::TYPE]);

/**
 * Subpalettes
 */

/**
 * Fields
 */
$dca['fields']['useRangeSlider'] = [
    'label'     => &$GLOBALS['TL_LANG']['tl_filter_config_element']['useRangeSlider'],
    'exclude'   => true,
    'inputType' => 'checkbox',
    'eval'      => ['tl_class' => 'w50'],
    'sql'       => "char(1) NOT NULL default ''",
];
