<style scoped>
.toGitLink {
    display: inline-flex;
}
</style>
<template>
    <div class="toGitLink">
        <a :href="githubUrl.url" target="_blank">
        {{githubUrl.text}}
        {{file}}
        </a>
    </div>
</template>
<script setup>

import { useData } from 'vitepress'
import { computed } from 'vue'

const props = defineProps({
        file:String,
        type: {
            type:String,
            default:'blob' // or tree
        },
        branch : {
            type:String,
            default:'master'
        }
    })

  const { theme, page } = useData()

  const githubUrl = computed(
        () => {
            const { text = 'open this file at github', pattern } = theme.value.toGitLink || {}
            const { relativePath } = page.value
            let npath ='/'
            let lastindx = relativePath.lastIndexOf('/')
            if( lastindx != -1)
                npath = relativePath.slice(0,lastindx+1);
            let nfile = props.file.replace('./','')

            npath += nfile
            const url = pattern.replace(/:type/g,props.type)
                        .replace(/:branch/g,props.branch)
                        .replace(/:path/g, npath)
            return {url,text}
        }
  )
</script>
