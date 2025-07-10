import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req, res) => {
  const { email, prenom } = req.body;

  const { data, error } = await supabase
    .from('leads')
    .insert([{ email, prenom }]);

  if (error) return res.status(500).json({ message: "Erreur inscription." });

  await resend.emails.send({
    from: 'Morgane <hello@tondomaine.com>',
    to: email,
    subject: "📥 Ton guide est prêt !",
    html: `<p>Bonjour ${prenom},</p><p>Voici ton guide à télécharger : <a href="https://feminineescapes.com/files/leadmagnet.pdf">Télécharger le guide</a></p><p>On se retrouve bientôt avec d’autres pépites pour t’aider à construire ton business aligné.</p>`
  });

  return res.status(200).json({ message: "Le guide a été envoyé par email ! 🎁" });
}