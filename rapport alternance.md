Jules Dubuy 2025 - 2026

# Automatisation d’indicateurs

# de fréquentation

```
Tuteur professionnel :
Jean-François Missou
```
```
Tuteur pédagogique :
Eric Payet
```
(^)


## Remerciement :

Durant mon alternance à la Communauté d'Agglomération de La Rochelle, j'ai eu l'opportunité de
travailler sur plusieurs projets Data. Ce rapport se concentre sur ma mission principale, réalisée pour
le service des musées. L'équipe Data ne pouvant pas traiter cette demande avant fin 2026, j'ai pris
en charge ce développement. L'objectif était de remplacer un traitement manuel par une
automatisation complète des indicateurs de fréquentation, en m'appuyant sur l'architecture
décisionnelle de la collectivité.

## Summary :

During my work-study placement at the La Rochelle Urban Community, I worked on several projects.
This report outlines my main assignment, initiated by the Museums Department. I was entrusted with
this project because the data team was unavailable to handle it before late 2026. The objective was
to automate the generation of attendance indicators for municipal museums by leveraging the local
authority's business intelligence architecture.


Remerciements :

Je souhaiterais commencer mon rapport en remerciant mon responsable professionnel Jean-
François Missou, ainsi que Sylvain Jorge Do Marco et Mickaël Aubry, qui m’ont tous trois
accompagné durant cette année d'alternance. Je leur suis reconnaissant d'avoir pris le temps de me
guider, de me corriger sur des points techniques et de considérer mes propositions de solutions.

Je remercie également l’ensemble des services de la DSI pour son accueil au sein de leur direction

Je tiens aussi à remercier M.Eric Payet mon tuteur enseignant, pour sa disponibilité ainsi que son
suivi durant cette année d’alternance.


## Sommaire

## Sommaire

- Résumé : Table des matières
- Summary :
- Remerciement :
- Sommaire
- Glossaire
- Introduction
   - 1. La Communauté d'Agglomération de La Rochelle (CdALR)
   - 2. La Direction des Systèmes d'Information (DSI)
   - 3. L’unité Web & Data
- I. Présentation de l’environnement technique
   - 1.1. Stockage et Versioning
   - 1.2. La chaîne logicielle
- II. Étude du projet : La fréquentation des musées
   - 2.1. Analyse du besoin métier et limites de l'existant
   - 2.2. Analyse et exploration de la source de données
- III. Réalisation technique : De l’extraction à la modélisation
   - 3.1. Conception et Modélisation du Data Warehouse (DWH)
   - 3.2. Architecture du Tunnel ETL avec Pentaho Data Integration (PDI)
   - 3.3. Automatisation, Ordonnancement et Data Quality
- IV : MISE À DISPOSITION UNIVERS ET REPORTING
   - 4.1. La couche sémantique (SAP IDT)
- Bilan et Perspectives
   - 1. Difficultés rencontrées
   - 2. Bilan professionnel


## Glossaire

Business Intelligence (BI) : Ensemble d'outils et de méthodes informatiques permettant de
collecter, consolider et modéliser les données d'une entreprise pour aider les directeurs à prendre
des décisions stratégiques.

DSA (Data Staging Area) : Zone d'atterrissage temporaire dans un système de données. C'est le
sas d'entrée où les données brutes sont copiées telles quelles depuis les logiciels d'origine, avant
d'être modifiées.

ODS (Operational Data Store) : Base de données intermédiaire située entre l'extraction brute et
l'entrepôt final. C'est "l'atelier" où les données sont nettoyées, où les doublons sont supprimés et
où les règles métiers sont appliquées.

DWH (Data Warehouse / Entrepôt de données) : Base de données finale, centralisée et
historisée, spécialement conçue pour que les requêtes d'analyse et les rapports s'exécutent très
rapidement.

