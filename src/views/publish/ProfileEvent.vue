<template>
    <div class="box_section">
        <h3 class="box_title_custom">Sự Kiện</h3>
    </div>
    <div class="box db_block">
        <!-- <div class="box_section ta_c wd_p100">
      <div class="no_cnt" id="section14">
        <p>Không có dữ liệu</p>
      </div>
    </div> -->
        <div class="box_section">
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px">
                <div class="card-v1" v-for="item in 7">
                    <div class="card-v1-image" :style="{
                        backgroundImage: `url(https://via.placeholder.com/320x180.png?text=Event+1)`,
                    }"></div>
                    <div class="category">Đang diễn ra</div>
                    <div class="heading">
                        A heading that must span over two lines
                        <div class="author">
                            <span class="name">Thời gian:</span> 12/12/2024 - 13/12/2024
                            <br />
                            <span class="name">Người tạo:</span> Nguyễn Quốc Huy
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const upcomingEvents = ref([
    {
        title: "Hội Thảo Công Nghệ 2024",
        date: "20/12/2024",
        description: "Tham gia để khám phá những xu hướng công nghệ mới nhất.",
        image: "https://via.placeholder.com/320x180.png?text=Event+1",
    },
    {
        title: "Ngày Hội Việc Làm",
        date: "15/01/2025",
        description: "Cơ hội gặp gỡ và ứng tuyển vào các công ty hàng đầu.",
        image: "https://via.placeholder.com/320x180.png?text=Event+2",
    },
    {
        title: "Chương Trình Từ Thiện",
        date: "01/02/2025",
        description: "Góp phần hỗ trợ cộng đồng thông qua các hoạt động ý nghĩa.",
        image: "https://via.placeholder.com/320x180.png?text=Event+3",
    },
]);
</script>
<style scoped></style>
