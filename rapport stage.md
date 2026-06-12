## Ardo - Site Aquitaine Légumes Surgelés

## Jules Dubuy

## Olivier Mas

## Tuteur Professionnel

## Abdellah Qannari

## Tuteur Enseignant

## Jules Dubuy 2024 - 2025

# Refonte et automatisation des outils

# de gestion de conditionnement


## Remerciement

Je tiens à remercier tout particulièrement M. Olivier Mas, mon tuteur professionnel, pour son
accompagnement constant tout au long de mon stage, sa disponibilité et ses conseils précieux qui m'ont
permis d’avancer sereinement dans mes missions.

Je souhaite également exprimer ma gratitude à Mme Eva Liegey, pour ses retours sur mes livrables, qui
m’ont permis d’améliorer continuellement mes outils et d’affiner mes méthodes de travail.

Un grand merci à Mme Veronica Monteiro, qui m’a patiemment expliqué le fonctionnement des lignes de
conditionnement et qui, avec humour, m’a souvent réclamé des bonbons à la suite de mes erreurs — une
touche de légèreté qui a égayé mon quotidien sur le site.

Je souhaite remercier Mme Alexia Vlaminck, qui a pris le temps de me détailler l’ensemble du processus
de production, de la réception des matières premières jusqu’à l’envoi en chambre froide. Ses explications
m’ont offert une vision globale précieuse du fonctionnement du site.

Un grand merci également à Mme Linda Paget, pour m’avoir fourni des supports de présentation
institutionnels d’Ardo, qui m’ont été très utiles dans la réalisation de mes propres présentations.

Enfin, je tiens à remercier l’ensemble de l’équipe du service conditionnement, pour leur disponibilité et leur
bienveillance. Leur aide et leurs réponses à mes nombreuses questions m’ont été essentielles pour
comprendre les besoins métiers et adapter efficacement la base de données que j’ai développée.

Je remercie aussi M. Abdellah Qannari, mon tuteur enseignant, pour son suivi régulier et son soutien tout
au long de cette expérience en entreprise.


## Table des matières

- Glossaire
- Introduction
- Présentation de l’entreprise
   - Structure de l’entreprise
- Mon rôle dans l’entreprise
- Mission 1 – Refonte et automatisation de la gestion des bases de données internes
   - 1. Constat initial
   - 2. Méthodologie mise en œuvre
   - 3. Architecture de la solution
   - 4. Limites et perspectives........................................................................................................................................
- Mission 2 – Refonte et automatisation du fichier de planning hebdomadaire
   - 1. Constat initial
   - 2. Méthodologie mise en œuvre
   - 3. Automatisation du MRP
   - 4. Résultats et retour des utilisateurs
- Mission 3 – Automatisation de l’outil CRP
   - 1. Constat initial
   - 2. Méthodologie mise en œuvre
   - 3. Visualisation et résultats
   - 4. Appropriation et perspectives
- BILAN PROFESSIONNEL
- BILAN PERSONNEL
- Annexes


## Glossaire

- Python : langage de programmation utilisé pour créer des programmes qui automatisent des tâches
    répétitives.
- Script : un petit programme informatique qui exécute une série d'instructions automatiquement.
- Macro Excel : une suite d'actions enregistrées dans Excel pour automatiser des tâches, comme
    remplir ou modifier des cellules sans avoir à le faire manuellement.
- Synchronisation automatique : mécanisme permettant de mettre à jour automatiquement un fichier
    en fonction des modifications d'un autre fichier de référence.
- Modèle étoile : façon d'organiser les informations dans une base de données pour que l'accès aux
    données soit plus rapide et structuré. Cela ressemble à une étoile : une table centrale est
    connectée à plusieurs tables annexes
- MRP (Material Requirement Planning) : Outil de planification des besoins en matières premières.
    Dans ce stage, il est utilisé pour vérifier automatiquement si les stocks de films ou de cartons sont
    suffisants pour réaliser la production prévue dans le planning.
- Normalisation : Méthode utilisée pour fiabiliser une moyenne en supprimant les valeurs extrêmes
    (trop faibles ou trop élevées) qui peuvent fausser les résultats. Dans ce stage, elle permet de
    calculer un temps de production plus représentatif pour chaque article, en supprimant les 10 % les
    plus hauts et les plus bas des données collectées.
- BDD : base de données
- Forecast : prévision ici ce sont celles des commandes sur les 12 prochains mois
- Dashboard : Tableau de bord permettant de voir des graphiques

## Introduction