ETL (Extract, Transform, Load) : Processus informatique en trois étapes qui consiste à Extraire
des données de diverses sources, les Transformer (nettoyer, filtrer, fusionner) puis les Charger
(Load) dans l'entrepôt de données cible.

Gestion de versions (Versioning) : Système (comme GitLab) permettant d'enregistrer l'historique
complet des modifications apportées à un code ou à un script. Il permet à plusieurs développeurs
de travailler ensemble sans écraser le travail des autres et de restaurer une ancienne version en
cas de panne.

KPI (Key Performance Indicator) : Indicateur clé de performance. C'est une métrique chiffrée
précise qui permet d'évaluer l'efficacité d'une action ou l'état d'une activité (par exemple : le taux
de remplissage d'une salle ou l'évolution des recettes d'une année sur l'autre).

Schéma en étoile : Manière d'organiser l'information dans un entrepôt de données. Une table
centrale regroupant les chiffres et les mesures (la table de faits) est entourée par plusieurs tables
descriptives (les tables de dimensions), formant ainsi une étoile.

SGBDR (Système de Gestion de Base de Données Relationnelle) : Logiciel (comme
PostgreSQL ou Microsoft SQL Server) qui permet de stocker, structurer et lier de très grandes
quantités de données sous forme de tableaux interconnectés.

