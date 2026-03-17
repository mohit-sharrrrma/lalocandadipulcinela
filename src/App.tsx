import { Menu, MapPin, Phone, Clock, Star, ChevronRight, Instagram, Facebook, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

type Language = 'fr' | 'en' | 'it';

const translations = {
  fr: {
    nav: { menu: "Menu", reviews: "Avis", contact: "Contact", reserve: "Réserver" },
    hero: {
      title: "L'Authentique Pizza Napolitaine à Paris",
      subtitle: "Découvrez les saveurs de l'Italie dans une ambiance chaleureuse et conviviale.",
      menuBtn: "Voir le Menu",
      reserveBtn: "Réserver une table"
    },
    menu: {
      title: "Notre Carte",
      subtitle: "Des ingrédients frais et de qualité, importés directement d'Italie.",
      categories: {
        antipasti: "Antipasti",
        salades: "Salades",
        focacce: "Focacce",
        pizzeRosse: "Pizze Rosse",
        pizzeBianche: "Pizze Bianche",
        pateIntegrale: "Pâte Intégrale",
        dolci: "Dolci",
        drinks: "Boissons"
      }
    },
    reviews: {
      title: "Ce que disent nos clients",
      subtitle: "Découvrez les avis de ceux qui ont goûté à notre cuisine."
    },
    contact: {
      title: "Venez nous rendre visite",
      subtitle: "Votre restaurant italien de référence à Paris. Venez déguster nos pizzas authentiques et nos spécialités maison.",
      address: "Adresse",
      hours: "Horaires",
      tueSun: "Mardi - Dimanche",
      closedMon: "Fermé le Lundi",
      contactUs: "Contact",
      followUs: "Suivez-nous",
      info: "Informations",
      access: "Accès personnes à mobilité réduite",
      terrace: "Terrasse disponible",
      family: "Idéal pour les familles",
      payments: "Paiements acceptés:",
      quickLinks: "Liens Rapides",
      reservations: "Réservations",
      orderOnline: "Commander en ligne",
      ourStory: "Notre Histoire",
      events: "Nos événements",
      legal: "Mentions légales",
      privacy: "Protection des données"
    },
    footer: "La Locanda di Pulcinella. Tous droits réservés."
  },
  en: {
    nav: { menu: "Menu", reviews: "Reviews", contact: "Contact", reserve: "Book a Table" },
    hero: {
      title: "Authentic Neapolitan Pizza in Paris",
      subtitle: "Discover the flavors of Italy in a warm and friendly atmosphere.",
      menuBtn: "View Menu",
      reserveBtn: "Book a Table"
    },
    menu: {
      title: "Our Menu",
      subtitle: "Fresh, high-quality ingredients imported directly from Italy.",
      categories: {
        antipasti: "Starters",
        salades: "Salads",
        focacce: "Focaccia",
        pizzeRosse: "Red Pizzas",
        pizzeBianche: "White Pizzas",
        pateIntegrale: "Whole Wheat Dough",
        dolci: "Desserts",
        drinks: "Drinks"
      }
    },
    reviews: {
      title: "What Our Customers Say",
      subtitle: "Discover the reviews of those who have tasted our cuisine."
    },
    contact: {
      title: "Come Visit Us",
      subtitle: "Your go-to Italian restaurant in Paris. Come and taste our authentic pizzas and homemade specialties.",
      address: "Address",
      hours: "Opening Hours",
      tueSun: "Tuesday - Sunday",
      closedMon: "Closed on Mondays",
      contactUs: "Contact Us",
      followUs: "Follow Us",
      info: "Information",
      access: "Wheelchair accessible",
      terrace: "Terrace available",
      family: "Family friendly",
      payments: "Accepted payments:",
      quickLinks: "Quick Links",
      reservations: "Reservations",
      orderOnline: "Order Online",
      ourStory: "Our Story",
      events: "Our Events",
      legal: "Legal Notice",
      privacy: "Data Protection"
    },
    footer: "La Locanda di Pulcinella. All rights reserved."
  },
  it: {
    nav: { menu: "Menu", reviews: "Recensioni", contact: "Contatti", reserve: "Prenota" },
    hero: {
      title: "L'Autentica Pizza Napoletana a Parigi",
      subtitle: "Scopri i sapori dell'Italia in un'atmosfera calda e accogliente.",
      menuBtn: "Vedi il Menu",
      reserveBtn: "Prenota un tavolo"
    },
    menu: {
      title: "Il Nostro Menu",
      subtitle: "Ingredienti freschi e di alta qualità, importati direttamente dall'Italia.",
      categories: {
        antipasti: "Antipasti",
        salades: "Insalate",
        focacce: "Focacce",
        pizzeRosse: "Pizze Rosse",
        pizzeBianche: "Pizze Bianche",
        pateIntegrale: "Impasto Integrale",
        dolci: "Dolci",
        drinks: "Bevande"
      }
    },
    reviews: {
      title: "Cosa dicono i nostri clienti",
      subtitle: "Scopri le recensioni di chi ha assaggiato la nostra cucina."
    },
    contact: {
      title: "Vieni a trovarci",
      subtitle: "Il tuo ristorante italiano di riferimento a Parigi. Vieni a gustare le nostre pizze autentiche e le specialità della casa.",
      address: "Indirizzo",
      hours: "Orari",
      tueSun: "Martedì - Domenica",
      closedMon: "Chiuso il Lunedì",
      contactUs: "Contattaci",
      followUs: "Seguici",
      info: "Informazioni",
      access: "Accesso per disabili",
      terrace: "Terrazza disponibile",
      family: "Ideale per famiglie",
      payments: "Pagamenti accettati:",
      quickLinks: "Link Rapidi",
      reservations: "Prenotazioni",
      orderOnline: "Ordina Online",
      ourStory: "La Nostra Storia",
      events: "I Nostri Eventi",
      legal: "Note legali",
      privacy: "Protezione dei dati"
    },
    footer: "La Locanda di Pulcinella. Tutti i diritti riservati."
  }
};

const translateTag = (tag: string, lang: Language) => {
  const map: Record<string, Record<Language, string>> = {
    "Végétarien": { fr: "Végétarien", en: "Vegetarian", it: "Vegetariano" },
    "Piquant": { fr: "Piquant", en: "Spicy", it: "Piccante" },
    "Végan": { fr: "Végan", en: "Vegan", it: "Vegano" }
  };
  return map[tag]?.[lang] || tag;
};

const menuData = {
  antipasti: [
    { name: "Burrata (125g)", description: "Crème de tomate et pesto de roquette", price: "8,00 €" },
    { name: "Mozzarella di buffala alla pizzaiola", description: "Mozzarella di bufala fumé, sauce tomate, olives noires, origan, basilic (gratiné au four)", price: "8,00 €", tags: ["Végétarien"] },
    { name: "Légumes au gorgonzola", description: "Gorgonzola, crème fraîche, courgettes, aubergines, poivrons, artichauts, olives noires (gratiné au four)", price: "9,00 €" },
    { name: "Planche de charcuterie italienne", description: "Jambon de Parma, bresaola, coppa, mortadella, salami epicée", price: "14,00 €" },
    { name: "Planche de fromages italiens", description: "Gorgonzola, scamorza fumé, pecorino au poivre, parmesan", price: "14,00 €", tags: ["Végétarien"] },
    { name: "Parmigiana di melanzane", description: "sauce tomate, aubergines, mozzarella, parmesan . Gratinée au four", price: "9,00 €" }
  ],
  salades: [
    { name: "Salade Caprese", description: "Roquette, mozzarella di bufala, tomates cerises, basilic", price: "12,00 €", tags: ["Végétarien"] },
    { name: "Sala de légumes & bufala", description: "Salade mesclun, aubergines, courgettes, poivron rouges, artichauts, tomates cerises & confits, mozzarella di bufala", price: "15,00 €" },
    { name: "Salade Bresaola", description: "Salade mesclun, bresaola (viande de bœuf fumé), champignons, parmesan, tomates confits", price: "15,00 €" },
    { name: "Salade Burrata", description: "Salade mesclun, burrata (125gr), jambon de Parma, artichauts, tomates cerises, olives noires", price: "16,00 €" },
    { name: "Salade Saumon", description: "Salade mesclun, saumon, noix, tomates cerises & séchées, olives noires", price: "16,00 €" },
    { name: "Salade de thon", description: "Salade mesclun, courgettes thon, anchois, pecorino au poivre, oignons rouges", price: "15,00 €" }
  ],
  focacce: [
    { name: "Focaccia huile d'olive & origan", description: "", price: "5,00 €", tags: ["Végétarien"] },
    { name: "Focaccia aux tomates cerises, huile d'olive & basilic", description: "", price: "7,00 €", tags: ["Végétarien"] },
    { name: "Focaccia légumes & parmesan", description: "Aubergines, courgettes, poivron rouges, artichauts, tomates cerises, parmesan", price: "12,00 €" },
    { name: "Focaccia burratina & jambon de parma", description: "", price: "14,00 €" }
  ],
  pizzeRosse: [
    { name: "Margherita", description: "Sauce tomate, mozzarella, basilic", price: "10,00 €", tags: ["Végétarien"] },
    { name: "Margherita D.O.P", description: "Sauce tomate,mozzarella, mozzarella di bufala, tomates cerices, basilic", price: "14,00 €", tags: ["Végétarien"] },
    { name: "Napoli", description: "Sauce tomate, mozzarella, anchois, câpres, olives noires", price: "15,00 €" },
    { name: "Regina", description: "Sauce tomate, mozzarella, champignons, jambon blanc", price: "15,00 €" },
    { name: "Capricciosa", description: "Sauce tomate, mozzarella, champignons, jambon blanc, artichauts, olives noires", price: "16,00 €" },
    { name: "4 stagioni", description: "Sauce tomate, mozzarella, champignons, jambon blanc, artichauts, olives noires, salami epicée", price: "16,00 €" },
    { name: "Isabella", description: "Sauce tomate, mozzarella, champignons, jambon blanc, œuf", price: "16,00 €" },
    { name: "Calzone Souffle'", description: "Sauce tomate, mozzarella, champignons, jambon blanc, œuf, ricotta (Servi avec roquette, tomates cerises & parmesan)", price: "16,00 €" },
    { name: "Diavola", description: "Sauce tomate, mozzarella, salami piquant, oignons rouges", price: "15,00 €", tags: ["Piquant"] },
    { name: "Sarda", description: "Sauce tomate, mozzarella, salami piquant, ricotta, tomates cerises", price: "15,00 €", tags: ["Piquant"] },
    { name: "Fuoco", description: "Sauce tomate, mozzarella, salami piquant, `nduja (viande de porc épicée), pecorino au poivre", price: "17,00 €" },
    { name: "Calabrese", description: "Sauce tomate, mozzarella, `nduja (viande de porc épicée), scamorza fumée, aubergines", price: "17,00 €", tags: ["Piquant"] },
    { name: "Vegetariana", description: "Sauce tomate, mozzarella, champignons, courgettes, aubergines, artichauts, poivrons", price: "16,00 €", tags: ["Végétarien"] },
    { name: "Parma", description: "Sauce tomate, mozzarella, roquette, jambon de Parma, tomates cerises, parmesan", price: "17,00 €" },
    { name: "Bresaola", description: "Sauce tomate, mozzarella, roquette, bresaola, tomates cerises, parmesan", price: "17,00 €" },
    { name: "Burratina", description: "Sauce tomate, roquette, burrata 125gr, tomates cerises", price: "16,00 €", tags: ["Végétarien"] },
    { name: "Burrata & Parma", description: "Sauce tomate, mozzarella, burrata 125gr, jambon de Parma, parmesan, tomate confites", price: "18,00 €" },
    { name: "Thon", description: "Sauce tomate, mozzarella, thon, câpres, olives noires, oignons rouges", price: "15,00 €" },
    { name: "Mascarpone", description: "sauce tomate, mozzarella, mascarpone, salami piquant, courgettes, artichaut, olives noires", price: "15,00 €" },
    { name: "Salsiccia & funghi", description: "sauce tomate, mozzarella, saucisses, champignons, gorgonzola", price: "17,00 €" }
  ],
  pizzeBianche: [
    { name: "Quattro Fromaggi", description: "Mozzarella, gorgonzola, pecorino, parmesan", price: "15,00 €", tags: ["Végétarien"] },
    { name: "Chèvre miel", description: "Crème, mozzarella, chèvre, miel, noix", price: "14,00 €" },
    { name: "Rustica", description: "Mozzarella, scamorza fumée, salami épicé, roquette, tomates cerises", price: "15,00 €", tags: ["Piquant"] },
    { name: "3 fromage & truffe blanche", description: "Crème de truffe blanche, mozzarella, gorgonzola, jambon blanc, parmesan", price: "17,00 €" },
    { name: "Bianca", description: "Mozzarella, roquette, jambon de Parma, tomates cerises, parmesan", price: "17,00 €" },
    { name: "Pulcinella", description: "Crème de truffe, mozzarella, champignons, roquette, tomates cerises, parmesan, coppa", price: "17,00 €" },
    { name: "Truffata", description: "Crème de truffe, mozzarella, champignons, jambon blanc, œuf, roquette, tomates cerises", price: "17,00 €" },
    { name: "Saumon", description: "Crème rosé, mozzarella, saumon, roquette, tomates cerises", price: "17,00 €" }
  ],
  pateIntegrale: [
    { name: "Vegana", description: "Sauce tomates, courgettes, poivrons, artichauts, champignons, roquette, tomates cerises, olives noires", price: "15,00 €", tags: ["Végan"] },
    { name: "Straciatella", description: "Crème, mozzarella, jambon blanc, courgettes, stracciatella (fromage frais à pate filée) tomates cerises", price: "17,00 €" },
    { name: "Tartufo Bianco", description: "Créme de truffe blanche, mozzarella, provola di bufala, coppa, parmesan, tomates cerises", price: "18,00 €" }
  ],
  dolci: [
    { name: "Pizza alla nutella", description: "", price: "8,00 €" },
    { name: "Tiramisu", description: "Tiramisu classique au café et sans alcool", price: "7,00 €" },
    { name: "Cantuccio", description: "Biscuits savoiardi au cappuccino, chantilly maison & amandes caramélisées", price: "7,00 €" },
    { name: "Panna Cotta", description: "Panna Cotta à la vanille servie avec un coulis de fruits rouges", price: "6,00 €" },
    { name: "Affogato al caffè", description: "Glace artisanale à la vanille noyée dans le café & chantilly", price: "8,00 €" },
    { name: "Cafè gourmand", description: "Café servi avec tiramisù, cantuccio, panna cotta & chantilly", price: "12,00 €" },
    { name: "Sgroppino al limone", description: "Sorbet au citron, limoncello, prosecco", price: "8,00 €" },
    { name: "Dessert du jour", description: "", price: "7,00 €" },
    { name: "Coupe de glace artisanale", description: "", price: "9,50 €" },
    { name: "Calabrisella", description: "Chocolat, pistache, coco, chantilly & coulis de chocolat (1 boule 3€, 2 boules 6€, Chantilly 1€)", price: "3,00 € - 6,00 €" },
    { name: "Balanzone", description: "Citron, fraise, fruit de la passion, chantilly & coulis de fruits rouges (1 boule 3€, 2 boules 6€, Chantilly 1€)", price: "3,00 € - 6,00 €" }
  ],
  drinks: [
    { 
      name: "Aperol Spritz", 
      description: "Aperol, Prosecco, eau gazeuse, tranche d'orange", 
      price: "8,00 €",
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop"
    },
    { name: "Aperitivi", description: "Martini, Pastis, Bière Peroni, Kir, J&B, Jack Daniel's...", price: "4,00 € - 7,00 €" },
    { name: "Soft Drink", description: "Coca-Cola, Fanta, Ice Tea, Perrier, Jus de Fruits...", price: "4,00 € - 6,00 €" },
    { name: "Caffetteria", description: "Café espresso, cappuccino, thé...", price: "2,50 € - 4,50 €" },
    { name: "Digestifs", description: "Limoncello, Amaretto, Grappa, Sambuca, Cognac...", price: "5,00 € - 7,00 €" }
  ]
};

const reviews = [
  {
    platform: "Google",
    author: "Sophie L.",
    rating: 5,
    text: "Une des meilleures pizzas de Paris ! La pâte est incroyable, les ingrédients sont frais et de qualité. Le service est chaleureux. Je recommande la Truffata !",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
  },
  {
    platform: "TripAdvisor",
    author: "Marc D.",
    rating: 5,
    text: "Un petit coin d'Italie dans le 18ème. L'ambiance est conviviale, les pizzas sont authentiques et généreuses. Mention spéciale pour le Tiramisu maison.",
    logo: "https://static.tacdn.com/favicon.ico"
  },
  {
    platform: "The Fork",
    author: "Julie M.",
    rating: 9.5,
    text: "Excellente découverte ! La Margherita D.O.P est un délice absolu. Le personnel est aux petits soins et le cadre est très agréable. Nous reviendrons.",
    logo: "https://www.thefork.com/favicon.ico"
  },
  {
    platform: "The Fork",
    author: "Antoine R.",
    rating: 10,
    text: "Une vraie pépite ! Les pizzas sont généreuses et la pâte est parfaitement cuite. Le service est rapide et toujours avec le sourire. Allez-y les yeux fermés.",
    logo: "https://www.thefork.com/favicon.ico"
  },
  {
    platform: "The Fork",
    author: "Camille T.",
    rating: 9.0,
    text: "Très bon restaurant italien. Les produits sont frais et ça se sent. La focaccia en entrée était délicieuse, suivie d'une pizza Diavola excellente.",
    logo: "https://www.thefork.com/favicon.ico"
  },
  {
    platform: "The Fork",
    author: "Laurent B.",
    rating: 9.5,
    text: "Superbe adresse ! L'ambiance est top et les plats sont savoureux. Mention spéciale pour la pizza à la truffe qui est une merveille.",
    logo: "https://www.thefork.com/favicon.ico"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('pizzeRosse');
  const [lang, setLang] = useState<Language>('fr');

  const t = translations[lang];

  const tabs = [
    { id: 'antipasti', label: t.menu.categories.antipasti },
    { id: 'salades', label: t.menu.categories.salades },
    { id: 'focacce', label: t.menu.categories.focacce },
    { id: 'pizzeRosse', label: t.menu.categories.pizzeRosse },
    { id: 'pizzeBianche', label: t.menu.categories.pizzeBianche },
    { id: 'pateIntegrale', label: t.menu.categories.pateIntegrale },
    { id: 'dolci', label: t.menu.categories.dolci },
    { id: 'drinks', label: t.menu.categories.drinks },
  ];

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center">
              <span className="font-serif text-2xl font-bold text-red-700 tracking-tight">La Locanda di Pulcinella</span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#menu" className="text-stone-600 hover:text-red-700 font-medium transition-colors">{t.nav.menu}</a>
              <a href="#reviews" className="text-stone-600 hover:text-red-700 font-medium transition-colors">{t.nav.reviews}</a>
              <a href="#contact" className="text-stone-600 hover:text-red-700 font-medium transition-colors">{t.nav.contact}</a>
              <div className="relative group flex items-center gap-1 cursor-pointer text-stone-600 hover:text-red-700 transition-colors">
                <Globe className="w-4 h-4" />
                <span className="font-medium uppercase">{lang}</span>
                <div className="absolute top-full right-0 mt-2 w-24 bg-white rounded-lg shadow-lg border border-stone-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                  <button onClick={() => setLang('fr')} className={`w-full text-left px-4 py-2 text-sm hover:bg-stone-50 ${lang === 'fr' ? 'font-bold text-red-700' : 'text-stone-600'}`}>FR</button>
                  <button onClick={() => setLang('en')} className={`w-full text-left px-4 py-2 text-sm hover:bg-stone-50 ${lang === 'en' ? 'font-bold text-red-700' : 'text-stone-600'}`}>EN</button>
                  <button onClick={() => setLang('it')} className={`w-full text-left px-4 py-2 text-sm hover:bg-stone-50 ${lang === 'it' ? 'font-bold text-red-700' : 'text-stone-600'}`}>IT</button>
                </div>
              </div>
              <a 
                href="https://lalocandadipulcinella.com/fr/reservations" 
                target="_blank"
                rel="noreferrer"
                className="bg-red-700 text-white px-6 py-2.5 rounded-full font-medium hover:bg-red-800 transition-colors shadow-sm"
              >
                {t.nav.reserve}
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=2938&auto=format&fit=crop" 
            alt="Pizza making" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16 lg:mt-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6"
            dangerouslySetInnerHTML={{ __html: t.hero.title.replace('Paris', '<br/><span className="text-red-500 italic">Paris</span>') }}
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-stone-200 mb-10 max-w-2xl mx-auto font-light"
          >
            {t.hero.subtitle}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a 
              href="#menu" 
              className="bg-white text-stone-900 px-8 py-4 rounded-full font-semibold hover:bg-stone-100 transition-colors shadow-lg flex items-center justify-center"
            >
              {t.hero.menuBtn}
            </a>
            <a 
              href="https://lalocandadipulcinella.com/fr/commandes" 
              target="_blank"
              rel="noreferrer"
              className="bg-red-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-red-800 transition-colors shadow-lg flex items-center justify-center"
            >
              {lang === 'fr' ? 'Commander en ligne' : lang === 'en' ? 'Order Online' : 'Ordina Online'}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">{t.reviews.title}</h2>
            <div className="w-24 h-1 bg-red-700 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-stone-50 p-8 rounded-2xl shadow-sm border border-stone-100 relative"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm overflow-hidden p-2">
                      <img src={review.logo} alt={review.platform} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900">{review.author}</p>
                      <p className="text-xs text-stone-500 uppercase tracking-wider">{review.platform}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-stone-700">
                      {review.rating}{review.platform === 'The Fork' ? '/10' : '/5'}
                    </span>
                  </div>
                </div>
                <p className="text-stone-600 italic leading-relaxed">"{review.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-stone-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-4">{t.menu.title}</h2>
            <p className="text-stone-500 max-w-2xl mx-auto">{t.menu.subtitle}</p>
          </div>

          {/* Menu Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id 
                    ? 'bg-red-700 text-white shadow-md' 
                    : 'bg-white text-stone-600 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {/* @ts-ignore */}
              {menuData[activeTab].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="flex flex-col border-b border-stone-100 pb-4 last:border-0"
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-lg font-bold text-stone-900 font-serif">{item.name}</h3>
                    <span className="text-red-700 font-semibold ml-4 whitespace-nowrap">{item.price}</span>
                  </div>
                  {item.description && (
                    <p className="text-stone-500 text-sm leading-relaxed mb-2 pr-8">{item.description}</p>
                  )}
                  {item.image && (
                    <div className="mt-2 mb-3 rounded-xl overflow-hidden h-48 w-full">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  {item.tags && (
                    <div className="flex gap-2 mt-1">
                      {item.tags.map((tag: string, tIdx: number) => (
                        <span key={tIdx} className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm font-medium ${
                          tag === 'Végétarien' || tag === 'Végan' ? 'bg-green-100 text-green-800' : 
                          tag === 'Piquant' ? 'bg-orange-100 text-orange-800' : 'bg-stone-100 text-stone-800'
                        }`}>
                          {translateTag(tag, lang)}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Info / Contact Section */}
      <section id="contact" className="py-20 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h3 className="font-serif text-2xl font-bold text-red-500 mb-6">La Locanda di Pulcinella</h3>
              <p className="text-stone-400 mb-6 leading-relaxed">
                {t.contact.subtitle}
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-red-700 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-red-700 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 uppercase tracking-wider">{t.contact.contactUs}</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-stone-400">
                  <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <a href="https://www.google.com/maps/dir/?api=1&destination=48.8884146,2.3328307" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    17 Rue Damrémont<br/>75018 Paris
                  </a>
                </li>
                <li className="flex items-center gap-3 text-stone-400">
                  <Phone className="w-5 h-5 text-red-500 shrink-0" />
                  <a href="tel:+33142230948" className="hover:text-white transition-colors">+33 1 42 23 09 48</a>
                </li>
                <li className="flex items-start gap-3 text-stone-400">
                  <Clock className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p>{t.contact.tueSun}</p>
                    <p>12:00 - 14:30, 19:00 - 22:30</p>
                    <p className="text-red-400 mt-1">{t.contact.closedMon}</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 uppercase tracking-wider">{t.contact.info}</h4>
              <ul className="space-y-3 text-stone-400">
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-red-500"/> {t.contact.access}</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-red-500"/> {t.contact.terrace}</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-red-500"/> {t.contact.family}</li>
                <li className="mt-4 pt-4 border-t border-stone-800">
                  <span className="block text-sm text-stone-500 mb-2">{t.contact.payments}</span>
                  <span className="text-sm">Cash, Visa, Ticket Restaurant, Mastercard, Carte de débit, Chèque</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 uppercase tracking-wider">{t.contact.quickLinks}</h4>
              <ul className="space-y-3 text-stone-400">
                <li><a href="https://lalocandadipulcinella.com/fr/reservations" target="_blank" rel="noreferrer" className="hover:text-red-400 transition-colors">{t.contact.reservations}</a></li>
                <li><a href="https://lalocandadipulcinella.com/fr/commandes" target="_blank" rel="noreferrer" className="hover:text-red-400 transition-colors">{t.contact.orderOnline}</a></li>
                <li><a href="https://lalocandadipulcinella.com/fr/histoire" target="_blank" rel="noreferrer" className="hover:text-red-400 transition-colors">{t.contact.ourStory}</a></li>
                <li><a href="https://lalocandadipulcinella.com/fr/evenements" target="_blank" rel="noreferrer" className="hover:text-red-400 transition-colors">{t.contact.events}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-stone-800 text-center text-stone-500 text-sm">
            <p>&copy; {new Date().getFullYear()} {t.footer}</p>
            <div className="flex justify-center gap-4 mt-4">
              <a href="https://lalocandadipulcinella.com/fr/mentions-legales" className="hover:text-white">{t.contact.legal}</a>
              <a href="https://lalocandadipulcinella.com/fr/protection-des-donnees" className="hover:text-white">{t.contact.privacy}</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
