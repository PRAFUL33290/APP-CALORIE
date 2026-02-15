import { calculerMetabolisme, calculerObjectifCalories } from '../utils/calculations';

export function calculerBesoins(profil) {
  const { sexe, poids_actuel, taille_cm, age, niveau_activite, objectif_type } = profil;
  const metabolisme = calculerMetabolisme(sexe, poids_actuel, taille_cm, age);
  const objectifCalories = calculerObjectifCalories(metabolisme, niveau_activite, objectif_type);

  const macros = {
    proteines: Math.round((objectifCalories * 0.3) / 4),
    glucides: Math.round((objectifCalories * 0.45) / 4),
    lipides: Math.round((objectifCalories * 0.25) / 9),
  };

  return { metabolisme, objectifCalories, macros };
}