Dans un monde où la donnée est devenue un levier stratégique majeur, savoir la structurer, la
nettoyer et l’exploiter constitue un enjeu essentiel pour toutes les entreprises industrielles. C’est dans ce
contexte que s’inscrit mon stage chez Ardo, un acteur reconnu du secteur agroalimentaire.

Ce stage a représenté une opportunité concrète de mettre en application les compétences acquises durant
mon BUT Science des données, en particulier dans le domaine de la gestion et de l’automatisation des
données. Ma mission visait à améliorer la fiabilité et la fluidité des fichiers internes, dans l’objectif de
renforcer l’organisation et la performance opérationnelle de l’entreprise.

Dans un premier temps, ce rapport présente l’entreprise d’accueil, son environnement industriel ainsi que
le service conditionnement dans lequel j’ai été intégré. Dans un second temps, j’y détaille les missions qui
m’ont été confiées, les outils développés, les méthodes employées ainsi que les résultats obtenus. Enfin,
une dernière partie est consacrée à un bilan personnel et professionnel, mettant en lumière les
compétences développées, les difficultés rencontrées et les perspectives envisagées à l’issue de cette
expérience.

L’objectif principal de mon intervention a été de nettoyer, harmoniser et structurer les différents fichiers de
données internes, puis de concevoir une architecture de mise à jour automatique assurant une
synchronisation fiable en cas de modification. Ce travail a permis d’optimiser la gestion des données tout
en améliorant leur qualité, leur traçabilité et leur exploitation au service des processus métier.


## Présentation de l’entreprise

Créée pour répondre à une demande croissante de produits alimentaires sains, sûrs et pratiques,
Ardo s’est imposée au fil des années comme un acteur incontournable dans le domaine des légumes
surgelés mais produit aussi d’autres produits alimentaires tels que les fruits et les salades. Le groupe est
aujourd’hui reconnu pour son expertise dans la culture, la transformation, la congélation et la distribution de
produits végétaux prêts à consommer.

Ayant implanté des entreprises dans 7 pays européens, dont 3 en France, Ardo possède un total de
16 sites de production répartis stratégiquement afin d’être au plus proche des bassins agricoles. Grâce à ce
maillage territorial, l’entreprise assure une gestion optimisée de sa chaîne logistique et garantit la fraîcheur
de ses produits. Ce modèle performant permet à Ardo de générer un chiffre d’affaires de 1,1 milliard d’euros,
de fournir plus de 100 pays dans le monde, et de collaborer avec 3 500 producteurs partenaires.

La stratégie d’Ardo repose sur trois piliers fondamentaux :

- La qualité et la traçabilité de ses produits, via des process maîtrisés de la récolte jusqu’au client
    final
- Une démarche durable et responsable, avec des engagements forts en matière d’environnement,
    de consommation d’eau, de réduction des déchets et d’emballage écoresponsable ;
- Une relation de proximité avec ses partenaires, clients et collaborateurs, pour adapter ses solutions
    aux besoins de chacun.

En France, Ardo travaille notamment avec des marques de référence telles que Findus ou Picard, qui
utilisent ses produits dans leurs recettes. À l’international, le groupe collabore aussi avec Lidl / Freshona sur
le marché européen, Hiperdino aux îles Canaries, ou encore Eismann, un spécialiste de la vente de surgelés
à domicile.

Le site ALS (Aquitaine Légumes Surgelés) est l’un des établissements français du groupe Ardo. Situé
dans le sud-ouest de la France, il est principalement dédié au conditionnement des légumes surgelés. ALS,
en assure l’emballage final des produits selon les spécificités demandées par les clients.

Le site prend en charge des opérations comme la réception et le nettoyage des légumes, la cuisson,
la mise en sachet, la palettisation et l’étiquetage, tout en respectant des normes strictes de qualité et de
traçabilité. Il travaille en lien avec plusieurs services internes, notamment la logistique, la production, le
conditionnement, le service qualité, et la maintenance, pour garantir le bon déroulement des opérations
quotidiennes.


### Structure de l’entreprise

L’organisation du site ALS s’articule autour de plusieurs pôles fonctionnels interdépendants, chacun jouant
un rôle clé dans le bon déroulement des activités industrielles et administratives.

- Direction : le directeur d’exploitation il est responsable du pilotage global du site.
- Administration : Ils gèrent les aspects financiers, administratifs et humains.
- Qualité / Sécurité – Environnement : Ils veillent au respect des normes d’hygiène, de sécurité et des
    exigences techniques liées à l’industrialisation des produits.
