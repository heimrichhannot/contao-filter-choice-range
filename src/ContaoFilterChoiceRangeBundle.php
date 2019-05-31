<?php


namespace HeimrichHannot\ContaoFilterChoiceRangeBundle;

use HeimrichHannot\ContaoFilterChoiceRangeBundle\DependencyInjection\ContaoFilterChoiceRangeExtension;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class ContaoFilterChoiceRangeBundle extends Bundle
{
    /**
     * {@inheritdoc}
     */
    public function getContainerExtension()
    {
        return new ContaoFilterChoiceRangeExtension();
    }
}