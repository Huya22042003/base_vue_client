<template>
    <div class="box_section">
        <h3 class="box_title_custom">Giải Thưởng</h3>
    </div>
    <div class="box db_block">
        <!-- <div class="box_section ta_c wd_p100">
      <div class="no_cnt" id="section14">
        <p>Không có dữ liệu</p>
      </div>
    </div> -->
        <div class="box_section">
            <div class="card_list_other">
                <div class="card-v1" v-for="item in 5">
                    <div class="card-v1-image" :style="{
                        backgroundImage: `url(https://via.placeholder.com/320x180.png?text=Event+1)`,
                    }"></div>
                    <div class="heading">
                        A heading that must span over two lines
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="box_section">
        <h3 class="box_title_custom">Chứng Chỉ</h3>
    </div>
    <div class="box db_block">
        <!-- <div class="box_section ta_c wd_p100">
      <div class="no_cnt" id="section14">
        <p>Không có dữ liệu</p>
      </div>
    </div> -->
        <div class="box_section">
            <div class="card_list_other">
                <div class="card-v1" v-for="item in 5">
                    <div class="card-v1-image" :style="{
                        backgroundImage: `url(https://via.placeholder.com/320x180.png?text=Event+1)`,
                    }"></div>
                    <div class="heading">
                        A heading that must span over two lines
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="box_section">
        <h3 class="box_title_custom">Bài Viết</h3>
    </div>
    <div class="box db_block">
        <!-- <div class="box_section ta_c wd_p100">
      <div class="no_cnt" id="section14">
        <p>Không có dữ liệu</p>
      </div>
    </div> -->
        <div class="box_section">
            <div class="card_list_other">
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
    <div class="box_section">
        <h3 class="box_title_custom">Công Thức</h3>
    </div>
    <div class="box db_block">
        <!-- <div class="box_section ta_c wd_p100">
      <div class="no_cnt" id="section14">
        <p>Không có dữ liệu</p>
      </div>
    </div> -->
        <div class="box_section">
            <div class="card_list_other">
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
  <style scoped>
  .card_list_other {
    display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px
  }
  </style>
  