- Agronomie : ce service est chargé de la relation avec les producteurs agricoles partenaires et du
    suivi qualité des matières premières.
- Fabrication : ce service gère la transformation initiale des légumes avant leur passage en
    conditionnement.
- Conditionnement : ce service est chargé de l’emballage et de la palettisation des articles. C’est
    dans ce service que j’ai été intégré.
- Logistique : responsable du stockage des produits finis ou à conditionner, des cartons et des films
    avant expédition.


**Focus sur le service conditionnement**

Le service conditionnement a pour mission de respecter les commandes des clients en garantissant la
production et la livraison des produits dans les délais. Le service contient 3 lignes de production
fonctionnante ainsi :

- La production commence par la bascule des octabins sur la ligne.
- Les produits passent ensuite sur des grilles vibrantes pour un premier tri, puis sous un aimant qui
    retire d’éventuels résidus métalliques.
- Les légumes sont ensuite dirigés vers une balance, qui les répartit automatiquement en sachets.
    Ces sachets sont ensuite scellés avant d’être déposés sur un tapis roulant.
- Les sachets sont ensuite mis en cartons, selon des configurations spécifiques définies pour chaque
    produit.
- Enfin, les cartons sont empilés sur des palettes suivant un schéma précis et programmé. Un cariste
    intervient pour transporter les palettes vers une chambre froide, où les produits sont surgelés.

```
Figure 1 : production d’une palette de produit finis
```
Les deux premières lignes sont dédiées à la mise en sachet de produits de 400 g à 2,7 kg. La dernière
gère les vracs de mélange et les sachets de 10kg et plus. Pour organiser ces 3 lignes, un planning
hebdomadaire est élaboré, définissant l’ordonnancement sur chacune des trois lignes.

Une fois le planning validé avec les responsables qualité et logistique, il est transmis aux chefs d’équipe.
Ces derniers créent ensuite les programmes dans le système AS400 et génèrent les fiches de contrôle
associées.

Ces fiches sont ensuite remises aux conducteurs de lignes et aux opérateurs pour configurer les machines
et démarrer la production. Les palettes finalisées sont envoyées en chambre froide, prêtes à être
expédiées aux clients.

Durant mon stage, j’ai été intégré à la zone de conditionnement du site ALS, Ce service est chargé
d'assurer le bon déroulement de la production sur les lignes, en lien avec les responsables de planning, les
chefs d'équipe, les opérateurs, et les techniciens de maintenance.


Le service conditionnement fonctionne autour de trois lignes de production indépendantes. Chaque
ligne suit un processus précis :

Pour préparer les lignes à la production d’un produit, les chefs d’équipe transmettent une fiche de
contrôle aux opérateurs. Ce document permet de configurer correctement les machines selon le produit à
conditionner : type de sachet, grammage, format de palette, etc.

```
Figure 2 : Fiche de contrôle (flouter)
```
Les chefs d’équipe s’appuient également sur un planning de production, fourni par le manager, qui regroupe
des informations clés telles que :

Les types palettes précis

Le nombre de palettes

Des commentaires liés au Vrac


## Mon rôle dans l’entreprise

Intégré au sein du service conditionnement du site ALS, j’ai exercé un rôle transversal en tant que
technicien en gestion et traitement de données. Ma mission principale a consisté à moderniser les outils
utilisés pour la planification de la production et la gestion des produits, en les rendant plus fiables,
automatisés et adaptés aux besoins réels du terrain.

## Mission 1 – Refonte et automatisation de la gestion des bases de données internes

### 1. Constat initial

À mon arrivée au sein du service conditionnement, plusieurs fichiers de référence m'ont été fournis pour
comprendre l'organisation de la production :

- La "bible produits", en cours de construction, regroupait des informations essentielles sur les
    produits fabriqués, mais elle était incomplète, parfois incohérente, et dupliquée à chaque mise à
    jour, avec des commentaires difficiles à exploiter.
- La fiche de contrôle conducteur, utilisée sur les lignes de production pour configurer les machines
    (type de grilles, grammage, étiquetage, schéma de palettisation, etc.), mais rarement actualisée.
- Le fichier planning, organisant la production hebdomadaire, présentait lui aussi des écarts et des
    incertitudes sur les données.

L'absence d'une base de données unique, fiable et à jour obligeait les chefs d'équipe et les planificateurs
à rechercher les informations dans plusieurs fichiers ou à consulter l'ancien système AS400, ce qui
augmentait les risques d'erreurs et de perte de temps.

