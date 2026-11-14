/* Last-minute hotel deals for the Hotels section. Edit this file to add, remove, or change deals.
   - area: hurghada | makadi | sahl-hasheesh | el-gouna | soma-bay
   - board: AI (All Inclusive) | UAI (Ultra All Inclusive) | HB (half board) | BB (breakfast)
   - price / oldPrice: euros per person for the whole stay
   - checkIn: arrival date (YYYY-MM-DD)
   - validUntil: when the deal ends (Hurghada time). Expired deals are hidden automatically.
   - roomsLeft: rooms still available at this price */
window.SITE_HOTELS = {
  "deals": [
    {
      "id": "makadi-aqua-resort",
      "name": { "de": "Strandresort mit Aquapark", "en": "Beach resort with aqua park" },
      "area": "makadi",
      "stars": 5,
      "board": "AI",
      "nights": 7,
      "checkIn": "2026-11-22",
      "validUntil": "2026-11-19T23:59:00+02:00",
      "price": 449,
      "oldPrice": 699,
      "roomsLeft": 3,
      "image": "assets/activities/hotel-booking/3.jpg",
      "perks": { "de": ["Aquapark & Rutschen", "Privatstrand", "Flughafentransfer"], "en": ["Aqua park & slides", "Private beach", "Airport transfer"] }
    },
    {
      "id": "hurghada-family-slides",
      "name": { "de": "Familienhotel mit Rutschenpool", "en": "Family hotel with slide pool" },
      "area": "hurghada",
      "stars": 4,
      "board": "AI",
      "nights": 5,
      "checkIn": "2026-11-24",
      "validUntil": "2026-11-21T23:59:00+02:00",
      "price": 289,
      "oldPrice": 420,
      "roomsLeft": 5,
      "image": "assets/activities/hotel-booking/4.jpg",
      "perks": { "de": ["Kinderclub", "Rutschenpool", "Animation"], "en": ["Kids club", "Slide pool", "Entertainment"] }
    },
    {
      "id": "sahl-hasheesh-suite",
      "name": { "de": "Boutique-Suite am Pool", "en": "Boutique suite by the pool" },
      "area": "sahl-hasheesh",
      "stars": 5,
      "board": "HB",
      "nights": 4,
      "checkIn": "2026-11-27",
      "validUntil": "2026-11-24T23:59:00+02:00",
      "price": 259,
      "oldPrice": 380,
      "roomsLeft": 2,
      "image": "assets/activities/hotel-booking/5.jpg",
      "perks": { "de": ["Suite mit Lounge", "Spa-Zugang", "Strandnähe"], "en": ["Suite with lounge", "Spa access", "Close to the beach"] }
    },
    {
      "id": "el-gouna-lagoon",
      "name": { "de": "Lagunen-Resort mit Poollandschaft", "en": "Lagoon resort with pool landscape" },
      "area": "el-gouna",
      "stars": 5,
      "board": "AI",
      "nights": 6,
      "checkIn": "2026-12-01",
      "validUntil": "2026-11-28T23:59:00+02:00",
      "price": 469,
      "oldPrice": 640,
      "roomsLeft": 4,
      "image": "assets/activities/hotel-booking/2.jpg",
      "perks": { "de": ["Lagunenblick", "Mehrere Pools", "Shuttle in die Marina"], "en": ["Lagoon view", "Several pools", "Shuttle to the marina"] }
    },
    {
      "id": "soma-bay-quiet",
      "name": { "de": "Ruhiges Strandhotel für Erholung", "en": "Quiet beach hotel to unwind" },
      "area": "soma-bay",
      "stars": 5,
      "board": "UAI",
      "nights": 7,
      "checkIn": "2026-12-05",
      "validUntil": "2026-12-01T23:59:00+02:00",
      "price": 629,
      "oldPrice": 890,
      "roomsLeft": 6,
      "image": "assets/activities/hotel-booking/1.jpg",
      "perks": { "de": ["Hausriff zum Schnorcheln", "Adults-Bereich", "Premium-Getränke"], "en": ["House reef for snorkeling", "Adults area", "Premium drinks"] }
    },
    {
      "id": "hurghada-marina-city",
      "name": { "de": "Stadthotel nahe der Marina", "en": "City hotel near the marina" },
      "area": "hurghada",
      "stars": 3,
      "board": "BB",
      "nights": 3,
      "checkIn": "2026-11-18",
      "validUntil": "2026-11-17T23:59:00+02:00",
      "price": 99,
      "oldPrice": 150,
      "roomsLeft": 7,
      "image": "https://images.pexels.com/photos/22643802/pexels-photo-22643802.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "perks": { "de": ["Zentrale Lage", "Restaurants & Cafés", "Dachterrasse"], "en": ["Central location", "Restaurants & cafés", "Rooftop terrace"] }
    }
  ]
};
