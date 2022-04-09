<script lang="ts" setup>
import { ref, toRefs } from "vue";

interface Prop {
  open: boolean;
  item: any;
}

const props = defineProps<Prop>();
const { open, item } = toRefs(props);
const segment = ref<any>({
  content: "soft",
});
</script>

<template>
  <n-modal
    :style="{ width: '600px' }"
    v-model:show="open"
    preset="card"
    title="Detail Testimoni"
    :segmented="segment"
    size="medium"
  >
    <n-space vertical size="large">
      <n-space size="small" vertical>
        <p
          :style="{
            fontSize: '12px',
            padding: 0,
            margin: 0,
          }"
        >
          Nama Pembeli
        </p>
        <n-p>{{ item.name }}</n-p>
      </n-space>
      <n-space size="small" vertical>
        <p
          :style="{
            fontSize: '12px',
            padding: 0,
            margin: 0,
          }"
        >
          Pekerjaan Pembeli
        </p>
        <n-p>{{ item.position }}</n-p>
      </n-space>
      <n-space size="small" vertical>
        <p
          :style="{
            fontSize: '12px',
            padding: 0,
            margin: 0,
          }"
        >
          Kesan Pembeli
        </p>
        <n-p>{{ item.content }}</n-p>
      </n-space>

      <n-space>
        <n-image width="150" :src="item.avatarUrl" />
        <n-image width="150" :src="item.imageUrl" />
      </n-space>
    </n-space>
  </n-modal>
</template>
