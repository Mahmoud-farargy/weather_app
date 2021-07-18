<template>
  <div v-if="val" id="detailsItem">
      <span class="title">{{title}}</span>
      <span>{{val}}</span>
  </div>
</template>

<script>
export default {
    props: [
        "title",
        "val"
    ]
}
</script>

<style lang="scss" scoped>
    #detailsItem{
        margin: 9px;
        min-height: 60px;
        text-transform: none;
        .title{
           
            font-weight: var(--font-weight-heavy);
        }
        span{
            font-size: var(--font-size-small);
            display: block;
            width:100%;
            &:nth-child(2){
                font-weight: var(--font-weight-medium);
                color: var(--light-gray);
                text-transform: capitalize;
            }
        }
        padding: 8px 16px;
        background-color: var(--transparent-white-lev1);
        border-radius: var(--el-radius);
        transition: var(--transition-mild);
    }
</style>