<template>
  <div class="index-container">
    <service-information />
  </div>
</template>

<script>
  import ServiceInformation from './components/ServiceInformation'
  export default {
    name: 'Index',
    components: { ServiceInformation },
  }
</script>
