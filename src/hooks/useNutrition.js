import { useMemo } from 'react';
import { calculerBesoins } from '../services/nutrition';

export function useNutrition(profile, repasJour = []) {
  const besoins = useMemo(() => {
    if (!profile || !profile.sexe || !profile.poids_actuel || !profile.taille_cm || !profile.age) {
      return { objectifCalories: 2000, macros: { proteines: 150, glucides: 225, lipides: 56 } };
    }
    return calculerBesoins(profile);
  }, [profile]);

  const consomme = useMemo(() => {
    return repasJour.reduce(
      (acc, r) => ({
        calories: acc.calories + (r.total_calories || 0),
        proteines: acc.proteines + (r.total_proteines || 0),
        glucides: acc.glucides + (r.total_glucides || 0),
        lipides: acc.lipides + (r.total_lipides || 0),
      }),
      { calories: 0, proteines: 0, glucides: 0, lipides: 0 }
    );
  }, [repasJour]);

  const restant = useMemo(() => ({
    calories: Math.max(0, besoins.objectifCalories - consomme.calories),
    proteines: Math.max(0, (besoins.macros?.proteines || 0) - consomme.proteines),
    glucides: Math.max(0, (besoins.macros?.glucides || 0) - consomme.glucides),
    lipides: Math.max(0, (besoins.macros?.lipides || 0) - consomme.lipides),
  }), [besoins, consomme]);

  return { besoins, consomme, restant };
}