Face à ce constat, ma mission a été de refondre entièrement la "bible produits" en créant une base de
données unique, fiable, structurée et automatisée.


### 2. Méthodologie mise en œuvre

**Prise de connaissance des fichiers existants**

```
J'ai d'abord étudié en détail les trois fichiers principaux afin de :
```
- Comprendre les informations spécifiques à chacun :

```
o Fiche de contrôle conducteur : données techniques de configuration des lignes.
```
```
o Planning : organisation de la production quotidienne.
```
```
o Bibles produits : informations générales (fournisseurs, packaging, spécifications, etc.).
```
- Repérer les champs critiques à préserver et harmoniser (ex : code article, désignation produit, poids
    nominal, dimensions cartons, etc.).

**Comparaison et croisement des données**

À l'aide du langage Python, j'ai développé des programmes capables d’automatiser d'analyser et de
croiser des données provenant des trois sources afin de :

- Détecter les incohérences entre les fichiers.
- Repérer les doublons.
- Vérifier les champs critiques entre chaque source (codes articles, désignations, poids, références
    de films/cartons...).
- Comparer et valider les informations en collaboration avec les responsables du site.

Lorsqu'une valeur était absente dans un fichier mais présente dans un autre, elle était conservée après
validation manuelle.

**Pourquoi Python?**

Python a été retenu pour sa polyvalence, sa compatibilité avec les formats Excel, et la disponibilité de
bibliothèques spécialisées comme _pandas_ et _openpyxl_ , qui ont permis de développer une solution robuste
et maintenable dans un environnement industriel.


**Consolidation et nettoyage des données**

Après la validation des croisements :

- J'ai fusionné les trois fichiers pour constituer un fichier unique de référence.
- Les scripts Python appliquaient plusieurs règles internes :

```
o Association automatique du type de grille de tri selon les mots-clés présents dans la
désignation du produit (ex : si "brocoli" ou "broc" est détecté).
```
```
o Génération automatique du schéma de palettisation, en fonction des dimensions des cartons
et des palettes.
```
```
o Calcul automatique du poids de vrac total par palette.
```
```
o Vérification et normalisation des formats de données critiques (ex : uniformisation des poids
en grammes, des dimensions, etc.).
```
Les anomalies détectées (informations critiques manquantes ou incohérentes) étaient gérées
automatiquement lorsque c'était possible. Sinon, les articles problématiques étaient renvoyés dans un fichier
Excel ou .txt pour un traitement et une correction manuelle.

**Définition du format final de la base de données**

En collaboration avec mon tuteur, nous avons défini :

- Les colonnes indispensables à conserver (ex : code article, désignation, grammage, fournisseur...).
- Les colonnes à mettre à jour régulièrement (ex : date de mise à jour des spécifications).
- Les colonnes pouvant être supprimées ou restructurées.

Cette définition a permis de structurer une bible produits exploitable à long terme, et facilement
maintenable.

**Formats et outils utilisés**

Les fichiers de travail étaient au format Excel (.xlsx). Pour leur manipulation et traitement, les
bibliothèques suivantes ont été utilisées en Python :

- Pandas : pour la gestion et manipulation des données tabulaires.
- Openpyxl : pour la lecture et l'écriture directe des fichiers Excel.
- Os : pour la gestion des chemins de fichiers et des dossiers de travail.
- Re : pour le traitement des expressions régulières (nettoyage des désignations, normalisations).
- Unicodedata : pour la suppression des caractères spéciaux dans les noms et descriptions.


**Développement des scripts**

- Développement initial de plusieurs scripts indépendants pour traiter :

```
o Le nettoyage des données.
```
```
o La détection des incohérences.
```
```
o La fusion intelligente des fichiers.
```
- Ces scripts ont ensuite été rassemblés dans un seul fichier principal pour plus de lisibilité et
    d'efficacité.

Le versionnage des scripts était assuré manuellement via des répertoires de sauvegarde réguliers, pour
conserver l’historique des versions développées.

**Validation et robustesse**

- Validation manuelle : Après chaque exécution, les résultats générés étaient vérifiés manuellement
    sur Excel en comparant les informations issues des anciennes bases.
- Gestion des erreurs :

```
o Les anomalies détectées automatiquement étaient corrigées si possible par le script.
```
```
o Sinon, les codes articles problématiques étaient exportés dans des fichiers .txt ou .xlsx pour
correction manuelle.
```
- Formulaires sécurisés : Lors de l'ajout de nouveaux produits via le formulaire Excel, des contrôles
    obligatoires empêchaient la validation en cas d'oubli ou d'erreur sur les champs critiques (ex :
    quantité numérique obligatoire).