SID (Système d'Information Décisionnel) : Architecture informatique globale (comprenant l'ETL,
l'entrepôt de données et les outils de reporting) mise en place pour fournir des indicateurs de
pilotage.

Table de dimensions : Dans un schéma en étoile, table contenant les caractéristiques qui
décrivent et donnent du contexte aux chiffres (le "Qui", le "Où", le "Quand", le "Quoi").

Table de faits : Dans un schéma en étoile, table centrale contenant les événements mesurables
et quantifiables (ex : le prix d'un billet, la quantité de réservations).

Univers (Couche sémantique) : Dans la suite SAP, c'est le "traducteur" qui transforme le langage
informatique de la base de données (le code SQL) en concepts métiers compréhensibles (ex :
transformer la colonne id_prod en Nom du produit), permettant aux utilisateurs de créer leurs
propres requêtes sans savoir coder.


## Introduction

```
Aujourd'hui, l'exploitation de la donnée est devenue un enjeu majeur pour les administrations
publiques, notamment dans la gestion des politiques culturelles.
```
### 1. La Communauté d'Agglomération de La Rochelle (CdALR)

```
L'Agglomération regroupe 28 communes et rassemble plus de 182 435 habitants. Son rôle est de
mutualiser et de coordonner les services sur le territoire, que ce soit pour la mobilité, l'environnement
ou la culture. En interne, on compte 6 grandes directions qui pilotent une soixantaine de services
opérationnels.
```
### 2. La Direction des Systèmes d'Information (DSI)

```
Suite à une fusion entre les services de l'Agglo et ceux de la Ville, la DSI pilote aujourd'hui l'ensemble
de la transformation numérique de ces 60 services. Elle se divise en trois grands pôles :
```
```
● Les infrastructures et réseaux (serveurs et sécurité).
● Le support (assistance quotidienne aux agents).
● Le service Applications (déploiement et maintien des logiciels métiers).
```
### 3. L’unité Web & Data

```
J’ai intégré l'unité Web & Data, qui dépend du service Applications. Nous sommes une équipe à
taille humaine : 5 titulaires, 1 consultant externe, et moi-même en apprentissage.
```
```
Notre rôle est très transversal :
● Alimenter le SID (Système d'Information Décisionnel) : on extrait, nettoie et charge les
données des logiciels métiers vers notre infocentre PostgreSQL.
● Créer des rapports : on aide les directions à piloter leur activité via des tableaux de bord
Dataviz.
● Gérer l'Open Data et l'interopérabilité : on publie des jeux de données pour les citoyens et
on assure le transit de l'information entre les différentes "briques" logicielles de la mairie.
```
```
Depuis 2024, le grand chantier de l'équipe est la migration de notre outil décisionnel. Nous
abandonnons Vanilla, devenu vieillissant et peu ergonomique, pour basculer sur SAP
BusinessObjects (SAP BO) d'ici fin 2026. Mes collègues étant mobilisés à 100 % sur cette transition
complexe, j'ai eu la chance de piloter mes propres projets métiers de A à Z.
```

## I. Présentation de l’environnement technique

Pour garantir la fiabilité de notre SID, la cellule Web & Data s'appuie sur une architecture et des
outils bien spécifiques. Au sein de la cellule Web & Data, l'architecture logicielle est conçue pour
assurer l'ensemble du cycle de vie de la donnée : de son extraction depuis les applications métiers
jusqu'à sa restitution aux utilisateurs finaux. Cette partie présente l'écosystème de stockage et de
versioning, ainsi que la stack technique utilisée au quotidien.

### 1.1. Stockage et Versioning

Toutes nos données préparées atterrissent dans un entrepôt sous PostgreSQL. C'est un choix très
pragmatique : c'est open-source, robuste, et les agents de la géomatique maîtrisaient déjà
parfaitement ce langage. Au quotidien, j'utilise l'outil DBeaver pour requêter la base, vérifier mes
types de données et auditer nos différents schémas (DSA, ODS, DWH).

En parallèle, travailler à sept sur du code exige de l'organisation. Nous utilisons GitLab pour
versionner tous nos scripts et flux ETL. Cela nous permet de travailler sur des branches séparées
et d'éviter d'écraser le travail d'un collègue par erreur.

### 1.2. La chaîne logicielle

Le trajet de la donnée se fait en trois temps :

```
● L'intégration (PDI) : J'utilise Pentaho Data Integration (aussi appelé Kettle). C'est un
moteur ETL visuel qui me permet de nettoyer les données, de faire mes jointures et de
filtrer les lignes indésirables.
● L'orchestration (Jenkins) : Rien ne se fait à la main. Jenkins lance automatiquement mes
scripts PDI la nuit ou le week-end. Si un flux plante, l'outil nous alerte directement pour
qu'on garde la main sur la qualité des données.
● La restitution (SAP BO) : Pour la restitution finale, nous avons opté pour SAP.
Contrairement à Vanilla, SAP BO est beaucoup plus moderne, sécurisé et surtout plus
simple à utiliser pour les agents qui n'ont pas de bagage informatique.
```
Figure : Chaine Logicielle


## II. Étude du projet : La fréquentation des musées

La transition vers un système décisionnel automatisé nécessite une compréhension approfondie des
processus métiers existants et une analyse rigoureuse des sources de données. Ce chapitre détaille
l'expression des besoins des musées de La Rochelle, les limites du système mis en place, ainsi que
la méthodologie d'exploration technique de la base de données source.

### 2.1. Analyse du besoin métier et limites de l'existant

2.1.1. Le fonctionnement historique et ses limites

La ville de La Rochelle gère trois grands établissements culturels : le Musée Maritime, le Musée du
Nouveau Monde et le Muséum d’Histoire Naturelle. Pour leur billetterie, ces sites utilisent
GTS_vision, un logiciel externe fourni par Vivaticket.

Avant que je ne reprenne le projet, le suivi de fréquentation était un processus lourd. Chaque mois,
un agent exportait un tableau brut depuis l'application. Ce fichier n'étant pas exploitable en l'état, il
devait reporter manuellement les chiffres dans un fichier Excel interne pour calculer ses indicateurs.
Ce fonctionnement posait trois problèmes majeurs :

```
● Perte de temps humain sur des tâches répétitives et à faible valeur ajoutée.
● Risque élevé d'erreurs de saisie lors du recodage manuel des données.
● Hétérogénéité des calculs selon l'opérateur chargé de la consolidation.
```
Autre point critique : la classification des billets n'était pas fiable. En interne, les catégories étaient
gérées de façon assez empirique. Si l'agent connaissait l'arborescence par cœur, il arrivait à classer
le billet ; sinon, la donnée restait non qualifiée. Ce flou posait un vrai problème aux directions des
musées. Leur objectif numéro un est d'analyser mensuellement les types de publics (touristes,
scolaires, abonnés) pour évaluer l’impact de leurs expositions et de leurs actions de médiation
(ateliers, centres de loisirs). Sans données propres, cela aurait été impossible à réaliser.

2.1.2. Immersion et évolution de la demande

En décembre, je suis allé à la rencontre du personnel des musées. Le but était de comprendre leur
quotidien et de leur montrer concrètement ce que l'informatique décisionnelle pouvait leur apporter.

En discutant avec eux, j'ai identifié un nouveau besoin essentiel : le suivi des réservations de salles.
Ils devaient pouvoir anticiper l'occupation de leurs espaces pour planifier les emplois du temps des
guides et mobiliser le personnel d'accueil. Pour y répondre, le livrable métier attendu était clair : un
fichier Excel automatisé avec une ligne par réservation et des colonnes détaillant la date, la salle, le
type d'événement et l'effectif prévu.


### 2.2. Analyse et exploration de la source de données

2.2.1. La complexité de la base de données source

La base GTS_vision tourne sur MS SQL Server. Comme c'est un logiciel pensé pour des
mastodontes culturels (il équipe notamment le Musée du Louvre), sa base est extrêmement vaste
et complexe, avec plus de 700 tables.

Évidemment, à l'échelle de La Rochelle, les musées n'utilisent qu'une infime partie des
fonctionnalités, ce qui laissait beaucoup de tables totalement vides. Pour partir sur des bases saines,
j'ai d'abord dû cartographier ce bazar. J'ai lancé une requête SQL sur le dictionnaire de données du
serveur pour compter le nombre de lignes dans chaque table. Ce premier tri m'a permis d'écarter le
"bruit" de la base et de n'isoler que les 300 tables qui contenaient réellement de l'information.

2.2.2. La méthodologie d'exploration : le tracé de la donnée

L'absence de documentation technique sur le modèle de GTS_vision a été ma plus grande difficulté.
Pour comprendre comment les tables communiquaient entre elles, j'ai dû reconstituer le modèle
moi-même, en explorant la base comme un labyrinthe.

Je suis parti de points d'entrée que je connaissais (comme la table des produits ou des catégories)
pour remonter petit à petit, de jointure en jointure, jusqu'aux tables des ventes. Ce travail de pistage
m'a demandé une analyse très fine des clés primaires et étrangères pour comprendre comment
l'application reliait un visiteur à son billet.

Une fois ce tri effectué, j'ai pu mettre de côté l'essentiel des 300 tables actives pour me dessiner un
schéma conceptuel simplifié. C'est cette base de travail qui m'a permis de construire mes flux
d'alimentation vers l'infocentre, en étant sûr de n'extraire que la donnée utile et fiable.


## III. Réalisation technique : De l’extraction à la modélisation

La réalisation technique de ce projet s'est découpée en trois grandes étapes : la modélisation de
l'entrepôt de données (Data Warehouse), la configuration du tunnel d'extraction (ETL), et enfin
l'automatisation du processus.

### 3.1. Conception et Modélisation du Data Warehouse (DWH)

3.1.1. Schéma en étoile

Pour structurer l'entrepôt sous PostgreSQL, j'ai opté pour un schéma en étoile. Ce modèle est parfait
pour notre projet décisionnel pour deux raisons :
● La rapidité des requêtes : Contrairement à un schéma en flocons très normalisé, le schéma
en étoile limite les jointures complexes et offre d'excellents temps de réponse.

```
● La simplicité pour les utilisateurs : Séparer clairement les axes d'analyse (les dimensions)
et les chiffres purs (les faits) rend la base très facile à lire. C'est un atout majeur pour
transposer ensuite ce modèle dans l'univers SAP BO.
```
3.1.2. Architecture des tables de faits et de dimensions

J'ai construit mon modèle autour de trois tables de faits centrales pour répondre à l'ensemble des
besoins métiers :

```
● fait_ventes : Pour les indicateurs de billetterie.
● fait_reservations : Pour suivre la planification des salles.
```
```
● fait_passages : J'ai tout de même modélisé cette table pour anticiper l'installation future de
capteurs de comptage par les musées. Cependant, pour ne pas polluer l'interface des
utilisateurs actuels, je l'ai laissée "en sommeil" et elle n'apparaît pas dans SAP.
```
Autour de ces faits, j'ai rattaché mes tables de dimensions communes : dim_produit, dim_contact,
dim_site et dim_jour.

Enfin, j'ai pris une décision d'architecture importante concernant les clés. Plutôt que de générer de
nouvelles clés artificielles, j'ai préféré garder les identifiants d'origine de Vivaticket. J'ai fait ce choix
pour faciliter la vie de mes collègues : s'ils doivent un jour dépanner ou reprendre mon projet, ils
pourront facilement comparer les données de l'infocentre avec la base de production. Comme notre
flux se contente d'extraire la donnée sans en générer de nouvelle, cette méthode est tout à fait
viable.

3.1.3. Gestion de la dimension temporelle

Dans la base source de GTS_vision, la temporalité est stockée de manière brute sous la forme d'un
attribut unique dateheure (ex: 2025- 04 - 01 12:11:53.973). Pour permettre des analyses
décisionnelles fines et conformes aux besoins des directeurs de musées (tendances mensuelles,
saisonnalité), ce champ est segmenté et retraité lors du flux ETL pour alimenter une dimension
temporelle propre permettant de filtrer par année, mois, jour de la semaine ou tranches horaires.


### 3.2. Architecture du Tunnel ETL avec Pentaho Data Integration (PDI)

L'alimentation de l'infocentre est découpée en trois couches physiques distinctes sous PostgreSQL
afin de garantir la traçabilité et la qualité de la donnée.

```
Figure : Ensemble des traitements
```
3.2.1. La couche DSA (Data Staging Area)

La DSA sert de zone d'atterrissage brute. À l'aide de PDI, le flux réalise un "copier-coller" structurel
des tables sources utiles de MS SQL Server vers PostgreSQL. Les types de données d'origine sont
conservés, mais une première phase d'optimisation est réalisée en opérant une sélection stricte des
champs nécessaires au projet, éliminant ainsi le surplus d'attributs utilisés par l'application des
musées.

```
Figure : Traitement DSA
```

3.2.2. La couche ODS (Operational Data Store)

C'est dans la couche ODS que j'ai opéré les transformations les plus complexes. C'est ici que sont
réalisés les regroupements (merges) entre plusieurs tables sources pour alléger la structure globale
et éviter la multiplication des tables intermédiaires.

C'est également dans l'ODS qu'est injectée la logique métier pour résoudre les anomalies de la base
opérationnelle. Par exemple, l'application GTS_vision ne permet pas de distinguer nativement les
accompagnateurs d'une visite de groupe (enseignants, encadrants...) des visiteurs classiques au
sein d'une même commande. J'ai donc défini une règle métier avec les équipes qui est que PDI
identifie directement les articles appartenant à la catégorie interne des accompagnants, leur
applique un drapeau booléen (accompagnant = True), et les isole pour éviter qu'ils ne créent des
doublons ou ne faussent les statistiques de la table des catégories principales.

```
Figure : Transformation ODS
```

3.2.3. La couche DWH et sécurisation du chargement

La dernière étape consiste à envoyer toutes les données nettoyées et préparées vers notre base de
stockage finale (organisée de façon à être très facile à analyser). Pour mettre à jour ces informations,
nous avons choisi une méthode simple mais radicale : à chaque lancement, le système efface
complètement les anciennes données stockées pour réinsérer l'intégralité des nouvelles données à
la place. D'une part, la quantité de données des musées reste légère et rapide à charger. D'autre
part, cela permet de prendre automatiquement en compte les modifications ou les annulations de
réservations que le personnel des musées a pu faire dans le passé.

Pour sécuriser ce processus, la gestion des erreurs a été configurée de manière stricte dans les
jobs PDI : si une transformation ou une jointure échoue en amont, la chaîne d'exécution globale est
immédiatement interrompue. Cela empêche le script de vider les tables cibles du DWH si les
données de remplacement ne sont pas prêtes ou sont corrompues.

```
Figure : Transformation DWH
```
### 3.3. Automatisation, Ordonnancement et Data Quality

Le processus tourne de façon autonome via Jenkins toutes les nuits en période creuse. J'y ai aussi
ajouté une sécurité "Data Quality" : si mon flux détecte qu'un billet a été rangé dans deux catégories
contradictoires, il alerte automatiquement les agents du musée par mail pour qu'ils corrigent la saisie.


## IV : MISE À DISPOSITION UNIVERS ET REPORTING

Une fois les données extraites, nettoyées et modélisées au sein de l'infocentre, la dernière étape de
la chaîne décisionnelle consiste à les rendre accessibles aux directions des musées. Pour cela, la
suite SAP BusinessObjects a été utilisée en deux temps : la création d'une couche sémantique (via
l'outil SAP IDT) pour masquer la complexité technique, puis la conception et l'automatisation de
rapports de restitution métier pouvant être créés par les utilisateur formés.

### 4.1. La couche sémantique (SAP IDT)

L'Information Design Tool (IDT) de SAP permet de créer un "Univers". Cet univers agit comme un
générateur de requêtes SQL entre la base de données relationnelle (le modèle en étoile sous
PostgreSQL) et l'interface utilisateur finale.

4.1.1. La traduction technique vers le métier

L'objectif principal de l'univers est d'offrir une autonomie totale aux agents des musées, qui ne sont
pas formés au langage SQL. J'ai donc conçu une couche métier où chaque champ de la base de
données a été renommé et organisé en dossiers logiques. Par exemple, les champs techniques
génériques de la base GTS_vision, souvent nommés par de simples «libelle» ou «id_prod», ont été
traduits par des termes intelligibles et propres au vocabulaire des conservateurs, tels que «Nom du
musée», «Nom du projet» ou «Catégorie de public». Ainsi, l'utilisateur final n'a qu'à glisser-déposer
ces objets pour construire ses propres requêtes de manière totalement intuitive.

4.1.2. Simplification visuelle et choix d'implémentation

Par souci d'ergonomie, j'ai pris la décision de ne pas intégrer la table des faits concernant les
Passages dans cet univers. Bien que cette table soit prête et modélisée dans l'entrepôt de données
(DWH), l'exposer dans l'IDT alors que les musées ne disposent pas encore du matériel de comptage
adéquat aurait rendu l'arborescence illisible et aurait pu semer la confusion chez les utilisateurs.
C'était pour moi un principe de base : il fallait adapter l'outil BI à ce que les musées étaient réellement
capables de mesurer aujourd'hui.


4.1.3. La gestion des contextes de jointure

Techniquement, la création de l'univers a nécessité la mise en place stricte de contextes de jointure.
Dans un modèle complexe, il arrive que plusieurs chemins de jointures soient possibles entre les
tables de faits (Ventes, Réservations) et les dimensions partagées. Sans la création de ces
contextes pour forcer l'outil à emprunter un chemin unique et adéquat lors de la génération du code
SQL, le système aurait risqué d'emprunter de mauvais chemins de jointure (ambiguïtés de
parcours). Emprunter ces mauvais chemins aurait eu pour conséquence directe de croiser des
indicateurs incompatibles, faussant ainsi les calculs d'agrégation et renvoyant des données erronées
ou démultipliées dans les tableaux de bord finaux.

