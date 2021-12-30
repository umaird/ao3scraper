module.exports = async function getTitle(pageURL, verbose = false) {
    const axios = require("axios");
    const cheerio = require("cheerio");
    let ficInfo = {
        sfw: true
    }

    if (verbose === true){console.log(`Loading webpage [${pageURL}]`)}
    if (pageURL.toLowerCase().includes(`https://archiveofourown.org/works/`) || (pageURL.toLowerCase().includes(`archiveofourown.org/collections/`) && pageURL.toLowerCase().includes(`/works/`))){

    } else {
        throw `Not a valid AO3 Link!`;
    }

    await axios.get(pageURL).then(res =>{

        let $ = cheerio.load(res.data);


        let holdTemp = [];

        if (getElementsBy($, 'div[id="main"]', 'p[class="caution"]', verbose).toString().includes('adult')){
            ficInfo.sfw	= false;
            if (verbose === true){ console.log(`Fic is NSFW - limited data available`) }
        }

        ficInfo.authors = getElementsBy($, 'div[class="preface group"]', 'h3[class="byline heading"] > a[rel="author"]', verbose);
        ficInfo.title = getElementsBy($, 'div[class="preface group"]', 'h2[class="title heading"]', verbose);
        ficInfo.category = getElementsBy($, 'dd[class="category tags"]', 'ul[class="commas"] > li > a[class="tag"]', verbose);
        ficInfo.tags = getElementsBy($, 'dd[class="freeform tags"]', 'ul[class="commas"] > li > a[class="tag"]', verbose);
        ficInfo.summary = getElementsBy($, 'div[class="summary module"]', 'blockquote[class="userstuff"] > p', verbose)[0];
        ficInfo.rating = getElementsBy($, 'dd[class="rating tags"]', 'ul[class="commas"] > li > a[class="tag"]', verbose)[0];

        //AUTHORPAGES
        holdTemp = [];

        $('div[class="preface group"]')
            .find('h3[class="byline heading"] > a[rel="author"]').each(
            function(  ) {
                holdTemp.push($(this).attr('href'));


            }

        )

        holdTemp = holdTemp.map(element => {
            return element.trim();
        });

        if (verbose === true){ console.log(holdTemp) }
        ficInfo.authorPages = holdTemp;
        holdTemp = [];

        //DONT MESS WITH THIS [YET ;)]

        ficInfo.chapters = getElementsBy($, 'dl[class="stats"]', 'dd[class="chapters"]', verbose)[0];
        ficInfo.published = getElementsBy($, 'dl[class="stats"]', 'dd[class="published"]', verbose)[0];
        ficInfo.wordCount = parseInt(getElementsBy($, 'dl[class="stats"]', 'dd[class="words"]', verbose)[0]);
        ficInfo.commentCount = parseInt(getElementsBy($, 'dl[class="stats"]', 'dd[class="comments"]', verbose)[0]);
        ficInfo.kudosCount = parseInt(getElementsBy($, 'dl[class="stats"]', 'dd[class="kudos"]', verbose)[0]);
        ficInfo.bookmarkCount = parseInt(getElementsBy($, 'dl[class="stats"]', 'dd[class="bookmarks"]', verbose)[0]);
        ficInfo.updated = getElementsBy($, 'dl[class="stats"]', 'dd[class="status"]', verbose)[0];
        ficInfo.hitCount = parseInt(getElementsBy($, 'dl[class="stats"]', 'dd[class="hits"]', verbose)[0]);
        ficInfo.language = getElementsBy($, 'dl[class="work meta group"]', 'dd[class="language"]', verbose)[0];
        ficInfo.pairings = getElementsBy($, 'dd[class="relationship tags"]', 'ul > li > a', verbose);
        ficInfo.warnings = getElementsBy($, 'dd[class="warning tags"]', 'ul > li > a', verbose);
        ficInfo.fandoms = getElementsBy($, 'dd[class="fandom tags"]', 'ul > li > a', verbose);
        ficInfo.collections = getElementsBy($, 'dd[class="collections"]', 'a', verbose);

        if (ficInfo.sfw === false)
        {

            ficInfo.title = getElementsBy($, 'h4[class="heading"]', 'a:not(a[rel="author"])', verbose)[0];
            ficInfo.author = getElementsBy($, 'h4[class="heading"]', 'a[rel="author"]', verbose);
            ficInfo.fandoms = getElementsBy($, 'h5[class="fandoms heading"]', 'a[class="tag"]', verbose);

            //AUTHORPAGES

            $('h4[class="heading"]')
                .find('a[rel="author"]').each(
                function(  ) {
                    holdTemp.push($(this).attr('href'));
                }

            )

            holdTemp = holdTemp.map(element => {
                return element.trim();
            });

            ficInfo.authorPages = holdTemp;
            if (verbose === true){ console.log(holdTemp) }
            holdTemp = [];

            //DO NOT MESS WITH THIS

            ficInfo.summary = "[Summaries for explicit works are hidden.]"


        }



    }).catch(err => {
        if (verbose === false){ throw `An error occured while trying to access that page`; } else { throw err; }
    })

    if (verbose === true){ console.log(ficInfo) }
    return ficInfo;
};

function getElementsBy($, parent, element, verbose){
    let holdTemp = [];

    $(parent)
        .find(element).each(
        function(  ) {
            holdTemp.push($( this ).toArray().map(el => $(el).text())[0]);

        }

    )

    holdTemp = holdTemp.map(element => {
        return element.trim();
    });

    if (verbose === true){ console.log(holdTemp) }
    return holdTemp;
}
