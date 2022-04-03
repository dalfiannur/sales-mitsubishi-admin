<script lang="ts" setup>import { ref, toRefs } from 'vue';

interface Prop {
    open: boolean;
    item: any;
}

const props = defineProps<Prop>()

const { open, item } = toRefs(props)
const segment = ref<any>({
    content: 'soft'
})

const createYoutubeUrl = (id: string) => {
    return 'https://www.youtube.com/embed/' + id
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
                <n-image-group>
                    <n-space>
                        <n-image
                            v-for="image in item.images"
                            :key="image.id"
                            :src="image.source_url"
                            width="250"
                        />
                    </n-space>
                </n-image-group>
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