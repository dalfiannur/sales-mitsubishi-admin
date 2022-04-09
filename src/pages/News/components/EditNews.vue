<script lang="ts" setup>
import { computed, ref, toRefs, watch } from "vue";
import Editor from "@tinymce/tinymce-vue";
import { UploadFileInfo, useDialog, useLoadingBar } from "naive-ui";
import usePutNews from "../../../composable/usePutNews";
import { News, NewsDto } from "../../../typings/News";

interface Prop {
  open: boolean;
  item: News;
}

const emit = defineEmits(["close", "updated"]);
const props = withDefaults(defineProps<Prop>(), {
  open: false,
});

const { open, item } = toRefs(props);
const loading = useLoadingBar();
const dialog = useDialog();
const defaultData: NewsDto = {
  title: "",
  content: "",
  thumbnail: "",
};
const data = ref<NewsDto>(Object.create(defaultData));
const thumbnail = computed(() => ({
  url: item.value.thumbnailUrl,
  status: "finished",
}));

const tinyMceKey = import.meta.env.VITE_TINYMCE_KEY as string;
const editorConfig = {
  skin: "oxide-dark",
  content_css: "dark",
  width: "100%",
  outputFormat: "text",
};

const { mutate, onSuccess, isProcessing, onError } = usePutNews();

const done = () => {
  loading.start();
  mutate(item.value.id, data.value);
};

const resetData = () => {
  data.value = Object.create(defaultData);
};

onSuccess(() => {
  loading.finish();
  emit("updated");
  emit("close");
  resetData();
});

onError(() => {
  loading.error();
  dialog.error({
    title: "Gagal Menyimpan Data",
    content: "Terjadi kesalahan saat menyimpan data.",
  });
});

const onImageUpload = (info: { file: UploadFileInfo }) => {
  const reader = new FileReader();
  reader.onload = () => {
    data.value.thumbnail = reader.result as string;
  };
  if (info.file.file) {
    reader.readAsDataURL(info.file.file);
  }
};

const onCancelButtonClick = () => {
  resetData();
  emit("close");
};

watch(
  item,
  (val) => {
    if (val.title) data.value.title = val.title;
    if (val.content) data.value.content = val.content;
  },
  { deep: true }
);
</script>
<template>
  <n-modal v-model:show="open">
    <n-card
      :style="{
        width: '100%',
        'min-width': '400px',
        'max-width': '800px',
      }"
    >
      <n-space vertical>
        <n-form>
          <n-form-item label="Judul Berita">
            <n-input v-model:value="data.title" />
          </n-form-item>
          <n-form-item label="Isi Berita">
            <Editor :api-key="tinyMceKey" :init="editorConfig" v-model="data.content" />
          </n-form-item>
          <n-form-item label="Thumbnail">
            <n-upload
              :default-upload="false"
              :default-file-list="[thumbnail]"
              list-type="image-card"
              @change="onImageUpload"
              :multiple="false"
              :max="1"
            >
              <n-p>+</n-p>
            </n-upload>
          </n-form-item>
        </n-form>

        <n-space horizontal justify="end">
          <n-button @click="onCancelButtonClick">Batal</n-button>
          <n-button type="primary" @click="done" :disabled="isProcessing"
            >Selesai</n-button
          >
        </n-space>
      </n-space>
    </n-card>
  </n-modal>
</template>
<style scoped>
.mt-30 {
  margin-top: 30px;
}
.w-700 {
  width: 700px;
}
.w-full {
  width: 100%;
}
</style>
