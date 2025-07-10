// ✅ SCRIPT FINAL – /api/send-sequence.js – J+1, J+3, J+7 avec CRON_SECRET + alerte email automatique

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Connexion Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // 🔒 Vérification du CRON_SECRET
  if (
    process.env.CRON_SECRET &&
    req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return res.status(401).json({ error: 'Non autorisé' });
  }

  const { data: leads, error } = await supabase
    .from('Leadmagnet 55 prompt gpt')
    .select('*');

  if (error) {
    await notifyError('Erreur Supabase (SELECT) : ' + JSON.stringify(error));
    return res.status(500).json({ error: 'Erreur Supabase' });
  }

  const now = new Date();

  try {
    for (const lead of leads) {
      const created = new Date(lead.created_at);
      const daysSince = Math.floor((now - created) / (1000 * 60 * 60 * 24));

      // === EMAIL 2 : J+1 ===
      if (daysSince >= 1 && !lead.email2_sent) {
        await resend.emails.send({
          from: 'Morgane <contact@feminineescapes.com>',
          to: lead.email,
          subject: '🔥 Ce qui te bloque vraiment (et comment t’en libérer)',
          html: `
          <p>Bonjour ${lead.prenom},</p>
          <p>Hier, tu as reçu le guide. Mais laisse-moi te dire un truc qu’on ne t’a peut-être jamais dit clairement…</p>
          <p>Tu ne manques pas de motivation. Tu n’es pas “trop dispersée”.</p>
          <p>Tu es juste en train d’essayer de construire ton projet… sans fondations solides.</p>
          <p>Ce qui te bloque, ce sont ces 3 pièges invisibles :</p>
          <ul>
            <li>Tu essaies de tout faire en même temps sans vraie stratégie</li>
            <li>Tu crois encore que tu dois être “prête” pour te lancer</li>
            <li>Tu avances seule, sans structure, sans feedback</li>
          </ul>
          <p><strong>Align & Build</strong> est l’espace simple et stratégique que tu cherches pour avancer dès maintenant.</p>
          <p>👉 <a href="https://www.feminineescapes.com/fr/align-build">Je découvre Align & Build</a></p>
          <p>Avec toi,<br>Morgane</p>
          `,
        });
        await supabase
          .from('Leadmagnet 55 prompt gpt')
          .update({ email2_sent: true })
          .eq('email', lead.email);
      }

      // === EMAIL 3 : J+3 ===
      if (daysSince >= 3 && !lead.email3_sent) {
        await resend.emails.send({
          from: 'Morgane <contact@feminineescapes.com>',
          to: lead.email,
          subject: '💡 Et si c’était juste le bon moment ?',
          html: `
          <p>${lead.prenom},</p>
          <p>Tu sais ce que me disent les femmes que j’accompagne ?</p>
          <blockquote>“J’ai hésité… et puis j’ai compris qu’il n’y aurait jamais de moment parfait.”</blockquote>
          <p>Tu as déjà ce qu’il faut en toi. Ce qu’il te manque, c’est un plan clair, du soutien, et un cadre pour traduire tes idées en action.</p>
          <p><strong>Align & Build</strong> est conçu pour ça : un espace clair, motivant et activant.</p>
          <p>🎁 Et franchement… pour 33€, c’est le prix d’un resto. Sauf que là, tu nourris ton avenir.</p>
          <p>👉 <a href="https://www.feminineescapes.com/fr/align-build">Je rejoins maintenant</a></p>
          <p>Avec foi,<br>Morgane ✨</p>
          `,
        });
        await supabase
          .from('Leadmagnet 55 prompt gpt')
          .update({ email3_sent: true })
          .eq('email', lead.email);
      }

      // === EMAIL 4 : J+7 ===
      if (daysSince >= 7 && !lead.email4_sent) {
        await resend.emails.send({
          from: 'Morgane <contact@feminineescapes.com>',
          to: lead.email,
          subject: '⏳ Tu vas vraiment laisser passer cette chance ?',
          html: `
          <p>${lead.prenom},</p>
          <p>Ça fait une semaine que tu as reçu le guide. Et si tu lis encore mes mails, c’est qu’une partie de toi SAIT qu’elle a besoin d’agir.</p>
          <p>Mais l’autre partie hésite. Elle attend un signe. Une preuve. Un coup de pied au cul, peut-être.</p>
          <p>Alors le voici :</p>
          <p><strong>Align & Build</strong> est accessible maintenant. Mais si tu n’agis pas aujourd’hui, que se passera-t-il demain ? Tu reviendras à la case départ ?</p>
          <p>Tu veux des résultats différents ? Il faut oser faire un choix différent.</p>
          <p>👉 <a href="https://www.feminineescapes.com/fr/align-build">Accéder à Align & Build (33€)</a></p>
          <p>C’est ton moment.<br>Morgane</p>
          `,
        });
        await supabase
          .from('Leadmagnet 55 prompt gpt')
          .update({ email4_sent: true })
          .eq('email', lead.email);
      }
    }
  } catch (err) {
    await notifyError('Erreur dans boucle principale : ' + err.message);
  }

  res.status(200).json({ message: 'Séquence complète envoyée automatiquement.' });
}

// 🔔 Fonction d’alerte par email en cas de bug
async function notifyError(errorMessage) {
  await resend.emails.send({
    from: 'Morgane <contact@feminineescapes.com>',
    to: 'contact@feminineescapes.com',
    subject: '❌ Erreur lors de l’envoi automatique',
    html: `<p>Une erreur est survenue pendant la séquence auto :</p><pre>${errorMessage}</pre>`
  });
}