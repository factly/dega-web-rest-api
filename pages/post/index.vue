<template>
  <div class="columns home-page">
    <div class="column is-three-fourth">
      <div class="main-content">
        <div v-if="posts" class="container">
          <nuxt-link :to="'/post/'+ posts[0].slug">
            <div class="columns">
                <div class= "column is-6 is-full-mobile">
                    <div class="card">
                        <div class="card-image">
                            <figure class ="image is-5by3">
                                <img src="https://www.publicdomainpictures.net/pictures/200000/nahled/plain-blue-background.jpg" alt="Placeholder image">
                            </figure>
                        </div>
                    </div>
                </div>
                <div class= "column is-6 is-full-mobile" >
                    <div class="content subtitle has-text-centered">
                        <p class="title is-size-5 is-size-4-tablet is-size-3-desktop has-text-link has-text-centered-desktop">{{ posts[0].title }}</p>
                    </div>
                    <div class="subtitle is-6 is-uppercase has-text-centered">
                      BY
                      <span  v-for="(author, index) in posts[0].authors" :key="index" >{{author.display_name}} 
                        <span v-if="index != posts[0].authors.length -1">, </span>
                      </span>
                    </div>
                    <div class="has-text-centered">{{getDate(posts[0].last_updated_date)}}</div><br>
                    <div class="has-text-justified">
                      {{posts[0].excerpt}}
                    </div>
                </div>
            </div>
          </nuxt-link>
          <hr class="spacer is-1-5 is-hidden-mobile">
          <div class="columns">
            <!-- MoreStories Section -->
            <div class="column is-12">
              <section>
                <h3>MORE STORIES</h3>
                <br>
                <div
                  v-for="(p, index) in posts.slice(1)"
                  :key="index"
                  class="container columns">
                  <nuxt-link :to="'/post/'+ p.slug">
                    <MoreStories :story="p" :categories="true"/>
                  </nuxt-link>
                </div>

              </section>
            </div>
          </div>
        </div>
        <div v-else class="subtitle is-6 is-uppercase has-text-centered">
          Dega API is not responding.<br> Please contact the administrator.
        </div>
      </div>
    </div>
    <!-- <PopularArticles></PopularArticles> -->
  </div>
</template>
<style>
.home-page{
  margin: 1%
}
</style>

<script>

import axios from 'axios'
import MoreStories from "~/components/MoreStories";
import PopularArticles from "~/components/PopularArticles"
export default {
  components: {
    MoreStories,
    PopularArticles
  },
  methods: {
    getDate(datetime) {
      let date = new Date(datetime);
      var ms = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return date.getDate() + ' ' + ms[date.getMonth()] + ' ' + date.getFullYear();
    }
  },
  async asyncData() {
    return axios
      .get(`http://127.0.0.1:8000/api/v1/posts/?sortBy=lastUpdatedDate&sortAsc=false`)
      .then(response => {
        const data = {
          posts: response.data
        }
        return data
      })
      .catch(error => console.log(error))
  }
}
</script>
