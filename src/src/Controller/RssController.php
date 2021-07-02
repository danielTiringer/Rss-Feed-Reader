<?php

namespace App\Controller;

use App\Repository\RssRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/rss', name: 'rss')]
class RssController extends AbstractController
{
    /**  @var EntityManagerInterface */
    private $entityManager;

    /** @var RssRepository */
    private $rssRepository;

    public function __construct(EntityManagerInterface $entityManager, RssRepository $rssRepository)
    {
        $this->entityManager = $entityManager;
        $this->rssRepository = $rssRepository;
    }

    #[Route('/read', name: 'rss')]
    public function index(): Response
    {
        $rss = $this->rssRepository->findAll();

        $rssArray = [];
        foreach ($rss as $feed) {
            $rssArray[] = $feed->toArray();
        }

        return $this->json($rssArray);
    }
}
