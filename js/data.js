const categories = [
  { id: 'hotel', icon: 'hotel', image: 'https://images.pexels.com/photos/22643802/pexels-photo-22643802.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'submarine', icon: 'submarine', image: 'https://images.pexels.com/photos/17975646/pexels-photo-17975646.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'island', icon: 'island', image: 'https://images.pexels.com/photos/12858459/pexels-photo-12858459.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'diving', icon: 'diving', image: 'https://images.pexels.com/photos/17668226/pexels-photo-17668226.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'luxury', icon: 'luxury', image: 'https://images.pexels.com/photos/15564127/pexels-photo-15564127.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'dolphin', icon: 'dolphin', image: 'https://images.pexels.com/photos/30915666/pexels-photo-30915666.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'watersports', icon: 'watersports', image: 'https://images.pexels.com/photos/12800806/pexels-photo-12800806.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'aquapark', icon: 'aquapark', image: 'https://images.pexels.com/photos/31166929/pexels-photo-31166929.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'horse', icon: 'horse', image: 'https://images.pexels.com/photos/17716816/pexels-photo-17716816.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'safari', icon: 'safari', image: 'https://images.pexels.com/photos/28356796/pexels-photo-28356796.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'fishing', icon: 'fishing', image: 'https://images.pexels.com/photos/29953803/pexels-photo-29953803.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
];

const categoryIcons = {
  hotel: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a6 6 0 0 1 6-6h6a6 6 0 0 1 6 6v3z"/></svg>',
  submarine: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M12 2v4"/><path d="M12 8v2"/></svg>',
  island: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v8.5L3 17h18l-7-6.5V2"/><path d="M2 19h20"/></svg>',
  diving: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"/><path d="M18 12v.5"/><path d="M16 17.93A9.48 9.48 0 0 1 12 19c-3.56 0-6.06-2.53-7-6"/></svg>',
  luxury: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 14c-1.5 0-2-2-2-2-1.5 0-2 2-2 2-1.5 0-2-2-2-2-1.5 0-2 2-2 2-1.5 0-2-2-2-2-1.5 0-2 2-2 2-1.5 0-2-2-2-2v-2"/><path d="M2 12h20v7H2z"/></svg>',
  dolphin: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>',
  watersports: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>',
  aquapark: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-3.26-2-4.6C7.67 6.42 6.42 7.2 6.42 7.2c.5.5.5 1.5 0 2-1.2 1.2-2.42 2.2-2.42 4.05 0 2.22 1.8 4.05 3 4.05z"/><path d="M12 2c1.1 0 2 .9 2 2"/><path d="M17 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-3.26-2-4.6C17.67 6.42 16.42 7.2 16.42 7.2c.5.5.5 1.5 0 2-1.2 1.2-2.42 2.2-2.42 4.05 0 2.22 1.8 4.05 3 4.05z"/><path d="M12 2c-1.1 0-2 .9-2 2v14"/></svg>',
  horse: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>',
  safari: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>',
  fishing: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"/><path d="M18 12v.5"/><path d="M16 17.93a9.77 9.77 0 0 1 0-11.86"/><path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33"/><path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4"/><path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98"/></svg>',
};

const excursions = [
  {
    id: 'hotel-booking', categoryId: 'hotel',
    image: 'https://images.pexels.com/photos/22643802/pexels-photo-22643802.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'Hotelbuchungen & Unterkünfte', en: 'Hotel Reservations & Accommodation' },
    short: { de: 'Hotels und Unterkünfte in Hurghada nach Ihren Wünschen und Ihrem Budget.', en: 'Hotels and accommodations in Hurghada tailored to your needs and budget.' },
    description: {
      de: 'Unser Service umfasst die Buchung von Hotels und Unterkünften in Hurghada und den umliegenden Touristenregionen. Wir helfen Ihnen, die passende Unterkunft entsprechend Ihrer Bedürfnisse, Vorlieben und Ihres Budgets zu finden.',
      en: 'Our service includes booking hotels and accommodations in Hurghada and surrounding tourist areas. We help you find suitable accommodation according to your needs, preferences, and budget.',
    },
    includes: { de: ['Persönliche Beratung', 'Unterkünfte für jedes Budget', 'Lokale Expertise'], en: ['Personal consultation', 'Accommodations for every budget', 'Local expertise'] },
  },
  {
    id: 'royal-sea-scope', categoryId: 'submarine',
    image: 'https://images.pexels.com/photos/36255961/pexels-photo-36255961.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'Royal Sea Scope U-Boot', en: 'Royal Sea Scope Submarine' },
    short: { de: 'Korallenriffe aus der klimatisierten Unterwasserkabine, ca. 3 Meter unter der Oberfläche.', en: 'Coral reefs from the air-conditioned underwater cabin, approx. 3 meters below the surface.' },
    description: {
      de: 'Genießen Sie die Schönheit des Roten Meeres und seiner spektakulären Meeresfauna vom Oberdeck und aus der klimatisierten Unterwasserkabine, etwa 3 Meter unter der Wasseroberfläche. Beobachten Sie farbenprächtige Korallenriffe und eine Vielzahl von Fischen durch die Panorama-Fenster auf beiden Seiten des U-Boots. Ein Schnorchel- und Schwimmstopp ist ebenfalls enthalten.',
      en: 'Enjoy the beauty of the Red Sea and its spectacular marine life from the upper deck and the air-conditioned underwater cabin, about 3 meters below the surface. Observe colorful coral reefs and a wide variety of fish through the panoramic glass windows on both sides. The trip also includes a stop for swimming and snorkeling.',
    },
    includes: { de: ['U-Boot-Fahrt mit Unterwasserkabine', 'Schnorchelstopp', 'Panorama-Fenster'], en: ['Submarine ride with underwater cabin', 'Snorkeling stop', 'Panoramic glass windows'] },
  },
  {
    id: 'panorama-submarine', categoryId: 'submarine',
    image: 'https://images.pexels.com/photos/12763812/pexels-photo-12763812.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'Panorama U-Boot', en: 'Panorama Submarine' },
    short: { de: 'Korallenriffe durch den Glasboden, mit Schnorchelstopp, Ausrüstung und Erfrischungen.', en: 'Coral reefs through the glass bottom, with snorkeling stop, equipment, and refreshments.' },
    description: {
      de: 'Genießen Sie den Blick auf farbenprächtige Korallenriffe und die Meeresfauna durch den Glasboden des U-Boots. Der Ausflug umfasst einen Schnorchelstopp zum Erkunden der Unterwasserwelt sowie Schnorchelausrüstung, Wasser und Erfrischungen.',
      en: "Enjoy views of colorful coral reefs and marine life through the submarine's glass-bottom viewing area. The trip includes a snorkeling stop to explore the underwater world, along with snorkeling equipment, water, and refreshments.",
    },
    includes: { de: ['Glasboden-Beobachtung', 'Schnorchelstopp', 'Schnorchelausrüstung', 'Wasser & Erfrischungen'], en: ['Glass-bottom viewing', 'Snorkeling stop', 'Snorkeling equipment', 'Water & refreshments'] },
  },
  {
    id: 'paradise-conquest', categoryId: 'submarine',
    image: 'https://images.pexels.com/photos/6858233/pexels-photo-6858233.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'Paradise Conquest U-Boot + Hula Hula Insel', en: 'Paradise Conquest Submarine + Hula Hula Island' },
    short: { de: 'Kombination aus U-Boot-Fahrt und Inselbesuch mit Buffet-Lunch und Afrika-Show.', en: 'Combined submarine and island excursion with buffet lunch and African show.' },
    description: {
      de: 'Eine Kombination aus U-Boot- und Inselausflug mit einzigartigem Meereserlebnis. Genießen Sie den Blick auf Korallenriffe und farbenfrohe Fische vom U-Boot, gefolgt von einem Schnorchelstopp und einem Besuch der Hula Hula Insel. Das Paket umfasst ein offenes Buffet-Mittagessen auf der Insel, ein Getränk zum Mittagessen, Erfrischungen während der U-Boot-Fahrt, eine leichte Schulter- und Nackenmassage sowie eine Afrika-Show an Bord.',
      en: 'A combined submarine and island excursion offering a unique marine experience. Enjoy views of coral reefs and colorful fish from the submarine, followed by a snorkeling stop and a visit to Hula Hula Island. The package includes an open-buffet lunch on the island, one drink with lunch, refreshments during the submarine trip, a light shoulder and neck massage, and an African show aboard the submarine.',
    },
    includes: { de: ['U-Boot-Fahrt', 'Schnorchelstopp', 'Hula Hula Insel', 'Buffet-Lunch', '1 Getränk', 'Massage', 'Afrika-Show'], en: ['Submarine ride', 'Snorkeling stop', 'Hula Hula Island', 'Buffet lunch', '1 drink', 'Massage', 'African show'] },
  },
  {
    id: 'red-sea-dolphin-sub', categoryId: 'submarine',
    image: 'https://images.pexels.com/photos/13010783/pexels-photo-13010783.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'Red Sea Dolphin U-Boot + Orange Bay Insel', en: 'Red Sea Dolphin Submarine + Orange Bay Island' },
    short: { de: 'Unterwassererkundung kombiniert mit Entspannung auf der Orange Bay Insel.', en: 'Underwater exploration combined with relaxation on Orange Bay Island.' },
    description: {
      de: 'Kombinieren Sie Unterwassererkundung mit einem entspannten Inselbesuch. Entdecken Sie farbenfrohe Fische und Korallenriffe vom U-Boot, genießen Sie einen Schnorchelstopp und besuchen Sie die Orange Bay Insel. Das Paket umfasst ein offenes Buffet-Mittagessen auf der Insel, Softdrinks wie Cola und Wasser während der U-Boot-Fahrt sowie Schnorchelausrüstung.',
      en: 'Combine underwater exploration with a relaxing island visit. Discover colorful fish and coral reefs from the submarine, enjoy a snorkeling stop, and visit Orange Bay Island. The package includes an open-buffet lunch on the island, soft drinks such as cola and water during the submarine trip, and snorkeling equipment.',
    },
    includes: { de: ['U-Boot-Fahrt', 'Schnorchelstopp', 'Orange Bay Insel', 'Buffet-Lunch', 'Softdrinks', 'Schnorchelausrüstung'], en: ['Submarine ride', 'Snorkeling stop', 'Orange Bay Island', 'Buffet lunch', 'Soft drinks', 'Snorkeling equipment'] },
  },
  {
    id: 'adventure-submarine', categoryId: 'submarine',
    image: 'https://images.pexels.com/photos/6858231/pexels-photo-6858231.png?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'Adventure U-Boot + Magawish Insel', en: 'Adventure Submarine + Magawish Island' },
    short: { de: 'U-Boot-Abenteuer, Schnorcheln und Besuch der Magawish Insel mit Buffet-Lunch im U-Boot.', en: 'Submarine adventure, snorkeling, and visit to Magawish Island with buffet lunch inside the submarine.' },
    description: {
      de: 'Genießen Sie eine Kombination aus U-Boot-Erkundung, Schnorcheln und einem Besuch der Magawish Insel. Das Programm umfasst Unterwasserblicke auf Korallenriffe und farbenfrohe Fische, einen Schnorchelstopp und Zeit auf der Magawish Insel. Gäste können ein offenes Buffet-Mittagessen im U-Boot genießen, Cola und Wasser während der Fahrt, Schnorchelausrüstung und eine Party auf dem Oberdeck vor dem Swimmingpool.',
      en: "Enjoy a combination of submarine exploration, snorkeling, and a visit to Magawish Island. The program includes underwater views of coral reefs and colorful fish, a snorkeling stop, and time on Magawish Island. Guests can enjoy an open-buffet lunch inside the submarine, cola and water during the trip, snorkeling equipment, and a party on the submarine's upper deck in front of the swimming pool.",
    },
    includes: { de: ['U-Boot-Fahrt', 'Schnorchelstopp', 'Magawish Insel', 'Buffet-Lunch im U-Boot', 'Cola & Wasser', 'Schnorchelausrüstung', 'Party auf dem Oberdeck'], en: ['Submarine ride', 'Snorkeling stop', 'Magawish Island', 'Buffet lunch inside submarine', 'Cola & water', 'Snorkeling equipment', 'Upper deck party'] },
  },
  {
    id: 'orange-bay-island', categoryId: 'island',
    image: 'https://images.pexels.com/photos/10802752/pexels-photo-10802752.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'Orange Bay Insel', en: 'Orange Bay Island' },
    short: { de: 'Bootstour mit zwei Schnorchelstops und Zeit auf der wunderschönen Orange Bay Insel.', en: 'Boat trip with two snorkeling stops and time on the beautiful Orange Bay Island.' },
    description: {
      de: 'Genießen Sie eine Bootstour, die Schnorcheln und Entspannung auf der wunderschönen Orange Bay Insel kombiniert. Das Programm umfasst zwei Schnorchelstops zur Erkundung der Meeresfauna und Korallenriffe, Zeit am Sandstrand und in der malerischen Umgebung der Insel sowie Zugang zu attraktiven Fotospots. Mittagessen und Erfrischungen werden an Bord serviert, Schnorchelausrüstung wird gestellt.',
      en: "Enjoy a boat trip combining snorkeling and relaxation on the beautiful Orange Bay Island. The program includes two snorkeling stops to explore marine life and coral reefs, time to enjoy the island's sandy beach and scenic surroundings, and access to attractive photo spots. Lunch and refreshments are served on board the boat, and snorkeling equipment is provided.",
    },
    includes: { de: ['2 Schnorchelstops', 'Orange Bay Insel', 'Sandstrand', 'Fotospots', 'Mittagessen an Bord', 'Erfrischungen', 'Schnorchelausrüstung'], en: ['2 snorkeling stops', 'Orange Bay Island', 'Sandy beach', 'Photo spots', 'Lunch on board', 'Refreshments', 'Snorkeling equipment'] },
  },
  {
    id: 'hula-hula-island', categoryId: 'island',
    image: 'https://images.pexels.com/photos/946685/pexels-photo-946685.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'Hula Hula Insel', en: 'Hula Hula Island' },
    short: { de: 'Bootstour mit zwei Schnorchelstops, Sandstrand und malerischer Landschaft.', en: 'Boat trip with two snorkeling stops, sandy beach, and scenic landscape.' },
    description: {
      de: 'Entdecken Sie die Schönheit des Roten Meeres mit einer Bootstour, die zwei Schnorchelstops zur Erkundung der Meeresfauna und Korallenriffe bietet. Entspannen Sie am Sandstrand der Insel, genießen Sie die natürliche Landschaft und machen Sie unvergessliche Fotos. Mittagessen und Erfrischungen werden an Bord serviert, einige Pakete beinhalten auch eine leichte Schulter- und Nackenmassage.',
      en: "Discover the beauty of the Red Sea with a boat trip featuring two snorkeling stops to explore marine life and coral reefs. Relax on the island's sandy beach, enjoy its natural scenery, and take memorable photographs. Lunch and refreshments are served on board the boat, and some packages also include a light shoulder and neck massage.",
    },
    includes: { de: ['2 Schnorchelstops', 'Sandstrand', 'Mittagessen an Bord', 'Erfrischungen', 'Teilweise Massage'], en: ['2 snorkeling stops', 'Sandy beach', 'Lunch on board', 'Refreshments', 'Sometimes massage'] },
  },
  {
    id: 'amwaj-island', categoryId: 'island',
    image: 'https://images.pexels.com/photos/4747782/pexels-photo-4747782.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'Amwaj Insel', en: 'Amwaj Island' },
    short: { de: 'Entspannte Bootstour zur Amwaj Insel mit Strand, Buffet-Lunch und Schnorchelstopp.', en: 'Relaxing boat trip to Amwaj Island with beach, buffet lunch, and snorkeling stop.' },
    description: {
      de: 'Genießen Sie eine entspannte Bootstour zur Amwaj Insel, wo Sie am Strand entspannen und die umgebende Meereslandschaft bewundern können. Das Programm umfasst Zeit auf der Insel, ein offenes Buffet-Mittagessen und einen Schnorchelstopp mit der benötigten Ausrüstung.',
      en: 'Enjoy a relaxing boat trip to Amwaj Island, where you can unwind on the beach and admire the surrounding marine scenery. The program includes time on the island, an open-buffet lunch, and a snorkeling stop with the necessary equipment.',
    },
    includes: { de: ['Inselbesuch', 'Buffet-Lunch', 'Schnorchelstopp', 'Schnorchelausrüstung'], en: ['Island visit', 'Buffet lunch', 'Snorkeling stop', 'Snorkeling equipment'] },
  },
  {
    id: 'sunset-white-island', categoryId: 'island',
    image: 'https://images.pexels.com/photos/22643850/pexels-photo-22643850.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'Sonnenuntergangstour zur White Island', en: 'Sunset Trip to White Island' },
    short: { de: 'Malerische Bootsfahrt zur White Island mit Sonnenuntergang, Erfrischungen und frischem Obst.', en: 'Scenic boat excursion to White Island with sunset, refreshments, and fresh fruit.' },
    description: {
      de: 'Genießen Sie eine malerische Bootsfahrt zur White Island und bewundern Sie den wunderschönen Sonnenuntergang über dem Roten Meer. Entspannen Sie, machen Sie unvergessliche Fotos und beobachten Sie, wie der Himmel seine Farben wechselt, während die Sonne über dem Wasser untergeht. Der Ausflug umfasst Erfrischungen und frisches Obst.',
      en: 'Enjoy a scenic boat excursion to White Island and admire the beautiful sunset over the Red Sea. Relax, take memorable photographs, and watch the sky change colors as the sun sets over the water. The trip includes refreshments and fresh fruit.',
    },
    includes: { de: ['Bootsfahrt', 'Sonnenuntergang', 'Erfrischungen', 'Frisches Obst'], en: ['Boat ride', 'Sunset views', 'Refreshments', 'Fresh fruit'] },
  },
  {
    id: 'dolphin-house', categoryId: 'island',
    image: 'https://images.pexels.com/photos/11740721/pexels-photo-11740721.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'Dolphin House Seetour', en: 'Dolphin House Sea Trip' },
    short: { de: 'Bootstour mit Schwimm- und Schnorchelstops und Chance, Delfine in freier Natur zu sehen.', en: 'Boat trip with swimming and snorkeling stops and a chance to see dolphins in the wild.' },
    description: {
      de: 'Genießen Sie eine Bootstour, die die Erkundung von Korallenriffen und Meeresfauna im Roten Meer bietet. Das Programm umfasst zwei Schwimm- und Schnorchelstops, einen Besuch des Dolphin House Gebiets, wo gute Chancen bestehen, Delfine in ihrem natürlichen Lebensraum zu sehen, sowie Mittagessen und Erfrischungen an Bord. Delfinsichtungen sind nicht garantiert.',
      en: 'Enjoy a boat excursion offering the opportunity to explore coral reefs and marine life in the Red Sea. The program includes two swimming and snorkeling stops, a visit to the Dolphin House area where there is a good chance of seeing dolphins in their natural habitat, and lunch and refreshments on board. Dolphin sightings are not guaranteed.',
    },
    includes: { de: ['2 Schwimm-/Schnorchelstops', 'Dolphin House Gebiet', 'Mittagessen an Bord', 'Erfrischungen'], en: ['2 swimming/snorkeling stops', 'Dolphin House area', 'Lunch on board', 'Refreshments'] },
  },
  {
    id: 'diving-trip', categoryId: 'diving',
    image: 'https://images.pexels.com/photos/4620455/pexels-photo-4620455.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'Tauchausflug', en: 'Diving Trip' },
    short: { de: 'Zwei Tauchgänge an verschiedenen Orten mit professionellen Tauchlehrern.', en: 'Two scuba dives at different locations with professional diving instructors.' },
    description: {
      de: 'Entdecken Sie die wunderschönen Korallenriffe und die vielfältige Fischwelt des Roten Meeres bei einem Tauchausflug. Das Programm umfasst zwei Tauchgänge an verschiedenen Orten mit Tauchausrüstung, begleitet von professionellen Tauchlehrern. Gäste können auch schnorcheln, ein Mittagessen an Bord genießen sowie heiße und kalte Getränke.',
      en: "Discover the Red Sea's beautiful coral reefs and diverse fish species on a diving excursion. The program includes two scuba dives at different locations using diving equipment, accompanied by professional diving instructors. Guests can also enjoy snorkeling, lunch on board the boat, and hot and cold beverages.",
    },
    includes: { de: ['2 Tauchgänge', 'Tauchausrüstung', 'Professionelle Tauchlehrer', 'Schnorcheln', 'Mittagessen an Bord', 'Heiße & kalte Getränke'], en: ['2 scuba dives', 'Diving equipment', 'Professional instructors', 'Snorkeling', 'Lunch on board', 'Hot & cold beverages'] },
  },
  {
    id: 'orange-bay-diving', categoryId: 'diving',
    image: 'https://images.pexels.com/photos/7001749/pexels-photo-7001749.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'Orange Bay Insel + Tauchen', en: 'Orange Bay Island + Diving' },
    short: { de: 'Kombiniertes Insel- und Taucherlebnis mit zwei Schnorchelstops und Orange Bay Besuch.', en: 'Combined island and diving experience with two snorkeling stops and Orange Bay visit.' },
    description: {
      de: 'Genießen Sie ein kombiniertes Insel- und Taucherlebnis im Roten Meer. Das Programm umfasst zwei Schnorchelstops, ein Taucherlebnis begleitet von Spezialisten, einen Besuch der Orange Bay Insel, ein Mittagessen an Bord, Getränke während der gesamten Fahrt und Schnorchelausrüstung.',
      en: 'Enjoy a combined island and diving experience in the Red Sea. The program includes two snorkeling stops, a scuba diving experience accompanied by specialists, a visit to Orange Bay Island, lunch on board the boat, drinks throughout the excursion, and snorkeling equipment.',
    },
    includes: { de: ['2 Schnorchelstops', 'Taucherlebnis', 'Orange Bay Insel', 'Mittagessen an Bord', 'Getränke', 'Schnorchelausrüstung'], en: ['2 snorkeling stops', 'Scuba diving experience', 'Orange Bay Island', 'Lunch on board', 'Drinks', 'Snorkeling equipment'] },
  },
  {
    id: 'pirates-boat', categoryId: 'luxury',
    image: 'https://images.pexels.com/photos/13574596/pexels-photo-13574596.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'Pirates Boat Luxustour', en: 'Pirates Boat Luxury Trip' },
    short: { de: 'Luxuriöse Segelboottour mit Meeresaktivitäten, Inselbesuch, Dining und Unterhaltung.', en: 'Luxury sailing boat trip with marine activities, island visit, dining, and entertainment.' },
    description: {
      de: 'Genießen Sie einen unvergesslichen Ausflug auf dem luxuriösen Pirates-Segelboot, das Meeresaktivitäten, Inselbesuch, Dining und Unterhaltung kombiniert. Das Programm umfasst einen Schnorchelstopp und einen Inselbesuch. Ein offenes Buffet-Mittagessen mit Meeresfrüchten wie Garnelen und Calamari, Grillhähnchen, Kofta, Meeresfrüchtesuppe, Reis, Nudeln, Gemüse, Salaten und Obst wird serviert. Getränke und Musik an Bord inklusive.',
      en: 'Enjoy a memorable sea excursion aboard the luxurious Pirates sailing boat, combining marine activities, island exploration, dining, and entertainment. The program includes a snorkeling stop and a visit to an island. An open-buffet lunch is served, featuring seafood such as shrimp and calamari, grilled chicken, kofta, seafood soup, rice, pasta, vegetables, salads, and seasonal fruit. Drinks and music are also available on board.',
    },
    includes: { de: ['Schnorchelstopp', 'Inselbesuch', 'Buffet mit Meeresfrüchten', 'Getränke', 'Musik'], en: ['Snorkeling stop', 'Island visit', 'Buffet with seafood', 'Drinks', 'Music'] },
  },
  {
    id: 'nefertari-boat', categoryId: 'luxury',
    image: 'https://images.pexels.com/photos/30710213/pexels-photo-30710213.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'Nefertari Pharaonen-Boot', en: 'Nefertari Pharaonic Boat' },
    short: { de: 'Boot im altägyptischen Stil mit U-Boot-Beobachtung, Pharaonen-Fotos und Menü.', en: 'Boat in ancient Egyptian style with submarine viewing, pharaonic photos, and set menu.' },
    description: {
      de: 'Erleben Sie einen besonderen Ausflug auf einem im altägyptischen Architekturstil gestalteten Boot. Das Programm umfasst ein Unterwasserbeobachtungserlebnis durch das im Boot integrierte U-Boot, mit dem Gäste Korallenriffe und Meeresfauna beobachten können, gefolgt von einem Schwimm- und Schnorchelstopp. Gäste können traditionelle Pharaonen-Kostüme tragen und Souvenirfotos im pharaonischen Salon machen. Mittag- oder Abendessen als Set-Menü mit Meeresfrüchten oder Grillgerichten, Getränke inklusive.',
      en: "Experience a distinctive sea excursion aboard a boat designed in the style of ancient Egyptian architecture. The program includes an underwater viewing experience through the submarine incorporated into the boat, allowing guests to observe coral reefs and marine life, followed by a swimming and snorkeling stop. Guests can also wear traditional Pharaonic costumes and take souvenir photographs inside the boat's Pharaonic-style salon. Lunch or dinner is served as a set menu featuring seafood or grilled dishes, accompanied by drinks.",
    },
    includes: { de: ['U-Boot-Beobachtung', 'Schnorchelstopp', 'Pharaonen-Kostüme & Fotos', 'Set-Menü', 'Getränke'], en: ['Submarine viewing', 'Snorkeling stop', 'Pharaonic costumes & photos', 'Set menu', 'Drinks'] },
  },
  {
    id: 'private-glass-boat', categoryId: 'luxury',
    image: 'https://images.pexels.com/photos/35155740/pexels-photo-35155740.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'Privates Glasboot', en: 'Private Glass Boat' },
    short: { de: 'Privater Bootsausflug mit Glasboden zur Unterwasserbeobachtung und Schnorcheln.', en: 'Private boat excursion with glass bottom for underwater viewing and snorkeling.' },
    description: {
      de: 'Genießen Sie einen privaten Bootsausflug und entdecken Sie die Unterwasserschönheit des Roten Meeres durch den Glasboden. Der Ausflug umfasst die Beobachtung von Korallenriffen und farbenfrohen Fischen sowie Schnorcheln. Längere Ausflüge können einen Stopp nahe der Abu Minqar Insel beinhalten, um die umgebende Meereslandschaft zu genießen.',
      en: "Enjoy a private boat excursion and discover the underwater beauty of the Red Sea through the boat's glass-bottom viewing area. The trip includes opportunities to observe coral reefs and colorful fish, as well as snorkeling. Longer excursions may include a stop near Abu Minqar Island to enjoy the surrounding marine scenery and natural environment.",
    },
    includes: { de: ['Privates Boot', 'Glasboden-Beobachtung', 'Schnorcheln', 'Optionale Inselanfahrt'], en: ['Private boat', 'Glass-bottom viewing', 'Snorkeling', 'Optional island stop'] },
  },
  {
    id: 'dolphin-show', categoryId: 'dolphin',
    image: 'https://images.pexels.com/photos/30915666/pexels-photo-30915666.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'Delfinshow', en: 'Dolphin Show' },
    short: { de: 'Unterhaltsame Show mit Delfinen, Seelöwen und Robben unter professioneller Aufsicht.', en: 'Entertaining show with dolphins, sea lions, and seals under professional supervision.' },
    description: {
      de: 'Genießen Sie eine unterhaltsame Show mit Delfinen und anderen Meereslebewesen. Das Programm umfasst Delfinvorführungen, Seelöwenshows, Seehund- und Seekatzen-Vorführungen mit einer Vielzahl von Bewegungen, Sprüngen und interaktiven Demonstrationen, präsentiert unter der Aufsicht professioneller Trainer.',
      en: 'Enjoy an entertaining show featuring dolphins and other marine animals. The program includes dolphin performances, sea lion shows, sea cat performances, and seal performances, with a variety of movements, jumps, and interactive demonstrations presented under the supervision of professional trainers.',
    },
    includes: { de: ['Delfin-Vorführungen', 'Seelöwen-Show', 'Robben-Show', 'Professionelle Trainer'], en: ['Dolphin performances', 'Sea lion show', 'Seal show', 'Professional trainers'] },
  },
  {
    id: 'swim-dolphins', categoryId: 'dolphin',
    image: 'https://images.pexels.com/photos/28770247/pexels-photo-28770247.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'Mit Delfinen schwimmen', en: 'Swimming with Dolphins' },
    short: { de: 'Interaktives Schwimmerlebnis mit Delfinen unter Aufsicht spezialisierter Trainer.', en: 'Interactive swimming experience with dolphins under supervision of specialized trainers.' },
    description: {
      de: 'Genießen Sie ein interaktives Schwimmerlebnis mit Delfinen in Schwimmbecken unter der Aufsicht spezialisierter Trainer. Dieses Erlebnis bietet die Möglichkeit, mit Delfinen aus nächster Nähe in einer überwachten Umgebung zu interagieren.',
      en: 'Enjoy an interactive swimming experience with dolphins in swimming pools under the supervision of specialized trainers. This experience offers the opportunity to interact with dolphins at close range in a supervised environment.',
    },
    includes: { de: ['Schwimmen mit Delfinen', 'Betreuung durch Trainer', 'Sichere Umgebung'], en: ['Swimming with dolphins', 'Trainer supervision', 'Safe environment'] },
  },
  {
    id: 'water-sports', categoryId: 'watersports',
    image: 'https://images.pexels.com/photos/12800806/pexels-photo-12800806.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'Wassersport', en: 'Water Sports' },
    short: { de: 'Parasailing, Bananenboot, Tube Ride, Twister und Jet Boat am Roten Meer.', en: 'Parasailing, banana boat, tube ride, twister, and jet boat on the Red Sea.' },
    description: {
      de: 'Erleben Sie eine Vielzahl aufregender Wasseraktivitäten am Roten Meer, die Abenteuer, Spaß und schöne Küstenansichten kombinieren. Verfügbare Aktivitäten: Parasailing (Fliegen über dem Meer mit Panoramablick), Bananenboot (Gruppenfahrt auf einem bananenartigen Schlauchboot), Tube Ride (Ritt auf einem Schlauch), Twister / Speed Boot (schnelle Fahrt mit Kurven und Drifts) und Jet Boat (High-Speed-Fahrt auf dem Meer).',
      en: 'Experience a variety of exciting water activities on the Red Sea, combining adventure, fun, and beautiful coastal views. Available activities: Parasailing (fly above the sea with panoramic views), Banana Boat (group ride on an inflatable banana-shaped boat), Tube Ride (riding an inflatable tube), Twister / Speed Boat (fast-paced ride with sharp turns and drifting), and Jet Boat (exhilarating high-speed ride on the sea).',
    },
    includes: { de: ['Parasailing', 'Bananenboot', 'Tube Ride', 'Twister / Speed Boot', 'Jet Boat'], en: ['Parasailing', 'Banana Boat', 'Tube Ride', 'Twister / Speed Boat', 'Jet Boat'] },
  },
  {
    id: 'makadi-water-world', categoryId: 'aquapark',
    image: 'https://images.pexels.com/photos/31166929/pexels-photo-31166929.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'Makadi Water World Aqua Park', en: 'Makadi Water World Aqua Park' },
    short: { de: 'Großer Wasserpark mit vielen Attraktionen, Getränken, Snacks und Mittagessen.', en: 'Major water park with many attractions, drinks, snacks, and lunch.' },
    description: {
      de: 'Genießen Sie einen erlebnisreichen Tag im Makadi Water World, einem der größten Wasserparks Ägyptens mit zahlreichen Attraktionen für Groß und Klein. Das Programm umfasst Zugang zu verschiedenen Wasserrutschen und Attraktionen, heiße und kalte Getränke, Snacks und Kuchen. Das Mittagessen bietet Pizza, Pasta, Burger, Würstchen, Shawarma und mehr. Obst, Eis und Waffeln sind ebenfalls verfügbar.',
      en: 'Enjoy a fun-filled day at Makadi Water World, a major water park in Egypt offering a wide range of attractions for adults and children. The program includes access to various water slides and attractions, hot and cold drinks, snacks, and cake. Lunch offers a variety of dishes, including pizza, pasta, burgers, sausages, shawarma, and other options. Fruit, ice cream, and waffles are also available.',
    },
    includes: { de: ['Wasserrutschen & Attraktionen', 'Heiße & kalte Getränke', 'Snacks & Kuchen', 'Mittagessen', 'Obst, Eis & Waffeln'], en: ['Water slides & attractions', 'Hot & cold drinks', 'Snacks & cake', 'Lunch', 'Fruit, ice cream & waffles'] },
  },
  {
    id: 'amc-royal', categoryId: 'aquapark',
    image: 'https://images.pexels.com/photos/39014804/pexels-photo-39014804.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'AMC Royal Aqua Park', en: 'AMC Royal Aqua Park' },
    short: { de: 'Erholungstag mit Wasserattraktionen, Strand, Sandwiches und Getränken.', en: 'Recreational day with water attractions, beach, sandwiches, and drinks.' },
    description: {
      de: 'Genießen Sie einen erholsamen Tag, der Wasseraktivitäten und Strandentspannung kombiniert. Das Programm umfasst Zugang zu einer Auswahl an Wasserattraktionen, Zeit am Strand, drei große Sandwiches, heiße oder kalte Softdrinks und Mineralwasser.',
      en: 'Enjoy a recreational day combining water activities and beach relaxation. The program includes access to a selection of water attractions, time to enjoy the beach, three large sandwiches, hot or cold soft drinks, and mineral water.',
    },
    includes: { de: ['Wasserattraktionen', 'Strandzeit', '3 Sandwiches', 'Softdrinks', 'Mineralwasser'], en: ['Water attractions', 'Beach time', '3 sandwiches', 'Soft drinks', 'Mineral water'] },
  },
  {
    id: 'new-eagles', categoryId: 'aquapark',
    image: 'https://images.pexels.com/photos/33326697/pexels-photo-33326697.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'New Eagles Aqua Park', en: 'New Eagles Aqua Park' },
    short: { de: 'Tag voller Wasserunterhaltung mit Strand, Mittagessen, Snacks und Getränken.', en: 'Day of water entertainment with beach, lunch, snacks, and cold drinks.' },
    description: {
      de: 'Genießen Sie einen Tag mit Wasserunterhaltung und Entspannung. Das Programm umfasst Zugang zu einer Vielzahl von Wasserattraktionen, Zeit am Sandstrand, Mittagessen, Snacks und kalte Softdrinks.',
      en: 'Enjoy a day of water-based entertainment and relaxation. The program includes access to a variety of water attractions, time to relax on a sandy beach, lunch, snacks, and cold soft drinks.',
    },
    includes: { de: ['Wasserattraktionen', 'Sandstrand', 'Mittagessen', 'Snacks', 'Kalte Getränke'], en: ['Water attractions', 'Sandy beach', 'Lunch', 'Snacks', 'Cold drinks'] },
  },
  {
    id: 'horse-riding', categoryId: 'horse',
    image: 'https://images.pexels.com/photos/17716816/pexels-photo-17716816.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'Pferdereiten', en: 'Horse Riding' },
    short: { de: 'Entspanntes Reiten am Strand, in der Wüste oder beides kombiniert.', en: 'Relaxing horseback riding along the beach, desert, or both combined.' },
    description: {
      de: 'Genießen Sie ein entspanntes Naturerlebnis mit Pferdereiten am Strand oder durch die Wüste. Gäste können die Küstenlandschaft erkunden, die Schönheit der Wüste erleben oder beide Landschaften kombinieren für ein unvergessliches Abenteuer inmitten der Natur des Roten-Meer-Gebiets.',
      en: 'Enjoy a relaxing outdoor experience with horse riding along the beach or through the desert. Guests can choose to explore the coastal landscape, experience the beauty of the desert, or combine both settings for a memorable outdoor adventure surrounded by the natural scenery of the Red Sea region.',
    },
    includes: { de: ['Reiten am Strand', 'Reiten in der Wüste', 'Kombination möglich', 'Naturerlebnis'], en: ['Beach riding', 'Desert riding', 'Combination possible', 'Nature experience'] },
  },
  {
    id: 'mini-safari', categoryId: 'safari',
    image: 'https://images.pexels.com/photos/20734775/pexels-photo-20734775.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'Mini Safari', en: 'Mini Safari' },
    short: { de: 'Beach Buggy und Spider-Car durch die Wüste – Abenteuer pur.', en: 'Beach buggy and spider-car through the desert – pure adventure.' },
    description: {
      de: 'Erleben Sie ein aufregendes Wüstenabenteuer, das Offroad-Fahren und Naturerkundung kombiniert. Das Programm umfasst eine Beach-Buggy-Fahrt und eine Spider-Car-Fahrt, bei der Gäste den Nervenkitzel der Fahrt durch das Wüstengelände genießen.',
      en: 'Experience an exciting desert adventure combining off-road driving and outdoor exploration. The program includes a beach buggy driving experience and a spider-car ride, allowing guests to enjoy the thrill of driving across the desert terrain.',
    },
    includes: { de: ['Beach Buggy', 'Spider-Car'], en: ['Beach buggy', 'Spider-car'] },
  },
  {
    id: 'mega-safari', categoryId: 'safari',
    image: 'https://images.pexels.com/photos/13252297/pexels-photo-13252297.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'Mega Safari', en: 'Mega Safari' },
    short: { de: 'Buggy, Spider-Car und Aktivitäten im Safari-Center.', en: 'Buggy, spider-car, and activities at the safari center.' },
    description: {
      de: 'Genießen Sie ein Wüstenabenteuer, das Offroad-Fahren mit Freizeitaktivitäten im Safari-Center kombiniert. Das Programm umfasst eine Beach-Buggy-Fahrt, eine Spider-Car-Fahrt und Zeit, um die Wüstenumgebung und die Aktivitäten im Safari-Center zu genießen.',
      en: 'Enjoy a desert adventure combining off-road driving with recreational activities at the safari center. The program includes beach buggy driving, a spider-car ride, and time to enjoy the desert surroundings and activities available at the safari center.',
    },
    includes: { de: ['Beach Buggy', 'Spider-Car', 'Safari-Center Aktivitäten'], en: ['Beach buggy', 'Spider-car', 'Safari center activities'] },
  },
  {
    id: 'family-safari', categoryId: 'safari',
    image: 'https://images.pexels.com/photos/20734772/pexels-photo-20734772.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'Family Safari', en: 'Family Safari' },
    short: { de: 'Familienfreundliches Wüstenabenteuer mit Buggy, Jeep und Beduinen-Dorf.', en: 'Family-friendly desert adventure with buggy, jeep, and Bedouin village.' },
    description: {
      de: 'Genießen Sie ein familienfreundliches Wüstenabenteuer, das Offroad-Fahren, traditionelle Kultur und Outdoor-Aktivitäten kombiniert. Das Programm umfasst eine Beach-Buggy-Fahrt, eine Spider-Car-Fahrt und eine Jeep-Fahrt zum Beduinendorf. Gäste können ein traditionelles Beduinenhaus besuchen, die Beduinenkultur kennenlernen, Kamele reiten, traditionellen Beduinen-Tee trinken und das Dorf fotografieren.',
      en: 'Enjoy a family-friendly desert adventure combining off-road driving, traditional culture, and outdoor activities. The program includes beach buggy driving, a spider-car ride, and a jeep journey to a Bedouin village. Guests can visit a traditional Bedouin house, learn about Bedouin culture and lifestyle, ride camels, drink traditional Bedouin tea, and explore the village while taking photographs.',
    },
    includes: { de: ['Beach Buggy', 'Spider-Car', 'Jeep-Fahrt', 'Beduinendorf', 'Kamelreiten', 'Beduinen-Tee'], en: ['Beach buggy', 'Spider-car', 'Jeep ride', 'Bedouin village', 'Camel riding', 'Bedouin tea'] },
  },
  {
    id: 'super-safari', categoryId: 'safari',
    image: 'https://images.pexels.com/photos/20734788/pexels-photo-20734788.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'Super Safari', en: 'Super Safari' },
    short: { de: 'Umfassendes Wüstenerlebnis mit Buggy, Jeep, Beduinenkultur, Abendessen und Show.', en: 'Comprehensive desert experience with buggy, jeep, Bedouin culture, dinner, and show.' },
    description: {
      de: 'Genießen Sie ein umfassendes Wüstenerlebnis, das Offroad-Fahren, kulturelle Aktivitäten, traditionelles Essen und Unterhaltung kombiniert. Das Programm umfasst eine Beach-Buggy-Fahrt, eine Spider-Car-Fahrt und eine Jeep-Fahrt zum Beduinendorf. Gäste können ein traditionelles Beduinenhaus besuchen, die Beduinenkultur entdecken, Kamele reiten und traditionellen Beduinen-Tee genießen. Das Erlebnis umfasst auch ein Beduinen-Abendessen und eine unterhaltsame Abendshow.',
      en: 'Enjoy a comprehensive desert experience combining off-road driving, cultural activities, traditional dining, and entertainment. The program includes beach buggy driving, a spider-car ride, and a jeep journey to a Bedouin village. Guests can visit a traditional Bedouin house, discover Bedouin culture, ride camels, and enjoy traditional Bedouin tea. The experience also includes a Bedouin-style dinner and an entertaining evening show.',
    },
    includes: { de: ['Beach Buggy', 'Spider-Car', 'Jeep-Fahrt', 'Beduinendorf', 'Kamelreiten', 'Beduinen-Tee', 'Abendessen', 'Abendshow'], en: ['Beach buggy', 'Spider-car', 'Jeep ride', 'Bedouin village', 'Camel riding', 'Bedouin tea', 'Dinner', 'Evening show'] },
  },
  {
    id: 'jeep-safari', categoryId: 'safari',
    image: 'https://images.pexels.com/photos/28356796/pexels-photo-28356796.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'Jeep Safari', en: 'Jeep Safari' },
    short: { de: 'Jeep-Tour durch die Wüste zum Beduinendorf mit Kultur, Kamelreiten und Abendessen.', en: 'Jeep tour through the desert to Bedouin village with culture, camel riding, and dinner.' },
    description: {
      de: 'Erkunden Sie die Wüstenlandschaft auf einer Jeepsafari und entdecken Sie die traditionelle Lebensweise der Beduinen-Gemeinschaft. Das Programm umfasst eine Jeep-Fahrt durch die Wüste, einen Besuch des Beduinendorfs und eines traditionellen Beduinenhauses sowie die Möglichkeit, die lokale Kultur kennenzulernen. Gäste können auch Kamelreiten, traditionellen Beduinen-Tee, Abendessen und eine Beduinen-Unterhaltungsshow genießen.',
      en: 'Explore the desert landscape on a jeep safari and discover the traditional lifestyle of the Bedouin community. The program includes a jeep journey through the desert, a visit to a Bedouin village and traditional Bedouin house, and an opportunity to learn about local culture and traditions. Guests can also enjoy camel riding, traditional Bedouin tea, dinner, and a Bedouin entertainment show.',
    },
    includes: { de: ['Jeep-Fahrt', 'Beduinendorf', 'Beduinenhaus', 'Kamelreiten', 'Beduinen-Tee', 'Abendessen', 'Abendshow'], en: ['Jeep ride', 'Bedouin village', 'Bedouin house', 'Camel riding', 'Bedouin tea', 'Dinner', 'Evening show'] },
  },
  {
    id: 'vip-sunset-safari', categoryId: 'safari',
    image: 'https://images.pexels.com/photos/39180286/pexels-photo-39180286.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'VIP Sonnenuntergang Safari', en: 'VIP Sunset Safari' },
    short: { de: 'Premium Wüstentour mit Buggy, Sonnenuntergang, Abendessen, Sternbeobachtung und Teleskop.', en: 'Premium desert tour with buggy, sunset, dinner, stargazing, and telescope.' },
    description: {
      de: 'Genießen Sie ein erstklassiges Wüstenabenteuer, das Offroad-Fahren, kulturelle Erlebnisse, Sonnenuntergangsblicke, traditionelles Essen und Sternbeobachtung kombiniert. Das Programm umfasst eine Beach-Buggy-Fahrt, eine Jeepsafari zum Beduinendorf, Kamelreiten, den Besuch eines uralten Akazienbaums und einer Bergöhle. Gäste können den Wüstensonnenuntergang bewundern und ein traditionelles Abendessen genießen (Viertelhähnchen, Kofta, Basmatireis, Wasser, Cola und Obst). Das Erlebnis endet mit einer traditionellen Beduinen-Versammlung unter den Sternen mit Sternbeobachtung durch ein Teleskop.',
      en: 'Enjoy a premium desert adventure combining off-road driving, cultural experiences, sunset views, traditional dining, and stargazing. The program includes a beach buggy ride, a jeep safari to a Bedouin village, camel riding, a visit to an ancient acacia tree, and a visit to a mountain cave. Guests can admire the desert sunset before enjoying a traditional dinner featuring a quarter chicken, kofta, basmati rice, bottled water, a can of cola, and seasonal fruit. The experience concludes with a traditional Bedouin gathering beneath the stars, where guests can enjoy stargazing through a telescope.',
    },
    includes: { de: ['Beach Buggy', 'Jeep-Safari', 'Kamelreiten', 'Akazienbaum & Bergöhle', 'Sonnenuntergang', 'Abendessen', 'Sternbeobachtung mit Teleskop'], en: ['Beach buggy', 'Jeep safari', 'Camel riding', 'Acacia tree & mountain cave', 'Sunset views', 'Dinner', 'Stargazing with telescope'] },
  },
  {
    id: 'sea-fishing-trip', categoryId: 'fishing',
    image: 'https://images.pexels.com/photos/18335889/pexels-photo-18335889.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'Angelausflug auf dem Meer', en: 'Sea Fishing Trip' },
    short: { de: 'Angelabenteuer im Roten Meer mit Küstenlandschaft und kristallklarem Wasser.', en: 'A fishing adventure in the Red Sea, with coastal scenery and crystal-clear water.' },
    description: {
      de: 'Genießen Sie ein Angelabenteuer im Roten Meer, umgeben von schöner Küstenlandschaft und kristallklarem Wasser. Der Ausflug bietet Gästen die Möglichkeit, an ausgewählten Stellen zu angeln, Zeit auf dem Meer zu verbringen und Freizeitangeln mit Freunden oder der Familie zu erleben. Das Programm kann Angelausrüstung, Unterstützung durch die Bootscrew und Zeit zum Genießen der Meeresumgebung umfassen. Die konkreten Leistungen hängen vom gewählten Paket ab.',
      en: 'Enjoy a fishing adventure in the Red Sea, surrounded by beautiful coastal scenery and crystal-clear waters. The trip offers guests the opportunity to fish at selected locations, enjoy time at sea, and experience recreational fishing with friends or family. The program may include fishing equipment, assistance from the boat crew, and time to enjoy the marine environment. Specific inclusions depend on the selected package.',
    },
    includes: { de: ['Angelausrüstung je nach Paket', 'Unterstützung durch die Bootscrew', 'Zeit auf dem Meer'], en: ['Fishing equipment depending on package', 'Assistance from the boat crew', 'Time at sea'] },
  },
  {
    id: 'private-fishing-boat', categoryId: 'fishing',
    image: 'https://images.pexels.com/photos/22643815/pexels-photo-22643815.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'Privater Angelboot-Ausflug', en: 'Private Fishing Boat Trip' },
    short: { de: 'Privates Angelboot exklusiv für Ihre Gruppe, mit Ausrüstung und Begleitung durch Kapitän und Crew.', en: 'A private fishing boat reserved for your group, with equipment and guidance from the captain and crew.' },
    description: {
      de: 'Genießen Sie einen privaten Angelausflug an Bord eines Bootes, das exklusiv für Ihre Gruppe reserviert ist. Dieses Erlebnis eignet sich ideal für Familien, Freunde und Angelfreunde, die eine persönlichere und flexiblere Tour suchen. Das Programm kann Angelruten, Rollen, Köder und weitere Angelausrüstung sowie die Begleitung durch Kapitän und Crew umfassen. Gäste können verschiedene Angelplätze im Roten Meer erkunden. Je nach Paket und Seebedingungen gibt es auch die Möglichkeit zum Schwimmen oder Entspannen an Bord.',
      en: 'Enjoy a private fishing excursion aboard a boat reserved exclusively for your group. This experience is ideal for families, friends, and fishing enthusiasts looking for a more personalized and flexible trip. The program may include fishing rods, reels, bait, and other fishing equipment, along with guidance from the captain and crew. Guests can explore different fishing locations in the Red Sea, with opportunities for swimming or relaxing on board, depending on the package and sea conditions.',
    },
    includes: { de: ['Boot exklusiv für Ihre Gruppe', 'Angelruten, Rollen und Köder', 'Begleitung durch Kapitän und Crew', 'Schwimmen oder Entspannen an Bord'], en: ['Boat reserved exclusively for your group', 'Rods, reels, and bait', 'Guidance from the captain and crew', 'Swimming or relaxing on board'] },
  },
  {
    id: 'deep-sea-sport-fishing', categoryId: 'fishing',
    image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: { de: 'Hochsee- und Sportangeln', en: 'Deep-Sea & Sport Fishing' },
    short: { de: 'Anspruchsvolleres Angeln in tieferen Gewässern des Roten Meeres, mit der Chance auf größere Fische.', en: 'A more challenging fishing adventure in the deeper waters of the Red Sea, with a chance to target larger fish.' },
    description: {
      de: 'Erleben Sie ein spezialisierteres Angelabenteuer in den tieferen Gewässern des Roten Meeres. Dieser Ausflug richtet sich an Angelfreunde, die ein anspruchsvolleres Erlebnis und die Möglichkeit suchen, größere Fische anzuvisieren.',
      en: 'Experience a more specialized fishing adventure in the deeper waters of the Red Sea. This excursion is designed for fishing enthusiasts seeking a more challenging experience and the opportunity to target larger fish.',
    },
    includes: { de: ['Tiefere Gewässer des Roten Meeres', 'Anspruchsvolleres Angelerlebnis', 'Möglichkeit auf größere Fische'], en: ['Deeper waters of the Red Sea', 'A more challenging fishing experience', 'Opportunity to target larger fish'] },
  },
];

const heroImages = [
  'https://images.pexels.com/photos/22643843/pexels-photo-22643843.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/28376565/pexels-photo-28376565.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/22643850/pexels-photo-22643850.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/12858459/pexels-photo-12858459.jpeg?auto=compress&cs=tinysrgb&w=1920',
];

const WHATSAPP_NUMBER = '491771498212';
const EMAIL = 'info@agyptenzeit.com';
const PHONE_EG = '+201025328526';

const contactCards = [
  { icon: 'whatsapp', label: { de: 'WhatsApp', en: 'WhatsApp' }, value: '+49 177 1498212', href: 'https://wa.me/491771498212', color: '#4ade80' },
  { icon: 'email', label: { de: 'E-Mail', en: 'Email' }, value: 'info@agyptenzeit.com', href: 'mailto:info@agyptenzeit.com', color: '#C8A24B' },
  { icon: 'phone', label: { de: 'Telefon (Ägypten)', en: 'Phone (Egypt)' }, value: '+20 10 25328526', href: 'tel:+201025328526', color: '#1A8E8E' },
];

const contactIcons = {
  whatsapp: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>',
  email: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  phone: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 6.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
};

const aboutFeatureIcons = [
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>',
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>',
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
];
