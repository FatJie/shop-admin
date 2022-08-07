<template>
  <h1>helloword</h1>
  <abc />
  <Foo msg="hello foo" />
</template>

<script lang="tsx" setup>
import Foo from './foo'
const abc = <h1>abc</h1>
</script>
