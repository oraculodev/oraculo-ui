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
        <h5 class="text-muted">Um catálogo de software centralizado.</h5>
        <br />
        <p>
          O Oráculo nasceu com o propósito de dar visibilidade e `ownership` das aplicações e documentações, com uma
          visão unificada por times, alem de servir também como um agregador de aplicações do time de desenvolvimento.
        </p>
        <p>
          Reporte de bugs, melhorias ou feedbacks envie
          <a href="" target="_blank" title="feedback">aqui</a>.
        </p>
      </div>
      <div class="p-3 px-4 sidebar-footer">
        <p class="mb-1 main-title">{{ new Date().getFullYear() }} &copy; Oráculo</p>
        <p class="mb-0">Created by Tiago Sciência</p>
      </div>
    </div>
  </Layout>
</template>
