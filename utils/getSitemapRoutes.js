const axios = require('axios');

async function getSitemapRoutes() {
  let config = {
    headers: {
      client: process.env.CLIENT_ID,
    }
  }

  const sitemap = await axios
    .get(`${process.env.API_URI}/api/v1/sitemap`, config)
    .then(response => response.data.data)
    .catch(err => console.log(err));

  let  routes = []

  sitemap.categories.forEach( category => {
    routes.push({
      url: 'category/' + category.slug,
    })
  })

  sitemap.users.forEach( user => {
    routes.push({
      url: 'user/' + user.slug,
    })
  })

  sitemap.tags.forEach( tag => {
    routes.push({
      url: 'tag/' + tag.slug,
    })
  })

  sitemap.posts.forEach( post => {
    routes.push({
      url: 'post/' + post.slug,
    })
  })

  sitemap.factchecks.forEach( factcheck => {
    routes.push({
      url: 'factcheck/' + factcheck.slug,
    })
  })
  
  return routes;
}

module.exports = getSitemapRoutes();
