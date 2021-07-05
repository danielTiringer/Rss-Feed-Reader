<?php

namespace App\Controller;

use App\Entity\Rss;
use App\Repository\RssRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
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

    #[Route('/read', name: 'api_rss_read', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $rss = $this->rssRepository->findAll();

        $rssArray = [];
        foreach ($rss as $feed) {
            $rssArray[] = $feed->toArray();
        }

        return $this->json($rssArray);
    }

    #[Route('/create', name: 'api_rss_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $content = json_decode($request->getContent());

        $rss = new Rss();
        $rss->setTitle($content->title);
        $rss->setUrl($content->url);

        try {
           $this->entityManager->persist($rss);
           $this->entityManager->flush();
        } catch (Exception $e) {
            return $this->json([
                'message' => [
                    'level' => 'error',
                    'text' => [
                        'Could not save the database..',
                    ],
                ],
            ]);
        }

        return $this->json([
            'rss' => $rss->toArray(),
            'message' => [
                'level' => 'success',
                'text' => [
                    'The RSS was successfully created.',
                    'Title: ' . $content->title,
                ],
            ],
        ]);
    }

    #[Route('/update/{id}', name: 'api_rss_update', methods: ['PUT'])]
    public function update(Request $request, Rss $rss): JsonResponse
    {
        $content = json_decode($request->getContent());

        $rss->setTitle($content->title);
        $rss->setUrl($content->url);

        try {
           $this->entityManager->persist($rss);
           $this->entityManager->flush();
            return $this->json([
                'rss' => $rss->toArray(),
                'message' => 'The RSS was successfully updated.',
            ]);
        } catch (Exception $e) {

        }
    }

    #[Route('/delete/{id}', name: 'api_rss_delete', methods: ['DELETE'])]
    public function delete(Rss $rss): JsonResponse
    {
        try {
            $this->entityManager->remove($rss);
            $this->entityManager->flush();
        } catch (Exception $e) {

        }

        return $this->json([
            'message' => 'The RSS was successfully deleted.',
        ]);
    }
}
