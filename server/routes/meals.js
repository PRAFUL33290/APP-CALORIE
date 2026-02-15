import { Router } from 'express';
import { createClient } from '@supabase/supabase-js';

const router = Router();

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'placeholder-key'
);

router.get('/', async (req, res) => {
  try {
    const { date } = req.query;
    let query = supabase
      .from('repas')
      .select('*')
      .eq('user_id', req.userId)
      .order('created_at', { ascending: false });

    if (date) {
      query = query.eq('date', date);
    }

    const { data, error } = await query;
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Meals fetch error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des repas' });
  }
});

router.post('/', async (req, res) => {
  try {
    const mealData = {
      ...req.body,
      user_id: req.userId,
    };

    const { data, error } = await supabase
      .from('repas')
      .insert(mealData)
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    console.error('Meal creation error:', error);
    res.status(500).json({ error: 'Erreur lors de la création du repas' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('repas')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', req.userId);

    if (error) throw error;
    res.json({ success: true });
  } catch (error) {
    console.error('Meal deletion error:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression du repas' });
  }
});

export default router;
