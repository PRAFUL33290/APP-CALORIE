import { Router } from 'express';
import Anthropic from '@anthropic-ai/sdk';

const router = Router();

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

router.post('/', async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'Image requise' });
    }

    const response = await client.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: image,
              },
            },
            {
              type: 'text',
              text: `Tu es un nutritionniste expert. Analyse cette photo de repas.

Identifie chaque aliment visible et estime ses valeurs nutritionnelles.

Réponds UNIQUEMENT en JSON valide avec cette structure exacte :
{
  "nom_plat": "Nom descriptif du plat",
  "aliments": [
    {
      "nom": "Nom de l'aliment",
      "portion_g": 150,
      "calories": 200,
      "proteines": 25,
      "glucides": 10,
      "lipides": 8,
      "position": { "x": 50, "y": 30 }
    }
  ],
  "total": {
    "calories": 0,
    "proteines": 0,
    "glucides": 0,
    "lipides": 0
  },
  "score_sante": 8,
  "commentaire": "Conseil nutritionnel court et personnalisé."
}

Règles :
- Estime les portions en grammes de manière réaliste
- Le score_sante est sur 10 (10 = très équilibré)
- position.x et position.y sont des pourcentages (0-100) indiquant où l'aliment se trouve sur la photo
- Calcule correctement le total en additionnant tous les aliments
- Le commentaire doit être en français, bienveillant et utile`,
            },
          ],
        },
      ],
    });

    const text = response.content[0].text;
    const result = JSON.parse(text);
    res.json(result);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Erreur lors de l\'analyse' });
  }
});

export default router;
