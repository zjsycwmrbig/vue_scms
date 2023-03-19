<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>{{ store.Nowrou.title }}</span>
                    <el-button class="button" text @click="store.Nowrou.title='zjsnb'">更改</el-button>
                </div>
            </template>
        </el-card>
    </div>
</template>

<script>
import { useNowrouStore } from '@/store/pinia'
export default {
    name: 'NowRou',
    setup() {
        const store = useNowrouStore()

        return {
            store
        }
    }
}
</script>

<style></style>