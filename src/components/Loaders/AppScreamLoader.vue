<template>
    <ContentLoader
    :height=180
    :width=500
    :speed=2
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    >
    <rect x="20" y="20" rx="10" ry="10" width="140" height="140" />
    <rect x="180" y="20" rx="0" ry="0" width="40%" height="20" />
    <rect x="180" y="60" rx="0" ry="0" width="20%" height="10" />
    <rect x="180" y="90" rx="0" ry="0" width="55%" height="10" />
    <rect x="180" y="110" rx="0" ry="0" width="55%" height="10" />
    <rect x="180" y="130" rx="0" ry="0" width="55%" height="10" />
    </ContentLoader>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  components: {
    ContentLoader
  },
}
</script>