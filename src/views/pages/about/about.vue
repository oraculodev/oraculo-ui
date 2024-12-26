<script>
import Layout from '../../layouts/main'

export default {
  components: {
    Layout,
  },
  data: () => ({}),
}
</script>

<template>
  <Layout :pagetitle="'About'">
    <div class="card overflow-hidden">
      <div class="card-body">
        <h2>Oráculo</h2>
        <h5 class="text-muted">A system catalog for managers and developers</h5>
        <br />
        <p>Oráculo is a simple alternative to Backstage, an open-source project created by Tiago Sciência.</p>
        <p class="fw-semibold">O que resolve?</p>
        <ul>
          <li>item 1</li>
          <li>item 1</li>
        </ul>
        <p>
          Suggestions, bugs and questions can be sent
          <a href="mailto:tisciencia@gmail.com" target="_blank" title="feedback">
            <span class="fw-semibold">here</span></a>.
        </p>
      </div>
      <div class="p-3 px-4 sidebar-footer">
        <p class="mb-1 main-title">{{ new Date().getFullYear() }} &copy; Oráculo Dev</p>
        <p class="mb-0">Created by Tiago Sciência</p>
      </div>
    </div>
  </Layout>
</template>