**Fiabilisation des temps de production**

Pour améliorer le pilotage industriel, j’ai travaillé à la normalisation des temps de production mesurés
en palettes/heure. J’ai utilisé une méthode statistique simple mais robuste consistant à exclure les 10% des
valeurs les plus basses et les plus hautes (déciles), afin de :^

- Éliminer les données anormales causées par des arrêts machine ou erreurs de saisie
- Obtenir une moyenne représentative du temps réel de production dans des conditions standards.

Ce temps moyen est désormais exploité dans le planning pour mieux évaluer les besoins en ressources
(vrac, personnel, durée de cycle).


### 3. Architecture de la solution

La solution développée repose sur une architecture simple et modulaire, compatible avec les outils
existants du site (Excel principalement). Elle s’appuie sur un système de scripts Python centralisés qui
automatisent le traitement, la vérification et la structuration des données, tout en générant un fichier Excel
de référence destiné aux utilisateurs finaux.

L’architecture s’organise autour de trois piliers :

- **Une base de données consolidée** (bible produits), issue du croisement de plusieurs fichiers
    internes (fiche de contrôle, planning, anciennes bibles) ;
- **Des scripts Python modulaires** , regroupés dans un script principal, assurant le nettoyage, la
    validation, l’enrichissement et la normalisation des données ;
- **Un fichier Excel généré automatiquement** , lisible et modifiable par les opérateurs du terrain,
    contenant des contrôles embarqués pour limiter les erreurs de saisie.

Les choix techniques (formats .xlsx, bibliothèques Pandas/Openpyxl, etc.) ont été faits pour garantir
l’autonomie des utilisateurs et assurer une compatibilité maximale avec leur environnement habituel, sans
nécessiter de nouveaux logiciels ou formations complexes.

Pour ce qui est de l’automatisation de la palettisation cela n’a pas été concluant car certain client demande
une palettisation particulière, cela ne suivait donc pas de règles précise

### 4. Limites et perspectives........................................................................................................................................

La solution actuelle, entièrement développée sous Excel pour s'adapter aux compétences des utilisateurs
non formés aux bases de données complexes, présente plusieurs limites :

- Pas de lien direct avec la gestion des stocks ou la logistique.
- Dépendance aux fichiers locaux.
- Difficultés de faire des modifications en cas de croissance importante des données.

**Perspectives d'évolution :**

- À moyen terme, la migration vers une base de données SQL structurée en modèle en étoile
    permettrait de mieux organiser et sécuriser les données.

Le site d’ALS intégrera d’ici 3 ans le logiciel d’ERP SAP et permettra de centraliser toutes les opérations
industrielles et logistiques du site.


## Mission 2 – Refonte et automatisation du fichier de planning hebdomadaire

### 1. Constat initial

Avant mon intervention, deux versions du fichier de planning circulaient sur le site :

Une ancienne version très utilisée, mais peu ergonomique. Les blocs de lignes n’étaient pas bien
délimités, les noms de colonnes étaient peu explicites, et la lecture globale du planning était rendue
difficile.

```
Figure 3 : Planning hebdomadaire Avant
```
Une nouvelle version en cours de développement par le manager, plus structurée, mais contraignante :
elle imposait un nombre fixe de lignes par programme, ce qui entraînait de fréquentes casses de formules.
Cette version ne prenait pas encore en compte toutes les fonctionnalités nécessaires.

```
Figure 4 : Planning hebdomadaire en cours de développement
```
Le renseignement de ce planning est confié à l’assistante responsable du conditionnement, qui
complète le fichier tout au long de la semaine afin de préparer l’ordonnancement de la semaine suivante.

Ce fichier comprend également une feuille MRP^ utilisée pour vérifier la disponibilité des consommables
(films, cartons), mais cette partie était gérée manuellement : les informations de stock étaient copiées à la
main, et les besoins en consommables calculés avec des formules fragiles. Cette méthode prenait du
temps et était source d’erreurs.


### 2. Méthodologie mise en œuvre

**Amélioration du fichier de planning**

J’ai d’abord échangé avec mon tuteur et les utilisateurs finaux pour identifier les colonnes utiles, les
zones sensibles et les éléments à fiabiliser. J’ai repris la logique des formules RECHERCHEV, utilisée
dans les anciennes versions, afin de maintenir une certaine familiarité pour les utilisateurs non experts
d’Excel.

