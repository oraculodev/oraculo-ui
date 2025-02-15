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
        <h5 class="text-muted">
          A Simple Alternative to Backstage.io
          <a href="https://github.com/oraculodev" target="_blank">
            <span class="badge bg-soft-info text-info font-size-11">github</span>
          </a>
        </h5>
        <br />
        <p>
          Maintaining clear visibility over teams, services, and repositories is a significant challenge. Oráculo
          emerges as a simplified and efficient solution to help medium and large enterprises organize their technical
          structure without the complexity and high maintenance cost of Backstage.io, a tool originally developed by
          Spotify.
        </p>
        <h5>What is Oráculo?</h5>
        <p>
          Oráculo is a system catalog designed for managers, technical leaders, and developers. Its main goal is to
          provide a structured and centralized view of the company's teams and services, facilitating the onboarding of
          new members, service governance, and continuous architectural evolution.
        </p>
        <h5>Key Benefits:</h5>
        <ul>
          <li>
            <p>
              <strong>Organization of Teams and Services:</strong> With Oráculo, it is possible to map and visualize
              repositories and responsible teams, ensuring more transparency and control over services in production.
            </p>
          </li>
          <li>
            <p>
              <strong>Strategic Onboarding Vision:</strong> New members can quickly understand the system structure, its
              owners, and interdependencies.
            </p>
          </li>
          <li>
            <p>
              <strong>APP CLIMATE:</strong> One of Oráculo's key differentiators, this feature allows companies to
              assess the criticality and maturity of services, helping identify areas for improvement and ensuring
              systems remain updated and resilient.
            </p>
          </li>
        </ul>
        <h5>Integration with Source Code Management Tools</h5>
        <p>
          Currently, Oráculo connects with GitHub, providing a centralized view of repositories and services. The goal
          is to expand compatibility with new platforms, including GitLab, Bitbucket, and Azure DevOps, ensuring greater
          flexibility for different development environments.
        </p>
        <h5>Why Choose Oráculo?</h5>
        <p>
          Unlike Backstage, which requires a dedicated team for implementation and maintenance, Oráculo offers a lighter
          and more accessible approach, allowing companies to adopt an efficient solution without operational overhead.
          Having a clear understanding of service maturity and ownership is essential to ensure sustainable growth and
          operational stability.
        </p>
        <p>
          Oráculo is an open source project, allowing the community to contribute to its development and adapt it to
          specific business needs. The project follows the <strong>MIT license</strong>, which allows code reuse and
          modification with minimal restrictions, ensuring transparency and freedom of use.
        </p>
        <h5>Credits</h5>
        <p>
          The development of Oráculo was made possible through the collaboration of some developers from Remessa Online,
          who contributed ideas, improvements, and essential feedback for the project's evolution. We thank everyone who
          helped make this tool a reality!
        </p>
        <h5>Contact</h5>
        <p>
          If you have any questions or would like to suggest or report something, please
          <a href="mailto:tisciencia@gmail.com" target="_blank" title="feedback">
            <span class="fw-semibold">contact us</span></a
          >.
        </p>
        <p>
          <a href="https://github.com/oraculodev" target="_blank">
            Visit our <span class="fw-semibold">Github</span> page.
          </a>
        </p>
      </div>
      <div class="p-3 px-4 sidebar-footer">
        <p class="mb-1 main-title">{{ new Date().getFullYear() }} &copy; Oráculo Dev</p>
        <p class="mb-0">Created by Tiago Sciência</p>
      </div>
    </div>
  </Layout>
</template>
