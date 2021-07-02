<?php

namespace App\Controller;

use App\Entity\Rss;
use App\Repository\RssRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/rss', name: 'api_rss')]
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

    #[Route('/read', name: 'api_rss_read')]
    public function index(): Response
    {
        $rss = $this->rssRepository->findAll();

        $rssArray = [];
        foreach ($rss as $feed) {
            $rssArray[] = $feed->toArray();
        }

        return $this->json($rssArray);
    }

    #[Route('/create', name: 'api_rss_create')]
    public function create(Request $request): Response
    {
        $content = json_decode($request->getContent());

        $rss = new Rss();
        $rss->setTitle($content->title);
        $rss->setUrl($content->url);

        try {
           $this->entityManager->persist($rss);
           $this->entityManager->flush();
            return $this->json([
                'rss' => $rss->toArray(),
            ]);
        } catch (Exception $exception) {

        }

    }
}
