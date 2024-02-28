// @ts-check
const { test, expect } = require('@playwright/test');

test('anapioficeandfire api', async ({ request }) => {
  const getCharacter = await request.get('https://anapioficeandfire.com/api/characters/581');
  expect(getCharacter.ok()).toBeTruthy();
  expect(getCharacter.status()).toBe(200)
  expect(await getCharacter.json()).toEqual(expect.objectContaining({
    url: "https://anapioficeandfire.com/api/characters/581",
    name: "Jon Penrose",
    gender: "Male",
    culture: "",
    born: "",
    died: "",
    titles: [ "Ser" ],
    aliases: [ "" ],
    father: "",
    mother: "",
    spouse: "",
    allegiances: [ "https://anapioficeandfire.com/api/houses/300" ],
    books: [ "https://anapioficeandfire.com/api/books/4" ],
    povBooks: [],
    tvSeries: [ "" ],
    playedBy: [ "" ]
    }));
});
