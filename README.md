📦 HappySendZipAfterPurchase.js

✨ Système d’envoi automatisé de fichier ZIP après achat Stripe, connecté à Supabase + Resend.

⸻

🪄 Description

Ce script permet d’envoyer automatiquement un fichier .zip à l’acheteur après un paiement Stripe réussi, sans plateforme tierce (pas de Gumroad, pas de Systeme.io), tout en :
	•	✉️ suivant les emails via Supabase,
	•	🔐 protégeant le lien du fichier,
	•	🔁 automatisant l’envoi via Resend (jusqu’à 3 000 mails gratuits/mois),
	•	💾 et en gardant une trace sécurisée de l’acheteur.

⸻

✅ Cas d’usage
	•	Envoi d’un ebook, d’un système, d’un bundle ou template
	•	Envoie d’un fichier Webflow clonable après achat
	•	Livraison automatisée d’un produit numérique de façon propre et sécurisée

⸻

🔧 Contenu du pack
📁 /api/
│   └── send-zip.js
📁 /public/
│   └── success.html (page affichée après achat)
📄 .env.example
📄 README.md (ce fichier)
📄 stripeWebhookSecret.json
⚙️ Configuration en 10 minutes

1. 🗝️ Variables d’environnement à renseigner (.env.local)
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
RESEND_API_KEY=...
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
FROM_EMAIL=contact@tondomaine.com
TO_EMAIL=automatique (l’email de l’acheteur)
ZIP_FILE_URL=https://tonsite.com/fichier.zip
2. 🗂️ Base de données Supabase attendue

Table recommandée : orders
Champs recommandés :
	•	email (text)
	•	product_name (text)
	•	delivery_status (boolean)
	•	purchase_date (timestamp)

⸻

3. 🔗 Stripe – webhook à connecter

Connecte l’URL du script send-zip.js à ton dashboard Stripe :
Ex : https://tonsite.com/api/send-zip
Événement à capter :
checkout.session.completed
4. 📤 Fonctionnement
	1.	L’acheteur paie via Stripe
	2.	Stripe appelle le webhook send-zip.js
	3.	Le script :
	•	vérifie la transaction,
	•	récupère l’email,
	•	envoie le ZIP avec Resend,
	•	enregistre la commande dans Supabase
	4.	Redirection vers /public/success.html ou autre URL personnalisée

⸻

🛡️ Sécurité
	•	Le lien du ZIP peut être caché derrière un Cloudflare Worker ou expirable
	•	Le script n’expose aucune clé côté client
	•	L’envoi se fait uniquement après vérification de paiement Stripe

⸻

🔁 Licence marque blanche

Tu peux :
	•	Modifier le script et l’adapter à ton branding
	•	L’utiliser dans tes propres tunnels
	•	Le revendre à tes clientes (si tu as acheté la version “Full Licence”)
📞 Support

Inclut :
	•	1 guide PDF d’installation
	•	1 exemple de fichier .env
	•	1 version simplifiée pour send-pdf.js si besoin
