<script>
import Layout from '../../layouts/main'
import algoliasearch from 'algoliasearch/lite'
import 'instantsearch.css/themes/satellite-min.css'

export default {
  components: {
    Layout,
  },
  data() {
    return {
      searchClient: algoliasearch(process.env.VUE_APP_ALGOLIA_APP_ID, process.env.VUE_APP_ALGOLIA_API_KEY),
    }
  },
  methods: {
    capitalizeFirstLetter(str) {
      const capitalized = str.charAt(0).toUpperCase() + str.slice(1)
      return capitalized
    },
    getUrlForObject(type, id) {
      let url

      switch (this.capitalizeFirstLetter(type)) {
        case 'Group':
          url = `/groups/${id}`
          break
        case 'Component':
          url = `/components/${id}`
          break
        case 'System':
          url = `/systems/${id}`
          break
        case 'Workflow':
          url = `/workflows/${id}`
          break
        default:
          url = ``
          break
      }

      return url
    },
    stripText(text) {
      return text.replace(/<\/?[^>]+(>|$)/g, '')
    },
  },
}
</script>

<template>
  <Layout :pagetitle="'Search'">
    <ais-instant-search :search-client="searchClient" index-name="oraculo_all_index">
      <ais-search-box autofocus />
      <ais-hits>
        <template #item="{ item }">
          <div class="mb-1">
            <router-link v-if="item.type != 'Link'" :to="getUrlForObject(item.type, item.id)">
              <ais-highlight attribute="name" :hit="item" class="mr-1"></ais-highlight>
            </router-link>
            <a v-if="item.type == 'Link'" :href="item.description" target="_blank" :alt="item.name">
              <ais-highlight attribute="name" :hit="item" class="mr-1"></ais-highlight>
            </a>
            <span class="badge badge-soft-success">{{ item.type }}</span>
          </div>
          <div class="mb-2">
            <ais-highlight attribute="description" :hit="item" style="text-overflow: ellipsis"></ais-highlight>
            <!-- <spam style="text-overflow: ellipsis">{{ stripText(item.description) }}</spam> -->
          </div>
          <div class="mb-1">
            <span v-if="item.tags && item.tags.length > 0" class="text-muted search-tags-title mr-1">Tags:</span>
            <span v-for="tag in item.tags" :key="tag" class="badge badge-soft-primary mr-1">
              {{ tag }}
            </span>
          </div>
          <div class="mb-1">
            <span
              v-if="(item.relatedsN1 && item.relatedsN1.length > 0) || (item.relatedsN2 && item.relatedsN2.length > 0)"
              class="text-muted search-tags-title mr-1"
              >Relacionados:</span
            >
            <router-link
              v-for="relatedN1 in item.relatedsN1"
              :key="relatedN1"
              :to="getUrlForObject(item.relatedsN1Type, relatedN1.id)"
              class="badge badge-soft-secondary mr-1"
              >{{ relatedN1.name }}</router-link
            >
            <router-link
              v-for="relatedN2 in item.relatedsN2"
              :key="relatedN2"
              :to="getUrlForObject(item.relatedsN2Type, relatedN2.id)"
              class="badge badge-soft-secondary mr-1"
              >{{ relatedN2.name }}</router-link
            >
          </div>
          <div>
            <span v-if="item.links && item.links.length > 0" class="text-muted search-tags-title mr-1">Links:</span>
            <a v-for="link in item.links" :key="link" class="search-tags-title mr-1" :href="link.url" target="_blank">
              {{ link.text }}
            </a>
          </div>
        </template>
      </ais-hits>
    </ais-instant-search>
  </Layout>
</template>
