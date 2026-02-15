const API_URL = import.meta.env.VITE_API_URL || '';

function getToken() {
  const session = JSON.parse(localStorage.getItem('supabase-session') || '{}');
  return session.access_token || '';
}

export async function analyserPhoto(imageBase64) {
  const response = await fetch(`${API_URL}/api/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify({ image: imageBase64 }),
  });

  if (!response.ok) throw new Error("Erreur lors de l'analyse");
  return response.json();
}
