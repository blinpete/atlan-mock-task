<template>
  <div class="metadata">
    <div class="links">
      <a class="company" target="_blank" rel="noopener" href="https://atlan.com">Atlan</a>
      <a
        class="task-statement"
        target="_blank"
        rel="noopener"
        href="https://atlanhq.notion.site/Task-Atlan-Frontend-Engineer-80ca8e35cc694e31bfd6b415d328269c"
        >statement</a
      >
      <a
        class="link-repo"
        target="_blank"
        rel="noopener"
        href="https://github.com/blinpete/atlan-mock-task"
        >source</a
      >
      <a
        class="link-author"
        target="_blank"
        rel="noopener"
        href="https://blinpete-resume.vercel.app/"
        >blinpete</a
      >
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.metadata {
  display: flex;
  gap: 0.25em;
}

.metadata .links {
  display: flex;

  background-color: #ddd;
  font-weight: 500;
}

.metadata a {
  display: inline-block;
  padding: 0.05em 0.5em;

  text-decoration: none;
}

.metadata a:hover {
  opacity: 0.7;
  text-decoration: underline;
}

/* .company {
  background-color: var(--c-accent);
  color: #eee;
} */

/* .link-author {
  background-color: rgb(57, 53, 53);
  color: rgb(224, 217, 217);
} */
</style>
