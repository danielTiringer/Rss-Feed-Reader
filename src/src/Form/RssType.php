<?php

namespace App\Form;

use App\Entity\Rss;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class RssType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', TextType::class, [
                'constraints' => [
                    new NotBlank([
                        'message' => 'RSS name cannot be blank.',
                    ]),
                    new Length([
                        'min' => 3,
                        'max' => 255,
                        'minMessage' => 'The RSS name has to be at least {{ limit }} characters long',
                        'maxMessage' => 'The entered RSS name has to be shorter than {{ limit }} characters.',
                    ]),
                ],
            ])
            ->add('url', TextType::class, [
                'constraints' => [
                    new NotBlank([
                        'message' => 'RSS name cannot be blank.',
                    ]),
                    new Length([
                        'min' => 5,
                        'max' => 255,
                        'minMessage' => 'The url has to be at least {{ limit }} characters long',
                        'maxMessage' => 'The entered url has to be shorter than {{ limit }} characters.',
                    ]),
                ],
            ])
            ->add('createdAt')
            ->add('updatedAt')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Rss::class,
        ]);
    }
}
