<script lang="ts" setup>
import { UploadFileInfo } from 'naive-ui';
import { ref, toRefs, reactive, computed } from 'vue';
import useDeleteProductImage from '../../../composable/useDeleteProductImage';
import usePostProductImage from '../../../composable/usePostProductImage';

interface Prop {
    open: boolean;
    item: any;
}

const props = defineProps<Prop>()

const { open, item } = toRefs(props)
const imageModal = reactive({
    open: false,
    url: ''
})
const imageList = computed(() => {
    return item.value.images.map((image: any) => ({
        ...image,
        status: 'finished',
        url: image.source_url
    }))
})
const segment = ref<any>({
    content: 'soft'
})

const { mutate: deleteProductImage } = useDeleteProductImage()
const { mutate: postProductImage } = usePostProductImage()

const createYoutubeUrl = (url: string) => {
    const id = url.split('?v=')[1].split('&')[0]
    return 'https://www.youtube.com/embed/' + id
}

const handlePreview = (item: any) => {
    imageModal.open = true
    imageModal.url = item.url
}

const handleChange = (upload: { file: UploadFileInfo & { product_id: number } }) => {
    if (upload.file.status === 'pending') {
        const reader = new FileReader()

        reader.onload = () => {
            postProductImage(item.value.id, reader.result as string)
        }

        if (upload.file.file) {
            reader.readAsDataURL(upload.file.file)
        }
    }

    if (upload.file.status === 'removed') {
        if (upload.file) {
            deleteProductImage(upload.file.product_id, +upload.file.id)
        }
    }
}
</script>

<template>
    <n-modal
        :style="{ width: '600px' }"
        v-model:show="open"
        preset="card"
        title="Detail Produk"
        :segmented="segment"
        size="medium"
    >
        <n-space vertical>
            <n-h3>{{ item.name }}</n-h3>
            <n-p>{{ item.description }}</n-p>
            <n-table>
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Harga</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="typeItem in item.types">
                        <td>{{ typeItem.name }}</td>
                        <td>{{ typeItem.price }}</td>
                    </tr>
                </tbody>
            </n-table>
            <div>
                <n-upload
                    :default-upload="false"
                    :default-file-list="imageList"
                    multiple
                    list-type="image-card"
                    @preview="handlePreview"
                    @change="handleChange"
                >
                    <n-p>+</n-p>
                    <n-modal
                        v-model:show="imageModal.open"
                        preset="card"
                        style="width: 600px"
                        :title="item.name"
                    >
                        <img :src="imageModal.url" style="width: 100%" />
                    </n-modal>
                </n-upload>
            </div>
            <div v-if="item.youtube_url">
                <iframe
                    width="560"
                    height="315"
                    :src="createYoutubeUrl(item.youtube_url)"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
        </n-space>
    </n-modal>
</template>