<script setup lang="ts">
import { useData ,useRoute} from 'vitepress'
import { computed } from 'vue'
import { useSidebar } from '../composables/sidebar'
import VPImage from './VPImage.vue'

const { site, theme } = useData()
const { hasSidebar } = useSidebar()

const route = useRoute()

const logo = computed( () => {

    let newPath = route.path
    if( newPath === site.value.base) //
        return theme.value.logo || ''
    if( theme.value.siteConfgByRoute ) {
      for( let _config of theme.value.siteConfgByRoute ) {
        if( newPath.startsWith(_config.start) ){
          return _config.logo
        }
      }
    }
    return theme.value.logo
  })

const title = computed(()=>{

    let newPath = route.path
    if( newPath === site.value.base) //
        return theme.value.siteTitle || ''
    if( theme.value.siteConfgByRoute ) {
      for( let _config of theme.value.siteConfgByRoute ) {
        if( newPath.startsWith(_config.start) ){
          return _config.title
        }
      }
    }
    return theme.value.siteTitle
    })

</script>

<template>
  <div class="VPNavBarTitle" :class="{ 'has-sidebar': hasSidebar }">
    <a class="title" :href="site.base">
      <slot name="nav-bar-title-before" />
      <VPImage class="logo" :image="logo" />
      {{ title }}
      <slot name="nav-bar-title-after" />
    </a>
  </div>
</template>

<style scoped>
.VPNavBarTitle {
  flex-shrink: 0;
  border-bottom: 1px solid transparent;
}

@media (min-width: 960px) {
  .VPNavBarTitle.has-sidebar {
    margin-right: 32px;
    width: calc(var(--vp-sidebar-width) - 64px);
    border-bottom-color: var(--vp-c-divider-light);
    background-color: var(--vp-c-bg-alt);
  }
}

.title {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--vp-nav-height);
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  transition: opacity 0.25s;
}

.title:hover {
  opacity: 0.6;
}

@media (min-width: 960px) {
  .title {
    flex-shrink: 0;
  }
}

:deep(.logo) {
  margin-right: 8px;
  height: 24px;
}
</style>