Voici les principales améliorations apportées :

- Synchronisation automatique : une macro déclenchée à l’ouverture du fichier importe les données
    de la bible produits pour mettre à jour les réglages techniques et les informations produits.
- Propagation des formules : j’ai développé une macro capable d’insérer les bonnes formules dans
    chaque ligne du planning, quelle que soit la taille du bloc, en scannant la feuille à partir d’un mot-clé
    (nom de ligne) jusqu’à la prochaine ligne ou jusqu’à "STOP".
- Remise à zéro hebdomadaire : une autre macro permet de vider toutes les cellules saisies
    manuellement (nombres de palettes, commentaires, etc.) pour faciliter la préparation du planning de
    la semaine suivante.

**Fiabilisation du calcul du temps de production**

Le temps de production étant une donnée clé du planning, j’ai suggéré de le fiabiliser. En effet, les
cadences de production constatées sur les lignes ne correspondaient souvent pas à celles indiquées. Cela
pouvait s'expliquer par des erreurs de saisie, des dysfonctionnements ou des arrêts non pris en compte.

Pour y remédier, j’ai proposé une normalisation statistique des cadences, en retirant les 10 % des
valeurs extrêmes (décile 1 et 10). J’ai utilisé un script en R pour réaliser ce traitement, puis j’ai intégré les
cadences corrigées dans le calcul du temps hebdomadaire estimé. Cela a permis de garantir un temps de
production plus réaliste, limitant les décalages dans les plannings.


### 3. Automatisation du MRP

Avant mon intervention, la feuille MRP était remplie à la main. J’ai développé plusieurs macros pour
automatiser complètement cette partie, en fonction des données de stock et des besoins extraits du
planning :

Pour les films :

- La macro identifie les films nécessaires selon les programmes du planning.
- Elle calcule les quantités nécessaires, puis les compare avec les stocks du dernier fichier
    disponible.
- En cas de manque, elle vérifie les commandes en cours (fichier de commandes) pour voir si une
    livraison est attendue.
- Les articles dont le stock est insuffisant sont automatiquement surlignés en rouge.

```
Figure 5 : tableau MRP des films
```
Pour les cartons :

- Même logique que pour les films, à la différence que le suivi des commandes n’existe pas pour les
    cartons.
- J’ai également pris en compte les cas de transition entre deux références de cartons (ancienne et
    nouvelle), très fréquents sur le site. Le script peut gérer les codes doubles présents dans les
    champs.

```
Figure 6 : tableau MRP des films
```

### 4. Résultats et retour des utilisateurs

Le nouveau fichier de planning est aujourd’hui :

- Synchronisé automatiquement avec la base de données,
- Facilement réinitialisable et modifiable,
- Fiable pour anticiper les besoins grâce au MRP,
- Compréhensible même pour des utilisateurs peu experts d’Excel.

L’outil est principalement utilisé par l’assistante responsable du conditionnement, qui souhaitait un fichier
stable et simple à prendre en main. Grâce aux ajustements successifs apportés chaque semaine, j’ai pu
recueillir des retours réguliers et intégrer les améliorations rapidement, ce qui a favorisé une appropriation
progressive du fichier par l’équipe.

Enfin, le gain de temps est notable : plus besoin de consulter le système AS400 pour chaque réglage, ni de
faire des copier-coller fastidieux depuis les fichiers de stock. Il suffit désormais d’importer le dernier fichier
et de cliquer sur un bouton pour vérifier si la production est réalisable.


## Mission 3 – Automatisation de l’outil CRP

### 1. Constat initial

En parallèle de la gestion opérationnelle à court terme, le site ALS avait besoin d’un outil de planification à
l’échelle annuelle pour anticiper la charge de travail sur ses lignes de conditionnement. Cet outil est crucial
pour permettre aux responsables d’identifier les périodes de forte ou faible activité, et ainsi prévoir des
ajustements (maintenance, travaux, commandes supplémentaires ou décalées).

Pour répondre à ce besoin, un fichier CRP (Capacité de Réponse à la Production) avait été fourni par le
groupe Ardo. Ce fichier, conçu comme un modèle général pour plusieurs sites, n’était pas adapté
spécifiquement aux contraintes d’ALS, ni pleinement exploité localement.

Le fichier contenait bien des feuilles de travail pertinentes :

- Une feuille regroupant les commandes prévisionnelles par article et par mois,
- Une feuille de calcul intermédiaire (BDD Forecast) pour estimer les volumes à produire,
- Une feuille Forecast centralisant les besoins en tonnes par ligne et par mois,
- Un Dashboard affichant la capacité théorique et la charge prévue sur chaque ligne, sous forme de
    graphiques en barres.