4.2. Le rapport de fréquentation et sa diffusion

Une fois l'univers fiabilisé, j'ai développé le rapport final sur l'interface de restitution (SAP Web
Intelligence), en respectant scrupuleusement le cahier des charges défini avec les responsables des
musées.

4.2.1. Structure visuelle et indicateurs clés

Pour que les directeurs puissent analyser les tendances d'un coup d'œil, j'ai construit le rapport
autour de graphiques simples et de quelques indicateurs clés (KPI) :

```
● Tableau comparatif temporel : Un tableau croisé mettant en parallèle les statistiques du
mois écoulé avec celles du même mois de l'année précédente (Année N vs Année N-1).
● Analyse financière : Un comparatif des recettes globales, séparant distinctement les
revenus générés par la billetterie pure de ceux générés par les boutiques des musées sur
ces deux mêmes années.
● Répartition des publics : L'intégration d'un graphique en secteurs (Pie chart) illustrant la
proportion des différents regroupements statistiques. Cette dataviz permet aux directeurs
d'identifier d'un seul coup d'œil le profil majoritaire de leurs visiteurs sur le mois passé (ex:
proportion de scolaires, de touristes ou d'abonnés).
```

4.2.2. Automatisation, filtrage dynamique et diffusion

Le principal apport de ce projet pour les musées reste l'automatisation totale du processus. Les
agents voulaient en finir avec les copier-coller chronophages sur Excel et recevoir directement leurs
chiffres de façon autonome.

