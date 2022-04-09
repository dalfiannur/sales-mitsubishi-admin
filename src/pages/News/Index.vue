<script setup lang="ts">
import { useDialog } from "naive-ui";
import { reactive, ref } from "vue";
import useDeleteNews from "../../composable/useDeleteNews";
import useGetNews from "../../composable/useGetNews";
import CreateNews from "./components/CreateNews.vue";
import ViewNews from "./components/ViewNews.vue";
import EditNews from "./components/EditNews.vue";

interface Modal {
  create: {
    open: boolean;
  };
  view: {
    open: boolean;
    item: any;
  };
  edit: {
    open: boolean;
    item: any;
  };
}
const modal = reactive<Modal>({
  create: {
    open: false,
  },
  view: {
    open: false,
    item: {},
  },
  edit: {
    open: false,
    item: {},
  },
});
const currentPage = ref<number>(1);
const { data: news, pages, fetcher } = useGetNews({
  page: currentPage.value,
  perPage: 5,
});
const { mutate: deleteNews, onSuccess: onDeleteSuccess } = useDeleteNews();
const dialog = useDialog();

const onViewButtonClick = (item: any) => {
  modal.view.open = true;
  modal.view.item = item;
};

const onButtonDeleteClick = (id: number) => {
  dialog.warning({
    title: "Hapus Produk",
    content: "Apakah anda yakin ingin menghapus produk ini?",
    positiveText: "Yakin",
    negativeText: "Tidak",
    onPositiveClick: () => {
      deleteNews(id);
    },
  });
};

const onEditButtonClick = (item: any) => {
  modal.edit.open = true;
  modal.edit.item = item;
};

onDeleteSuccess(() => {
  fetcher({
    page: currentPage.value,
    perPage: 5,
  });
});
</script>

<template>
  <n-card>
    <n-button type="primary" @click="modal.create.open = true">Tambah Berita</n-button>
    <n-table class="mt-30">
      <thead>
        <tr>
          <th :style="{ width: '120px' }">Thumbnail</th>
          <th>Judul</th>
          <th>#Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in news">
          <td>
            <n-image width="100" :src="item.thumbnailUrl" />
          </td>
          <td>{{ item.title }}</td>
          <td class="w-100">
            <n-button-group>
              <n-button type="primary" @click="onViewButtonClick(item)">Lihat</n-button>
              <n-button type="info" @click="onEditButtonClick(item)">Edit</n-button>
              <n-button type="error" @click="onButtonDeleteClick(item.id)"
                >Hapus</n-button
              >
            </n-button-group>
          </td>
        </tr>
      </tbody>
    </n-table>
    <n-space
      justify="end"
      :style="{
        marginTop: '20px',
      }"
    >
      <n-pagination v-model:page="currentPage" :page-count="pages" :page-slot="8" />
    </n-space>
  </n-card>

  <CreateNews
    :open="modal.create.open"
    @close="modal.create.open = false"
    @created="fetcher"
  />
  <ViewNews
    :open="modal.view.open"
    :item="modal.view.item"
    @close="modal.view.open = false"
  />
  <EditNews
    :open="modal.edit.open"
    :item="modal.edit.item"
    @close="modal.edit.open = false"
    @updated="fetcher"
  />
</template>

<style scoped>
.mt-30 {
  margin-top: 30px;
}
.w-100 {
  width: 100px;
}
</style>
