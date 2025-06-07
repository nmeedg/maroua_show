/app
│
├── layout.tsx                  # Layout global
├── page.tsx                    # Page d'accueil (/)
│
<!-- ├── events/                     # Tous les événements
│   ├── page.tsx                # Liste des événements (/events)
│   └── [id]/                   # Détail d’un événement
│       ├── page.tsx            # Page événement (/events/42)
│       └── reserve/            # Réserver pour un événement
│           └── page.tsx        # (/events/42/reserve) -->
│
├── tickets/                    # Gestion des tickets
│   ├── [ticketId]/             # Détail ticket
│   │   ├── page.tsx            # (/tickets/abc123)
│   │   └── download/           # Télécharger le ticket
│   │       └── page.tsx        # (/tickets/abc123/download)
│
├── dashboard/                  # Espace utilisateur connecté
│   ├── layout.tsx              # Layout utilisateur
│   ├── page.tsx                # Accueil dashboard (/dashboard)
│   ├── reservations/           # Liste des réservations
│   │   └── page.tsx            # (/dashboard/reservations)
│   └── profile/                # Profil utilisateur
│       └── page.tsx            # (/dashboard/profile)
│
<!-- ├── admin/                      # Espace admin
│   ├── layout.tsx              # Layout admin
│   ├── page.tsx                # Accueil admin (/admin)
│   ├── events/                 # CRUD des événements
│   │   ├── page.tsx            # Liste des événements
│   │   └── new/                # Créer un événement
│   │       └── page.tsx
│   └── reservations/           # Voir les réservations
│       └── page.tsx -->
│
├── auth/                       # Authentification
│   ├── login/                  # (/auth/login)
│   │   └── page.tsx
│   ├── register/               # (/auth/register)
│   │   └── page.tsx
│   └── logout/                 # Déconnexion
│       └── route.ts            # API route logout
