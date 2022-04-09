<script lang="ts" setup>
import { ref, toRefs } from "vue";
import { UploadFileInfo, useDialog, useLoadingBar } from "naive-ui";
import { TestimonialDto } from "../../../typings/Testimonial";
import usePostTestimonial from "../../../composable/usePostTestimonial";

interface Prop {
  open: boolean;
}

const emit = defineEmits(["close", "created"]);
const props = withDefaults(defineProps<Prop>(), {
  open: false,
});

const { open } = toRefs(props);
const loading = useLoadingBar();
const dialog = useDialog();

const defaultData: TestimonialDto = {
  name: "",
  position: "",
  content: "",
  image: "",
  avatar: "",
};
const data = ref<TestimonialDto>(Object.create(defaultData));

const { mutate, onSuccess, isProcessing, onError } = usePostTestimonial();

const done = () => {
  loading.start();
  mutate(data.value);
};

const resetData = () => {
  data.value = Object.create(defaultData);
};

onSuccess(() => {
  loading.finish();
  emit("created");
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

const onImageUpload = (
  key: "avatar" | "image",
  upload: {
    file: UploadFileInfo;
    fileList: UploadFileInfo[];
    event?: Event;
  }
) => {
  const reader = new FileReader();
  reader.onload = () => {
    data.value[key] = reader.result as string;
  };
  if (upload.file.file) {
    reader.readAsDataURL(upload.file.file);
  }
};

const onCancelButtonClick = () => {
  resetData();
  emit("close");
};
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
          <n-form-item label="Nama Pembeli">
            <n-input v-model:value="data.name" />
          </n-form-item>
          <n-form-item label="Pekerjaan Pembeli">
            <n-input v-model:value="data.position" />
          </n-form-item>
          <n-form-item label="Kesan Pembeli">
            <n-input v-model:value="data.content" type="textarea" />
          </n-form-item>
          <n-form-item label="Foto Pembeli">
            <n-upload
              :default-upload="false"
              list-type="image-card"
              @change="(e: any) => onImageUpload('avatar', e)"
              :multiple="false"
              :max="1"
            >
              <n-p>+</n-p>
            </n-upload>
          </n-form-item>
          <n-form-item label="Foto Saat Membeli">
            <n-upload
              :default-upload="false"
              list-type="image-card"
              @change="(e: any) => onImageUpload('image', e)"
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
