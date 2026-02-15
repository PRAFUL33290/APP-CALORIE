export function calculerMetabolisme(sexe, poids, taille, age) {
  if (sexe === 'homme') {
    return 10 * poids + 6.25 * taille - 5 * age + 5;
  }
  return 10 * poids + 6.25 * taille - 5 * age - 161;
}

export function calculerObjectifCalories(metabolisme, activite, objectif) {
  const facteurs = {
    sedentaire: 1.2,
    leger: 1.375,
    modere: 1.55,
    actif: 1.725,
    tres_actif: 1.9,
  };

  const maintenance = metabolisme * facteurs[activite];

  switch (objectif) {
    case 'perte': return Math.round(maintenance - 500);
    case 'maintien': return Math.round(maintenance);
    case 'prise': return Math.round(maintenance + 300);
    default: return Math.round(maintenance);
  }
}
