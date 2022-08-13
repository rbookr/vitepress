<script setup lang="ts">
import { nextTick,onMounted, provide, watch } from 'vue'
import { useData,useRoute } from 'vitepress'
import { useSidebar, useCloseSidebarOnEscape } from './composables/sidebar'
import VPSkipLink from './components/VPSkipLink.vue'
import VPBackdrop from './components/VPBackdrop.vue'
import VPNav from './components/VPNav.vue'
import VPLocalNav from './components/VPLocalNav.vue'
import VPSidebar from './components/VPSidebar.vue'
import VPContent from './components/VPContent.vue'
import VPFooter from './components/VPFooter.vue'
import Viz from  'viz.js'
import { Module, render } from 'viz.js/full.render.js'

import { Transformer } from 'markmap-lib';
import * as markmap from 'markmap-view';
const { Markmap, loadCSS, loadJS } = markmap;

const transformer = new Transformer();

const viz = new Viz({ Module, render });

const getContentDom = query => document.querySelectorAll('.content ' + (query || ''))

const {
  isOpen: isSidebarOpen,
  open: openSidebar,
  close: closeSidebar
} = useSidebar()

const route = useRoute()

function initGraphviz() {
  const dotBlocks = getContentDom('.dot')
    if( dotBlocks && dotBlocks.length ) {
      for(let i =0 ;i < dotBlocks.length ;i++){
        let element = dotBlocks[i]
        viz.renderSVGElement(element.textContent)
          .then( svgEle => element.parentNode?.replaceChild(svgEle,element))
      }
    }
}

function initMarkmap() {
  const markmapBlocks = getContentDom('.markmap')
  if(markmapBlocks && markmapBlocks.length){
    for(let i = 0 ;i < markmapBlocks.length ; i++){
      let element = markmapBlocks[i]
      let { root, features } = transformer.transform(element.textContent);
      let { styles, scripts } = transformer.getUsedAssets(features);
      /*loadCSS(styles)*/
      /*loadJS(scripts)*/

      const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
// set width and height
      svg1.setAttribute("style", "width:100%;height 500px;");
      element.parentNode?.replaceChild(svg1,element);
      Markmap.create(svg1,undefined,root)

    }
  }
}

function initPage() {
  initGraphviz()
  initMarkmap()
}

onMounted(initPage)


watch(() => route.path, 
    ()=>{
      nextTick(initPage)
      closeSidebar()
    }
    )
/*watch(useData().page , initPage)*/

useCloseSidebarOnEscape(isSidebarOpen, closeSidebar)

provide('close-sidebar', closeSidebar)
</script>

<template>
  <div class="Layout">
    <slot name="layout-top" />
    <VPSkipLink />
    <VPBackdrop class="backdrop" :show="isSidebarOpen" @click="closeSidebar" />
    <VPNav>
      <template #nav-bar-title-before><slot name="nav-bar-title-before" /></template>
      <template #nav-bar-title-after><slot name="nav-bar-title-after" /></template>
      <template #nav-bar-content-before><slot name="nav-bar-content-before" /></template>
      <template #nav-bar-content-after><slot name="nav-bar-content-after" /></template>
      <template #nav-screen-content-before><slot name="nav-screen-content-before" /></template>
      <template #nav-screen-content-after><slot name="nav-screen-content-after" /></template>
    </VPNav>
    <VPLocalNav :open="isSidebarOpen" @open-menu="openSidebar" />
    <VPSidebar :open="isSidebarOpen" />

    <VPContent>
      <template #home-hero-before><slot name="home-hero-before" /></template>
      <template #home-hero-after><slot name="home-hero-after" /></template>
      <template #home-features-before><slot name="home-features-before" /></template>
      <template #home-features-after><slot name="home-features-after" /></template>

      <template #doc-before><slot name="doc-before" /></template>
      <template #doc-after><slot name="doc-after" /></template>

      <template #aside-top><slot name="aside-top" /></template>
      <template #aside-bottom><slot name="aside-bottom" /></template>
      <template #aside-outline-before><slot name="aside-outline-before" /></template>
      <template #aside-outline-after><slot name="aside-outline-after" /></template>
      <template #aside-ads-before><slot name="aside-ads-before" /></template>
      <template #aside-ads-after><slot name="aside-ads-after" /></template>
    </VPContent>

    <VPFooter />
    <slot name="layout-bottom" />
  </div>
</template>

<style scoped>
.Layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
