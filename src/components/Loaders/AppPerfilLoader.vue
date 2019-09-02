<template>
    <ContentLoader
    :height=450
    :width=500
    :speed=2
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    >
    <rect x="10%" y="20" rx="10" ry="10" width="80%" height="240" />
    <rect x="30%" y="270" rx="0" ry="0" width="40%" height="20" />
    <rect x="10%" y="310" rx="0" ry="0" width="80%" height="20" />
    <rect x="10%" y="350" rx="0" ry="0" width="80%" height="20" />
    <rect x="10%" y="390" rx="0" ry="0" width="80%" height="20" />
    </ContentLoader>
</template>

<script>
import { ContentLoader } from 'vue-content-loader';

export default {
  components: {
    ContentLoader
  },
}
</script>
