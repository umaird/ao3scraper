# ao3scraper

[![GitHub license](https://img.shields.io/github/license/displayportdog/ao3scraper?style=for-the-badge)](https://github.com/displayportdog/ao3scraper/blob/main/LICENSE) [![GitHub issues](https://img.shields.io/github/issues/displayportdog/ao3scraper?style=for-the-badge)](https://github.com/displayportdog/ao3scraper/issues)

Simple node.js package for grabbing data from The Archive Of Our Own (AO3) 

---

## Installation
```
npm i ao3scraper
```

## Usage

Standard usage is as a promise, as seen below.

```js
const ao3scraper = require('ao3scraper')
//replace with your fic, this is just for demo
const pageURL = "https://archiveofourown.org/works/35864404"

ao3scraper(pageURL).then(ficInfo => {
    //do something with results
}).catch(err => {
    // This code block will also execute if the link is a 404
    console.error(err)
});
```

This will return an object like below

```js
{
  title: 'Cookies and Deceit', //work title as string
  authors: [ 'dpdog' ], //authors as array of strings (even if only one)
  summary: 'They’d messed up, but they’d make it right.', //summary as string
  tags: [
    'Fluff',
    'Identity Reveal',
    'Mentioned Lila Rossi',
    'Not Beta Read'
  ], //freeform tags as array of strings
  chapters: '1/1', //chapters as string
  published: '2021-12-22', //publish date as string
  updated: undefined, //update date as string 
  wordCount: 2086, //word count as integer
  commentCount: 2, //comment count as integer
  kudosCount: 80, //kudos count as integer
  bookmarkCount: 9, //bookmark count as integer
  hitCount: 904, //hit count as integer
  rating: 'General Audiences', //rating as string
  pairings: [
    'Alya Césaire & Marinette Dupain-Cheng | Ladybug',
    'Adrien Agreste | Chat Noir/Marinette Dupain-Cheng | Ladybug'
  ], //relationships as array of strings
  category: [ 'F/M', 'Gen' ], //categories as array of strings
  language: 'English', //language as string
  warnings: [ 'No Archive Warnings Apply' ], //warnings as array of strings
  authorPages: [ '/users/dpdog/pseuds/dpdog' ], //links to authors userpages as array of strings
  fandoms: [ 'Miraculous Ladybug' ], //fandoms as array of strings
  collections: [ 'Challenge of the Day' ], //collections as array of strings
  sfw: true //if the fic is safe for work as bool
}
```

Note that for E fics, a lot of this data will __not__ be returned.