Cependant, toutes les données étaient saisies à la main, ce qui rendait le processus :

- Long et fastidieux,
- Sensible aux erreurs (inversions de ligne, oublis, unités mal saisies...),
- Difficile à maintenir au fil du temps.

Le fichier ne suivait pas non plus les logiques propres au site d’ALS : certains formats, types d’articles ou
contraintes techniques locales (comme la gestion du vrac ou les changements de ligne) n’étaient pas
intégrés ou respectés. Cela limitait fortement la fiabilité des résultats et la confiance que les équipes
pouvaient avoir dans l’outil.

Face à ces limites, le manager du service souhaitait que ce fichier soit fiabilisé, automatisé et ajusté pour
les spécificités d’ALS, afin d’en faire un véritable outil d’aide à la décision pour la planification annuelle de
la production.


### 2. Méthodologie mise en œuvre

Après une réunion avec le référent du groupe Ardo (auteur initial du fichier) et mon responsable, deux
adaptations majeures ont été décidées pour répondre aux spécificités d’ALS :

- Répartir équitablement la charge entre les lignes 1 et 2, qui sont techniquement équivalentes
    (50/50) ;
- Intégrer les vracs de mélange dans la planification de la ligne 3, car ils consomment également de
    la capacité machine.

Pour mettre en œuvre ces adaptations, j’ai développé plusieurs macros Excel automatisant l’ensemble du
processus, à condition que les fichiers de commande et de stock soient exportés depuis AS400. Ces
macros assurent la mise à jour complète des feuilles de calcul intermédiaires, recalculent les volumes à
produire, et alimentent le tableau de bord de manière fluide.

J’ai également conçu une feuille spécifique permettant d’identifier les produits vrac de type “mélange”, à
partir d’un carnet fourni par l’équipe. Dès lors qu’un code vrac figure dans cette liste, la quantité
correspondante est automatiquement réintégrée dans le forecast de la ligne 3.

Par ailleurs, j’ai ajouté des fonctionnalités ergonomiques essentielles :

- La possibilité de saisir manuellement des commandes non encore passées, tout en les incluant
    dans les calculs ;
- L’affichage automatique du **nom de l’article et du client** associé à chaque commande dans la
    feuille Forecast, pour faciliter le suivi et les échanges.

### 3. Visualisation et résultats

Le tableau de bord final comprend quatre graphiques à barres :

- Un graphique combiné pour les lignes 1 et 2 ;
- Trois graphiques individuels pour chacune des lignes, permettant un suivi détaillé.

Chacun de ces graphiques est structuré autour d’un seuil visuel représentant **80 % de la capacité de
production**. Cette limite sert de repère critique : tout dépassement de ce seuil attire immédiatement
l’attention des équipes, en cas de panne ou de dérive.

L’ensemble du fichier est actualisable en un seul clic, ce qui permet aux utilisateurs de gagner en efficacité,
tout en réduisant les risques d’erreur.

### 4. Appropriation et perspectives

Le responsable du service conditionnement a été formé à l’utilisation complète de l’outil, qu’il exploite
désormais pour ses analyses de charge annuelle. L’outil facilite la prise de décisions concernant les reports
de commandes, les maintenances.

À l’avenir le Site d’ALS utilisera l’ERP SAP il sera donc plus simple de créer le CRP grâce à des logiciel
comme power BI ou Bisness Object.


## BILAN PROFESSIONNEL

**Compétences développées et consolidées**

Ce stage m’a permis de consolider plusieurs compétences techniques clés en lien direct avec ma formation
en science des données, notamment :

- **Automatisation et traitement de données** : j’ai perfectionné ma maîtrise du langage Python,
    particulièrement avec les bibliothèques _pandas_ , _openpyxl_ et _re_ , en développant des scripts robustes
    adaptés à un environnement industriel.
- **Structuration de base de données** : j’ai consolidé mes compétences d’organisation des
    informations de manière exploitable pour des utilisateurs non techniques, en tenant compte de la
    maintenance future et des contraintes de lisibilité.
- **Fiabilisation des données** : la mise en œuvre de méthodes statistiques (normalisation par déciles)
    m’a permis de rendre les calculs de temps de production plus représentatifs.
- **Automatisation sous Excel** : j’ai développé des macros VBA pour améliorer l’ergonomie et
    automatiser les tâches du quotidien, ce qui m’a permis de collaborer efficacement avec des
    utilisateurs peu familiers des outils informatiques avancés.

