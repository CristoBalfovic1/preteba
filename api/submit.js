import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // Povolíme len metódu POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Povolený je len POST' });
  }

  // Získame dáta z tvojho HTML formulára
  const { Stastie, Trapi_ta_nieco, Vzdialenie, Riesenie } = req.body;

  try {
    // Uložíme ich do tabuľky v Neone
    await sql`
      INSERT INTO odpovede (stastie, trapi_ta, vzdialenie, riesenie)
      VALUES (${Stastie}, ${Trapi_ta_nieco}, ${Vzdialenie}, ${Riesenie});
    `;

    // Pošleme odpoveď používateľovi
    return res.status(200).send(`
      <div style="font-family: sans-serif; text-align: center; padding: 50px;">
        <h1>Ďakujem za tvoju úprimnosť 🤍</h1>
        <p>Ja neplánujem odchádzať nikde, ale budem rešpektovať tvoje odpovede.</p>
        <p>Keby si mala niečo viac na srdci stačí mi napísať / zavolať.</p>
      </div>
    `);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Chyba pri ukladaní do databázy' });
  }
}