<script setup lang="ts">
import { useDialog } from "naive-ui";
import { reactive, ref } from "vue";
import CreateTestimonial from "./components/CreateTestimonial.vue";
import ViewTestimonial from "./components/ViewTestimonial.vue";
import EditTestimonial from "./components/EditTestimonial.vue";
import useGetTestimonials from "../../composable/useGetTestimonials";
import useDeleteTestimonial from "../../composable/useDeleteTestimonial";

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
const { data: testimonials, pages, fetcher } = useGetTestimonials({
  page: currentPage.value,
  perPage: 5,
});
const { mutate: deleteTestimonial, onSuccess: onDeleteSuccess } = useDeleteTestimonial();
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
      deleteTestimonial(id);
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
    <n-button type="primary" @click="modal.create.open = true">Tambah Testimoni</n-button>
    <n-table class="mt-30">
      <thead>
        <tr>
          <th>Nama Pembeli</th>
          <th>Pekerjaan Pembeli</th>
          <th>Dibuat Pada</th>
          <th>#Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item of testimonials">
          <td>{{ item.name }}</td>
          <td>{{ item.position }}</td>
          <td>{{ item.created_at }}</td>
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

  <CreateTestimonial
    :open="modal.create.open"
    @close="modal.create.open = false"
    @created="fetcher"
  />
  <ViewTestimonial
    :open="modal.view.open"
    :item="modal.view.item"
    @close="modal.view.open = false"
  />
  <EditTestimonial
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
