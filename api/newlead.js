await resend.emails.send({
  from: 'Morgane <contact@feminineescapes.com>',
  to: email,
  subject: "📥 Voici ton guide + un premier déclic pour toi ✨",
  html: `
  <div style="font-family: 'Cormorant Garamond', serif; background-color: #FFE3D9; padding: 40px; color: #190B40;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 16px; padding: 32px; box-shadow: 0 8px 24px rgba(0,0,0,0.05);">
      <img src="https://res.cloudinary.com/diapyc6q1/image/upload/v1752113403/Logo_seul_fd_beig_j0oskb.png" alt="Logo Feminine Escapes" style="max-width: 80px; display: block; margin: 0 auto 24px;" />

      <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 24px; text-align: center;">Bonjour ${prenom},</h1>

      <p style="font-size: 18px; line-height: 1.6;">Voici le lien pour télécharger ton guide :<br><strong>55 prompts alignés pour magnétiser ta communauté et vendre sans forcer</strong></p>

      <p style="margin: 24px 0;">
        <a href="https://res.cloudinary.com/diapyc6q1/raw/upload/55_Prompts_alignés_pour_magnétiser_ta_communauté_et_vendre_sans_forcer_compressed_xefz6p.pdf"
          style="display: inline-block; background-color: #190B40; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
          📩 Télécharger le guide
        </a>
      </p>

      <hr style="margin: 32px 0; border: none; border-top: 1px solid #EEE;" />

      <p style="font-size: 18px; line-height: 1.6;">Avant de foncer dans les prompts, je t’invite à faire une pause de 2 minutes.</p>

      <p style="font-size: 18px; line-height: 1.6;">
        Demande-toi : <em>« Qu’est-ce que j’ai vraiment envie de construire ? »</em><br>
        Et <em>« À quoi j’aimerais que mes mots servent dans le monde ? »</em>
      </p>

      <p style="font-size: 18px; line-height: 1.6;">
        Parce que ces prompts ne sont pas là juste pour “produire du contenu”.<br>
        Ils sont là pour t’aider à reconnecter à ton message, et à créer depuis un espace puissant & aligné.
      </p>

      <p style="font-size: 18px; line-height: 1.6;">
        💌 Demain, tu recevras un email avec les 3 pièges les plus fréquents que je vois chez les femmes qui veulent se lancer... et comment les éviter.
      </p>

      <p style="font-size: 18px; font-weight: bold; margin-top: 40px;">Avec cœur,<br>Morgane ✨</p>
    </div>
  </div>
  `
});