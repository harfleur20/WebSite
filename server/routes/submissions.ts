import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get submissions for a competition
router.get('/competition/:competitionId', async (req, res) => {
  try {
    const submissions = await prisma.submission.findMany({
      where: { competitionId: req.params.competitionId },
      include: {
        user: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// Submit entry
router.post('/', auth, async (req: any, res) => {
  try {
    const { title, description, fileUrl, competitionId } = req.body;

    const submission = await prisma.submission.create({
      data: {
        title,
        description,
        fileUrl,
        userId: req.user.id,
        competitionId
      }
    });

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create submission' });
  }
});

export default router;