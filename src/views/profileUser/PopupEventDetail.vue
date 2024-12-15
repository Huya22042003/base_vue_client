<template>
    <TModal :size="'lg'" :is-open="isOpen" :is-show-header="true" :is-show-footer="true" @close-modal="onClose()">
        <template #title>
            <strong></strong>
        </template>
        <template #default>
            <div class="event-detail">
                <!-- Banner -->
                <div class="banner">
                    <img src="https://i.pinimg.com/736x/4b/92/43/4b924325613089a96886f1f64ce6d657.jpg"
                        alt="Event Banner" class="banner-image" />
                </div>
                <div class="info-container">
                    <!-- Title -->
                    <h1 class="event-title">Hội Thảo Công Nghệ 2024</h1>

                    <!-- Meta Information -->
                    <div class="event-meta">
                        <!-- Gộp ngày bắt đầu & ngày kết thúc -->
                        <div class="meta-item">
                            <span class="meta-label">Thời gian:</span>
                            <span class="meta-value">20/12/2024 - 22/12/2024</span>
                        </div>
                        <!-- Địa điểm -->
                        <div class="meta-item">
                            <span class="meta-label">Địa điểm:</span>
                            <span class="meta-value">Trung tâm Hội nghị Quốc gia</span>
                        </div>
                        <!-- Trạng thái -->
                        <div class="meta-item">
                            <span class="meta-label">Trạng thái:</span>
                            <span class="meta-value status active">Đang hoạt động</span>
                        </div>
                        <!-- Đã tham gia -->
                        <div class="meta-item">
                            <span class="meta-label">Đã tham gia:</span>
                            <span class="meta-value status no">Chưa</span>
                        </div>
                        <!-- Link đính kèm -->
                        <div class="meta-item">
                            <span class="meta-label">Link đính kèm:</span>
                            <span class="meta-value">
                                <a href="https://example.com" target="_blank">Xem chi tiết</a>
                            </span>
                        </div>
                        <!-- Ghi chú (chiếm 2 cột) -->
                        <div class="meta-item note">
                            <span class="meta-label">Ghi chú:</span>
                            <span class="meta-value">Vui lòng đăng ký trước ngày 19/12 để giữ chỗ.</span>
                        </div>
                    </div>
                </div>

                <!-- Event Description -->
                <div class="description">
                    <h2>Giới thiệu sự kiện</h2>
                    <p>
                        Hội thảo Công Nghệ 2024 là nơi quy tụ các chuyên gia công nghệ hàng
                        đầu để thảo luận về xu hướng mới trong lĩnh vực AI, IoT, và
                        Blockchain. Đây là cơ hội để bạn khám phá các giải pháp công nghệ
                        tiên tiến và mở rộng mạng lưới quan hệ trong ngành.
                    </p>
                </div>
            </div>
        </template>
        <template #footer>
            <button type="button" class="btn_sm btn_white border_medium_gray" @click="onClose()">
                {{ t("common.close") }}
            </button>
            <button type="button" class="btn_sm btn_primary" @click="onClose()">
                Tham Gia
            </button>
            <button type="button" class="btn_sm btn_gray" @click="onClose()">
                Hủy Tham Gia
            </button>
        </template>
    </TModal>
</template>
<script setup lang="ts">
const { t } = useI18n();
defineProps({
    isOpen: {
        type: Boolean,
        required: true,
    },
    onClose: {
        type: Function,
        required: true,
    },
});
</script>
<style scoped>
.event-detail {
    background-color: #fff;
    overflow: hidden;
    transition: transform 0.2s ease-in-out;
}

.banner {
    position: relative;
}

.banner-image {
    width: 100%;
    object-fit: cover;
}

.banner-overlay {
    position: absolute;
    bottom: 20px;
    left: 20px;
    color: white;
    text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.4);
}

.banner-title {
    font-size: 36px;
    font-weight: bold;
    background: linear-gradient(to right, #ff416c, #ff4b2b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.info-container {
    padding: 20px;
    background: #fff;
}

.event-title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin: 10px 0 30px;
    text-align: center;
    text-transform: uppercase;
}

.event-meta {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    color: #555;
}

.meta-item {
    display: grid;
    grid-template-columns: 1fr 4fr;
    gap: 8px;
    align-items: center;
}

.meta-label {
    font-weight: bold;
    color: #333;
    max-width: 200px;
}

.meta-value {
    color: #555;
}

.status.active {
    color: #28a745;
}

.status.no {
    color: #dc3545;
}

.meta-value a {
    color: #007bff;
    text-decoration: none;
}

.meta-value a:hover {
    text-decoration: underline;
}

.description {
    padding: 20px;
}

.description h2 {
    font-size: 20px;
    margin-bottom: 12px;
    color: #333;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.description p {
    color: #555;
    line-height: 1.6;
}

.cta {
    text-align: center;
    padding: 20px;
}
</style>
