<script setup lang="ts">
import { UploadFileInfo, useDialog } from "naive-ui";
import { computed, reactive, ref, watch } from "vue";
import useDeleteNews from "../../composable/useDeleteNews";
import useGetBanners from "../../composable/useGetBanners";
import usePostBanner from "../../composable/usePostBanner";
import { Banner } from "../../typings/Banner";

interface Modal {
  open: boolean;
  url: string;
}
const modal = reactive<Modal>({
  open: false,
  url: "",
});
const currentPage = ref<number>(1);
const { data: banners, pages, fetcher } = useGetBanners({
  page: currentPage.value,
  perPage: 5,
});
const bannerList = ref<any[]>([]);

const { mutate: deleteNews, onSuccess: onDeleteSuccess } = useDeleteNews();
const { mutate: postBanner } = usePostBanner();

onDeleteSuccess(() => {
  fetcher({
    page: currentPage.value,
    perPage: 5,
  });
});

const onChange = (upload: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
  if (upload.file.file && upload.file.status === "pending") {
    const reader = new FileReader();
    reader.onload = () => {
      postBanner({
        image: reader.result as string,
      });
    };
    reader.readAsDataURL(upload.file.file);
  }

  if (upload.file.status === "removed") {
  }
};

const handlePreview = (e: any) => {
  console.log(e);
  // modal.open = true;
  // modal.url = e.url;
};
</script>

<template>
  <n-card>
    <n-upload
      action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
      :default-file-list="bannerList"
      list-type="image-card"
    >
      Click to Upload
    </n-upload>
  </n-card>
</template>

<style scoped>
.mt-30 {
  margin-top: 30px;
}
.w-100 {
  width: 100px;
}
</style>
