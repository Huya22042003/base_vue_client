<template>
    <div class="box_section">
            <div class="dp_flex gap_20">
                <table class="tbl_row">
                    <colgroup>
                        <col style="width: 24%;">
                        <col style="width: auto;">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th scope="row">
                                <p class="required">
                                    Tên Đăng Nhập
                                </p>
                            </th>
                            <td class="td_input">
                                <InputBase id="input_major" readonly />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <p class="required">
                                    Tên
                                </p>
                            </th>
                            <td class="td_input">
                                <InputBase id="input_major" readonly />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <p class="required">
                                    Số Điện Thoại
                                </p>
                            </th>
                            <td class="td_input">
                                <InputBase id="input_major" readonly />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <p class="required">
                                    Email
                                </p>
                            </th>
                            <td class="td_input">
                                <InputBase id="input_major" readonly />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <p class="required">
                                    Giới Tính
                                </p>
                            </th>
                            <td class="td_input">
                                <RadiobuttonBase v-for="item in listRadio1" :mode="'show'" :value="item.name"
                                    v-model="radiovalue1" :id="item.id" :name="item.id" :key="item.id"
                                    :checked="item.name == radiovalue1" :label="item.name">
                                    Checkbox 1
                                </RadiobuttonBase>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <p class="required">
                                    Ngày Sinh
                                </p>
                            </th>
                            <td class="td_input">
                                <BaseDatePicker class="wd_200" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                            </th>
                            <td>
                                <button type="button" class="btn_round btn_sm btn_secondary mg_t15">Chỉnh Sửa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="ta_c">
                    <AvatarCommon :width="120" />
                </div>
            </div>
        </div>
</template>
<script lang="ts" setup>

const listRadio1 = ref([
    { id: '3', name: 'Nam' },
    { id: '3', name: 'Nữ' },
    { id: '4', name: 'Khác' }
])
</script>