**Difficultés rencontrées**

Certaines phases du projet ont été particulièrement exigeantes :

- **Hétérogénéité des fichiers sources** : les fichiers utilisés par les différents services présentaient
    souvent des formats différents, des doublons ou des incohérences. Cela m’a forcé à adapter mes
    scripts pour gérer des cas particuliers et des exceptions.
- **Communication avec les utilisateurs métiers** : traduire des besoins exprimés de manière orale
    ou floue en règles logiques exploitables dans un programme a demandé de nombreuses itérations
    et un effort de vulgarisation.
- **Limites d’Excel** : certaines contraintes techniques (taille de fichiers, instabilité des formules) ont
    ralenti le développement et nécessité des compromis pour rester dans l’environnement maîtrisé par
    les utilisateurs.
- **Manque de contrôle en amont** : à un moment du projet, j’ai envoyé dans l’environnement de
    production des fichiers contenant des données non validées et non vérifiées. Cette erreur a
    nécessité un retour en arrière et une revérification des données. Elle m’a appris l’importance
    cruciale de mettre en place des procédures de validation rigoureuses avant tout déploiement.
- **Règles particulières** : Certaine règles ont été comme la palettisation ou encore le type de palette
    par défaut ces détails ont forcé à modifier les outils et la base de données au fil du temps

Ces défis m’ont appris à être plus rigoureux, à mieux documenter mes outils et à intégrer les retours
utilisateurs dans une logique agile d’amélioration continue.


## BILAN PERSONNEL

Ce stage a été une expérience riche et structurante. Il m’a permis de découvrir de manière concrète le
fonctionnement d’une entreprise industrielle, mais aussi de mieux comprendre mes propres attentes vis-à-
vis du monde professionnel.

**Une autonomie révélatrice**

Même si j’ai été intégré officiellement à une équipe, j’ai réalisé la majeure partie de mes missions en
autonomie. Ce mode de travail ne m’a pas été désagréable au début, j’ai pu avancer à mon rythme,
organiser mes journées et prendre des décisions techniques seul. Cependant, cette expérience m’a aussi
permis de comprendre que travailler seul au quotidien n’est pas un format qui me correspond sur le long
terme.

Ayant été le seul professionnel informatique dans l’ensemble de l’entreprise, j’ai dû apprendre à simplifier
mes propos techniques pour pouvoir communiquer avec le reste de mon équipe. Cela m’a fait prendre
conscience que j’ai besoin d’un environnement plus collaboratif, avec des retours, des idées partagées,
des discussions, et une dynamique d’équipe.

**Évolution de mes intérêts**

Une autre découverte importante est liée à la nature même de mes missions. Ce stage m’a amené à
développer des outils techniques (scripts Python, macros Excel...), ce qui a été formateur. Cependant avec
le recul, je réalise que le développement pur n’est pas ce qui m’attire le plus dans le domaine de la science
des données.

Je suis davantage motivé par des missions qui nécessitent de :

- **Analyser et comprendre les données** ,
- **Traduire les besoins métiers en solutions concrètes** ,
- **Interpréter les résultats pour aider à la décision**.

Ces éléments m’orientent vers des rôles plus tournés vers l’analyse, l’ingénierie des données ou la
business intelligence, avec une composante plus humaine, moins technique au sens strict.

**Et maintenant?**

Ce stage m’a aidé à mieux cerner mes envies professionnelles. Je souhaite désormais me diriger vers un
parcours qui me permettra de :

- Travailler en équipe **,** dans un environnement où les compétences se croisent et s’enrichissent
    mutuellement,
- M’éloigner du développement pur pour me concentrer sur l’analyse, la compréhension métier et la
    communication des résultats **,**
- M’investir dans des projets à impact où la donnée est utilisée comme levier stratégique.


## Annexes

```
Annexe 1 : Organigramme de l’entreprise
```

Annexe 2 : Programme python de comparaison de données



Annexe 3 : Gestion des informations dans la bible




Annexe 4 : Export de la bible


Annexe 5 : Gestion des logs dans la bible



Annexe 6 :



Annexe : 7 : Remise en forme des formules du planning



Annexe 8 : Macro de Remise à zéro


Annexe 9 : Mise à jour de la feuille de stock


Annexe 10 : Mise à jour de la feuille de consommation de film



Annexe 1 1 : Mise à jour de la feuille Commande de film


Annexe 12 : Gestion des MRP de Carton et de Films





