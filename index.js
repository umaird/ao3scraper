module.exports = async function getTitle(pageURL, verbose = false) {
    const axios = require("axios");
    const cheerio = require("cheerio");
    let ficInfo = {
        title: undefined,
        authors: undefined,
        summary: undefined,
        tags: undefined,
        chapters: undefined,
        published: undefined,
        updated: undefined,
        wordCount: undefined,
        commentCount: undefined,
        kudosCount: undefined,
        bookmarkCount: undefined,
        hitCount: undefined,
        rating: undefined,
        pairings: undefined,
        category: undefined,
        language: undefined,
        warnings: undefined,
        authorPages: undefined,
        fandoms: undefined,
        collections: undefined,
        sfw: true,
    }

    if (verbose === true){console.log(`Loading webpage [${pageURL}]`)}
    if (pageURL.toLowerCase().includes(`https://archiveofourown.org/works/`) || (pageURL.toLowerCase().includes(`archiveofourown.org/collections/`) && pageURL.toLowerCase().includes(`/works/`))){

    } else {
        throw `Not a valid AO3 Link!`;
    }

    await axios.get(pageURL).then(res =>{

        let $ = cheerio.load(res.data);


        let holdTemp = [];

        $('div[id="main"]')
            .find('p[class="caution"]').each(
            function( i ) {
                holdTemp.push($( this ).toArray().map(el => $(el).text()));
            }

        )

        if (holdTemp[0]){
            if (holdTemp.toString().includes('adult')){
                ficInfo.sfw	= false;
                if (verbose === true){ console.log(`Fic is NSFW - limited data available`) }
            }
        }
        if (verbose === true){ console.log(holdTemp) }
        holdTemp = [];


        $('div[class="preface group"]')
            .find('h3[class="byline heading"] > a[rel="author"]').each(
            function( i ) {
                holdTemp.push($( this ).toArray().map(el => $(el).text())[0]);


            }

        )

        if (verbose === true){ console.log(holdTemp) }
        ficInfo.authors = holdTemp;
        holdTemp = [];

        $('div[class="preface group"]')
            .find('h2[class="title heading"]').each(
            function( i ) {
                holdTemp.push($( this ).toArray().map(el => $(el).text())[0]);


            }

        )

        holdTemp = holdTemp.map(element => {
            return element.trim();
        });

        if (verbose === true){ console.log(holdTemp) }
        ficInfo.title = holdTemp[0];
        holdTemp = [];

        $('dd[class="category tags"]')
            .find('ul[class="commas"] > li > a[class="tag"]').each(
            function( i ) {
                holdTemp.push($( this ).toArray().map(el => $(el).text())[0]);



            }

        )

        holdTemp = holdTemp.map(element => {
            return element.trim();
        });

        if (verbose === true){ console.log(holdTemp) }
        ficInfo.category = holdTemp;
        holdTemp = [];

        $('dd[class="freeform tags"]')
            .find('ul[class="commas"] > li > a[class="tag"]').each(
            function( i ) {
                holdTemp.push($( this ).toArray().map(el => $(el).text())[0]);



            }

        )

        holdTemp = holdTemp.map(element => {
            return element.trim();
        });

        if (verbose === true){ console.log(holdTemp) }
        ficInfo.tags = holdTemp;
        holdTemp = [];

        $('div[class="summary module"]')
            .find('blockquote[class="userstuff"] > p').each(
            function( i ) {
                holdTemp.push($( this ).toArray().map(el => $(el).text())[0]);



            }

        )

        holdTemp = holdTemp.map(element => {
            return element.trim();
        });

        if (verbose === true){ console.log(holdTemp) }
        ficInfo.summary = holdTemp[0];
        holdTemp = [];

        $('dd[class="rating tags"]')
            .find('ul[class="commas"] > li > a[class="tag"]').each(
            function( i ) {
                holdTemp.push($( this ).toArray().map(el => $(el).text())[0]);



            }

        )

        holdTemp = holdTemp.map(element => {
            return element.trim();
        });

        if (verbose === true){ console.log(holdTemp) }
        ficInfo.rating = holdTemp[0];
        holdTemp = [];

        $('div[class="preface group"]')
            .find('h3[class="byline heading"] > a[rel="author"]').each(
            function( i ) {
                holdTemp.push($(this).attr('href'));


            }

        )

        holdTemp = holdTemp.map(element => {
            return element.trim();
        });

        if (verbose === true){ console.log(holdTemp) }
        ficInfo.authorPages = holdTemp;
        holdTemp = [];

        $('dl[class="stats"]')
            .find('dd[class="chapters"]').each(
            function( i ) {
                holdTemp.push($( this ).toArray().map(el => $(el).text())[0]);

            }

        )

        holdTemp = holdTemp.map(element => {
            return element.trim();
        });

        if (verbose === true){ console.log(holdTemp) }
        ficInfo.chapters = holdTemp[0];
        holdTemp = [];

        $('dl[class="stats"]')
            .find('dd[class="published"]').each(
            function( i ) {
                holdTemp.push($( this ).toArray().map(el => $(el).text())[0]);

            }

        )

        holdTemp = holdTemp.map(element => {
            return element.trim();
        });

        if (verbose === true){ console.log(holdTemp) }
        ficInfo.published = holdTemp[0];
        holdTemp = [];

        $('dl[class="stats"]')
            .find('dd[class="words"]').each(
            function( i ) {
                holdTemp.push($( this ).toArray().map(el => $(el).text())[0]);

            }

        )

        holdTemp = holdTemp.map(element => {
            return element.trim();
        });

        if (verbose === true){ console.log(holdTemp) }
        ficInfo.wordCount = parseInt(holdTemp[0]);
        holdTemp = [];

        $('dl[class="stats"]')
            .find('dd[class="comments"]').each(
            function( i ) {
                holdTemp.push($( this ).toArray().map(el => $(el).text())[0]);

            }

        )

        holdTemp = holdTemp.map(element => {
            return element.trim();
        });

        if (verbose === true){ console.log(holdTemp) }
        ficInfo.commentCount = parseInt(holdTemp[0]);
        holdTemp = [];

        $('dl[class="stats"]')
            .find('dd[class="kudos"]').each(
            function( i ) {
                holdTemp.push($( this ).toArray().map(el => $(el).text())[0]);

            }

        )

        holdTemp = holdTemp.map(element => {
            return element.trim();
        });

        if (verbose === true){ console.log(holdTemp) }
        ficInfo.kudosCount = parseInt(holdTemp[0]);
        holdTemp = [];

        $('dl[class="stats"]')
            .find('dd[class="bookmarks"]').each(
            function( i ) {
                holdTemp.push($( this ).toArray().map(el => $(el).text())[0]);

            }

        )

        holdTemp = holdTemp.map(element => {
            return element.trim();
        });

        if (verbose === true){ console.log(holdTemp) }
        ficInfo.bookmarkCount = parseInt(holdTemp[0]);
        holdTemp = [];

        $('dl[class="stats"]')
            .find('dd[class="status"]').each(
            function( i ) {
                holdTemp.push($( this ).toArray().map(el => $(el).text())[0]);

            }

        )

        holdTemp = holdTemp.map(element => {
            return element.trim();
        });

        if (verbose === true){ console.log(holdTemp) }
        ficInfo.updated = holdTemp[0];
        holdTemp = [];

        $('dl[class="stats"]')
            .find('dd[class="hits"]').each(
            function( i ) {
                holdTemp.push($( this ).toArray().map(el => $(el).text())[0]);

            }

        )

        holdTemp = holdTemp.map(element => {
            return element.trim();
        });

        if (verbose === true){ console.log(holdTemp) }
        ficInfo.hitCount = parseInt(holdTemp[0]);
        holdTemp = [];

        $('dl[class="work meta group"]')
            .find('dd[class="language"]').each(
            function( i ) {
                holdTemp.push($( this ).toArray().map(el => $(el).text())[0]);

            }

        )

        holdTemp = holdTemp.map(element => {
            return element.trim();
        });

        if (verbose === true){ console.log(holdTemp) }
        ficInfo.language = holdTemp[0];
        holdTemp = [];

        $('dd[class="relationship tags"]')
            .find('ul > li > a').each(
            function( i ) {
                holdTemp.push($( this ).toArray().map(el => $(el).text())[0]);

            }

        )

        holdTemp = holdTemp.map(element => {
            return element.trim();
        });

        if (verbose === true){ console.log(holdTemp) }
        ficInfo.pairings = holdTemp;
        holdTemp = [];

        $('dd[class="warning tags"]')
            .find('ul > li > a').each(
            function( i ) {
                holdTemp.push($( this ).toArray().map(el => $(el).text())[0]);

            }

        )

        holdTemp = holdTemp.map(element => {
            return element.trim();
        });

        ficInfo.warnings = holdTemp;
        if (verbose === true){ console.log(holdTemp) }
        holdTemp = [];

        $('dd[class="fandom tags"]')
            .find('ul > li > a').each(
            function( i ) {
                holdTemp.push($( this ).toArray().map(el => $(el).text())[0]);

            }

        )

        holdTemp = holdTemp.map(element => {
            return element.trim();
        });

        ficInfo.fandoms = holdTemp;
        if (verbose === true){ console.log(holdTemp) }
        holdTemp = [];

        $('dd[class="collections"]')
            .find('a').each(
            function( i ) {
                holdTemp.push($( this ).toArray().map(el => $(el).text())[0]);

            }

        )
        holdTemp = holdTemp.map(element => {
            return element.trim();
        });

        ficInfo.collections = holdTemp;

        if (verbose === true){ console.log(holdTemp) }
        holdTemp = [];

        if (ficInfo.sfw === false)
        {

            $('h4[class="heading"]')
                .find('a:not(a[rel="author"])').each(
                function( i ) {
                    holdTemp.push($( this ).toArray().map(el => $(el).text())[0]);

                }

            )

            holdTemp = holdTemp.map(element => {
                return element.trim();
            });

            ficInfo.title = holdTemp[0];
            if (verbose === true){ console.log(holdTemp) }
            holdTemp = [];

            $('h4[class="heading"]')
                .find('a[rel="author"]').each(
                function( i ) {
                    holdTemp.push($( this ).toArray().map(el => $(el).text())[0]);

                }

            )

            holdTemp = holdTemp.map(element => {
                return element.trim();
            });

            ficInfo.author = holdTemp;
            if (verbose === true){ console.log(holdTemp) }
            holdTemp = [];

            $('h5[class="fandoms heading"]')
                .find('a[class="tag"]').each(
                function( i ) {
                    holdTemp.push($( this ).toArray().map(el => $(el).text())[0]);

                }

            )

            holdTemp = holdTemp.map(element => {
                return element.trim();
            });

            ficInfo.fandoms = holdTemp;
            if (verbose === true){ console.log(holdTemp) }
            holdTemp = [];


            $('h4[class="heading"]')
                .find('a[rel="author"]').each(
                function( i ) {
                    holdTemp.push($(this).attr('href'));
                }

            )

            holdTemp = holdTemp.map(element => {
                return element.trim();
            });

            ficInfo.authorPages = holdTemp;
            if (verbose === true){ console.log(holdTemp) }
            holdTemp = [];

            ficInfo.summary = "[Summaries for explicit works are hidden.]"


        }



    }).catch(error => {
        if (verbose === false){ throw `An error occured while trying to access that page`; } else { throw err; }
    })

    if (verbose === true){ console.log(ficInfo) }
    return ficInfo;
};

