<script lang="ts" setup>
import { MenuOption, NIcon } from 'naive-ui';
import { BookmarkOutline, CaretDownOutline } from '@vicons/ionicons5'
import { ref, h, onMounted } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const inverted = ref<boolean>(false)
const collapsed = ref<boolean>(false)
const menuOptions: MenuOption[] = [
    {
        label: 'Beranda',
        key: 'beranda',
        href: '/'
    },
    {
        label: 'Produk',
        key: 'produk',
        href: '/product'
    },
    {
        label: 'Berita',
        key: 'news',
        href: '/news'
    },
]

const renderMenuLabel = (option: MenuOption) => {
    if ('href' in option) {
        return h('a', {
            href: '#',
            onClick() {
                router.push(option.href as string)
            }
        }, [
            option.label as string
        ])
    }
}

const renderMenuIcon = (option: MenuOption) => {
    if (option.key === 'sheep-man') return true
    if (option.key === 'food') return null
    return h(NIcon, null, { default: () => h(BookmarkOutline) })
}

const expandIcon = () => {
    return h(NIcon, null, { default: () => h(CaretDownOutline) })
}

onMounted(() => {
    const token = sessionStorage.getItem('mitsubishi_access_token')
    if (!token) {
        router.push('/login')
    }
})
</script>

<template>
    <n-space vertical :style="{ height: '100vh' }">
        <n-layout has-sider :style="{ height: '100vh' }">
            <n-layout-sider
                bordered
                show-trigger
                collapse-mode="width"
                :collapsed-width="64"
                :width="240"
                :native-scrollbar="false"
                :inverted="inverted"
            >
                <n-menu
                    :collapsed="collapsed"
                    :collapsed-width="240"
                    :collapsed-icon-size="22"
                    :options="menuOptions"
                    :render-label="renderMenuLabel"
                    :render-icon="renderMenuIcon"
                    :expand-icon="expandIcon"
                />
            </n-layout-sider>
            <n-layout>
                <n-layout-header bordered position style="margin-bottom:0px">s</n-layout-header>
                <n-layout-content>
                    <router-view />
                </n-layout-content>
            </n-layout>
        </n-layout>
    </n-space>
</template>