J'ai donc paramétré un système de publication et de diffusion ciblée. Chaque mois, SAP BO
actualise le rapport avec les nouvelles données du DWH et génère un export au format Excel
(répondant ainsi à l'habitude de travail des agents). De plus, une règle de filtrage dynamique a été
mise en place lors de l'envoi : le rapport est découpé selon le périmètre de responsabilité de chaque
destinataire. Ainsi, le responsable du Muséum d'Histoire Naturelle reçoit un e-mail automatique
contenant un fichier Excel filtré uniquement sur les statistiques de son propre musée, et il en va de
même pour les autres responsables de sites.

Au-delà du gain de temps, ce filtrage assure la confidentialité des données entre les sites. Cela
marque surtout la fin des saisies manuelles sur Excel et l'adoption d'un vrai suivi automatisé pour
les musées.


## Bilan et Perspectives

### 1. Difficultés rencontrées

Sur le plan technique, l'exploration à l'aveugle des 700 tables de la base Vivaticket a été le plus gros
frein. J’ai aussi appris de mes erreurs d'architecture : au début, j'importais beaucoup trop de champs
dans ma zone de préparation (DSA), ce qui a fini par complexifier l'intégration finale.

### 2. Conclusion de projet

Ce projet d'automatisation de la chaîne décisionnelle des musées marque une étape charnière dans
la modernisation du suivi culturel de la Communauté d'Agglomération de La Rochelle. En remplaçant
un processus manuel fastidieux par une architecture robuste sous PostgreSQL et SAP
BusinessObjects, les directions métiers disposent désormais d'un véritable outil de pilotage fiable et
partagé.

Sur le plan personnel, la gestion de ce projet de bout en bout a considérablement enrichi mes
compétences en Data Engineering. Elle a surtout permis de confirmer mon projet professionnel.
Structurer et fiabiliser la donnée constitue un socle passionnant, mais je souhaite désormais
m'orienter vers son exploitation statistique avancée. Mon objectif à la rentrée prochaine est d'intégrer
un cursus d'ingénieur en Intelligence Artificielle ou le Master DIGISPORT, afin de mettre ces
compétences méthodologiques au service de la modélisation et de la prédiction des performances
sportives.


Annexe

```
Annexes : Schéma
```

Annexe : Fondation de données sur SAP IDT

```
Annexe : Editeur de requetes SAP BO
```

Annexes : liste de l’univers


Annexe : Contexte des reservation


Annexe : contexte des ventes


