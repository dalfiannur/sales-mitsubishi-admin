<script lang="ts" setup>
import { reactive } from 'vue'
import usePostLogin from '../composable/usePostLogin';

interface LoginData {
    email: string;
    password: string;
}

const data = reactive<LoginData>({
    email: '',
    password: ''
})

const { mutate } = usePostLogin()

const submit = () => mutate(data)
</script>

<template>
    <div class="root">
        <div class="container">
            <n-card>
                <n-form>
                    <n-form-item label="Email">
                        <n-input type="email" v-model:value="data.email" />
                    </n-form-item>
                    <n-form-item label="Password">
                        <n-input type="password" v-model:value="data.password" />
                    </n-form-item>
                </n-form>

                <n-space justify="end">
                    <n-button type="primary" @click="submit">Login</n-button>
                </n-space>
            </n-card>
        </div>
    </div>
</template>

<style scoped>
.root {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.container {
    width: 400px;
    height: fit-content;
}
</style>