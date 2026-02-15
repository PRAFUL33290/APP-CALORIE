import { useState, useCallback } from 'react';
import { supabase } from '../services/supabase';

export function useRepas(userId) {
  const [repas, setRepas] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRepas = useCallback(async (date) => {
    if (!userId) return;
    setLoading(true);
    let query = supabase
      .from('repas')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (date) {
      query = query.eq('date', date);
    }

    const { data, error } = await query;
    if (!error) setRepas(data || []);
    setLoading(false);
    return data;
  }, [userId]);

  const ajouterRepas = useCallback(async (repasData) => {
    if (!userId) return;
    const { data, error } = await supabase
      .from('repas')
      .insert({ ...repasData, user_id: userId })
      .select()
      .single();
    if (error) throw error;
    setRepas(prev => [data, ...prev]);
    return data;
  }, [userId]);

  const supprimerRepas = useCallback(async (repasId) => {
    const { error } = await supabase
      .from('repas')
      .delete()
      .eq('id', repasId);
    if (error) throw error;
    setRepas(prev => prev.filter(r => r.id !== repasId));
  }, []);

  return { repas, loading, fetchRepas, ajouterRepas, supprimerRepas };
}
