<template>
    <ContentLoader
    :height=400
    :width=500
    :speed=2
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    >
    <rect x="5%" y="20" rx="10" ry="10" width="90%" height="180" />
    <rect x="30%" y="220" rx="0" ry="0" width="40%" height="20" />
    <rect x="10%" y="260" rx="0" ry="0" width="80%" height="20" />
    <rect x="10%" y="300" rx="0" ry="0" width="80%" height="20" />
    <rect x="10%" y="340" rx="0" ry="0" width="80%" height="20" />
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
