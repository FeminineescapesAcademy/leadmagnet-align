import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée.' });
  }

  const { email, prenom } = req.body;

  if (!email || !prenom) {
    return res.status(400).json({ message: "Champs manquants." });
  }

  const { error } = await supabase
    .from('leadmagnet_prompt')
    .insert([{ email, prenom }]); // ⚠️ On utilise un champ "email" classique, à créer si besoin

  if (error) {
    console.error("Erreur Supabase :", error);
    return res.status(500).json({ message: "Erreur d'enregistrement." });
  }

  try {
    await resend.emails.send({
      from: 'Morgane <contact@feminineescapes.com>',
      to: email,
      subject: "📥 Voici ton guide + un premier déclic pour toi ✨",
      html: `
        <p>Bonjour ${prenom},</p>
        <p>Voici le lien pour télécharger ton guide « <strong>55 prompts alignés pour magnétiser ta communauté et vendre sans forcer</strong> » :</p>
        <p>👉 <a href="https://res.cloudinary.com/diapyc6q1/raw/upload/55_Prompts_alignés_pour_magnétiser_ta_communauté_et_vendre_sans_forcer_compressed_xefz6p.pdf">Télécharger le guide maintenant</a></p>
        <hr />
        <p>Avant de foncer dans les prompts, je t’invite à faire une pause de 2 minutes.</p>
        <p>Demande-toi : <em>« Qu’est-ce que j’ai vraiment envie de construire ? »</em><br>
        Et <em>« À quoi j’aimerais que mes mots servent dans le monde ? »</em></p>
        <p>Parce que ces prompts ne sont pas là juste pour “produire du contenu”.<br>
        Ils sont là pour t’aider à reconnecter à ton message, et à créer depuis un espace puissant & aligné.</p>
        <p>Demain, tu recevras un email avec les 3 pièges les plus fréquents que je vois chez les femmes qui veulent se lancer... et comment les éviter 🔥</p>
        <p>Avec cœur,<br>Morgane</p>
      `
    });

    return res.status(200).json({ message: "Le guide a été envoyé par email ! 🎁" });

  } catch (err) {
    console.error("Erreur envoi email :", err);
    return res.status(500).json({ message: "Erreur lors de l'envoi du mail." });
  }
}