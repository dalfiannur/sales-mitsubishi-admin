<script lang="ts" setup>
import { ref, toRefs, watch } from "vue";
import { UploadFileInfo, useDialog, useLoadingBar } from "naive-ui";
import { Product, ProductDto } from "../../../typings/Product";
import usePutProduct from "../../../composable/usePutProduct";

interface Prop {
  open: boolean;
  item: Product | null;
}

const emit = defineEmits(["close", "created"]);
const props = withDefaults(defineProps<Prop>(), {
  open: false,
});

const { open, item } = toRefs(props);
const loading = useLoadingBar();
const dialog = useDialog();
const defaultData: ProductDto = {
  name: "",
  description: "",
  youtubeUrl: "",
  types: [],
  images: [],
};
const data = ref<ProductDto>(Object.create(defaultData));

const current = ref<number>(1);

const defaultTypes = [
  {
    id: Date.now(),
    name: "",
    price: "",
    transmission: "",
    fuel: "",
  },
];
const types = ref<any[]>([...defaultTypes]);

const transmissions = [
  {
    label: "Automatic",
    value: "Automatic",
  },
  {
    label: "Manual",
    value: "Manual",
  },
];

const fuels = [
  {
    label: "Bensin",
    value: "Bensin",
  },
  {
    label: "Solar",
    value: "Solar",
  },
];

const addType = () => {
  types.value.push({
    id: Date.now(),
    name: "",
    price: "",
    transmission: "",
    fuel: "",
  });
};

const removeType = (index: number) => {
  delete types.value[index];
};

const next = () => {
  if (current.value < 3) {
    current.value = current.value + 1;
  }
};
const prev = () => {
  if (current.value > 1) {
    current.value = current.value - 1;
  }
};

const { mutate, onSuccess, isProcessing, onError } = usePutProduct();

const done = () => {
  loading.start();
  if (item?.value) mutate(item.value.id, data.value);
};

const resetData = () => {
  current.value = 1;
  data.value = Object.create(defaultData);
  types.value = [...defaultTypes];
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

const onImageUpload = (info: {
  file: UploadFileInfo;
  fileList: UploadFileInfo[];
  event?: Event;
}) => {
  const img: string[] = [];
  for (let item of info.fileList) {
    const reader = new FileReader();
    reader.onload = () => {
      img.push(reader.result as string);
    };
    reader.readAsDataURL(item.file!);
  }
  data.value.images = img;
};

const onCancelButtonClick = () => {
  resetData();
  emit("close");
};
watch(
  types,
  (_types) => {
    data.value.types = _types;
  },
  { deep: true }
);
watch(
  item,
  (val) => {
    if (val) {
      data.value.name = val.name;
      data.value.youtubeUrl = val.youtubeUrl;
      data.value.description = val.description;
      types.value = val.types;
    }
  },
  { deep: true }
);
</script>
<template>
  <n-modal v-model:show="open" v-if="item">
    <n-card
      :style="{
        width: '100%',
        'min-width': '400px',
        'max-width': '800px',
      }"
    >
      <n-space vertical>
        <n-steps :current="current" :status="process">
          <n-step title="Informasi Dasar" />
          <n-step title="Informasi Tipe" />
        </n-steps>

        <div class="mt-30">
          <n-form v-show="current === 1">
            <n-form-item label="Nama Produk">
              <n-input v-model:value="data.name" />
            </n-form-item>
            <n-form-item label="Link Youtube">
              <n-input v-model:value="data.youtubeUrl" />
            </n-form-item>
            <n-form-item label="Deskripsi">
              <n-input type="textarea" v-model:value="data.description" />
            </n-form-item>
          </n-form>
        </div>

        <n-table class="w-full" v-show="current === 2">
          <thead>
            <tr>
              <th>Tipe</th>
              <th>Harga</th>
              <th :style="{ width: '110px' }">Transmisi</th>
              <th :style="{ width: '80px' }">Bahan Bakar</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in types" :key="item.id">
              <td>
                <n-input v-model:value="item.name" />
              </td>
              <td>
                <n-input v-model:value="item.price">
                  <template #prefix>Rp</template>
                </n-input>
              </td>
              <td>
                <n-select v-model:value="item.transmission" :options="transmissions" />
              </td>
              <td>
                <n-select v-model:value="item.fuel" :options="fuels" />
              </td>
              <td>
                <n-button
                  type="error"
                  @click="removeType(index)"
                  v-if="index !== types.length - 1"
                  >Hapus</n-button
                >
                <n-button
                  type="primary"
                  @click="addType"
                  v-if="index === types.length - 1"
                  >Tambah</n-button
                >
              </td>
            </tr>
          </tbody>
        </n-table>

        <n-space horizontal justify="end">
          <n-button @click="onCancelButtonClick" v-if="current === 1">Batal</n-button>
          <n-button @click="prev" v-if="current > 1">Kembali</n-button>
          <n-button type="primary" @click="next" v-if="current < 2">Selanjutnya</n-button>
          <n-button
            type="primary"
            @click="done"
            v-if="current === 2"
            :disabled="isProcessing"
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
