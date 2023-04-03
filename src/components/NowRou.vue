<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>{{ store.Nowrou.name }}</span>
                    <el-button class="button" text @click="store.Nowrou.title='zjsnb'">更改</el-button>
                </div>
            </template>
        </el-card>
    </div>
</template>

<script>

export default {
    name: 'NowRou',
    setup() {
        

        return {
            
        }
    }
}
</script>

<style></style>