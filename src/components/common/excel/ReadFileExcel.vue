<template>
  <div class="attach_filebox">
    <div class="top">
      <form ref="fileForm">
        <button type="button">
          <input
            ref="inputFile"
            type="file"
            :id="id"
            :name="name"
            @change="onChange"
            hidden
            accept=".xlsx, .xls"
          />
          <label v-bind="attrs" :for="id" class="btn_white">{{ label }}</label>
        </button>
        <label :for="id">{{ fileName }}</label>
      </form>
    </div>
  </div>
</template>
<script setup>
import ExcelJS from "exceljs";
import { defineProps, useAttrs, defineEmits, reactive } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const props = defineProps({
  modelValue: Array,
  label: String,
  id: String,
  name: String,
});
const { id, label } = props;
const emit = defineEmits(["update:modelValue","callFunction"]);
const attrs = useAttrs();
const sheets = reactive([]);
const fileName = ref('');
const onChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  fileName.value = file.name;
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    readExcelData(data);
  };

  reader.readAsArrayBuffer(file);
};

const readExcelData = async (data) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(data);

  sheets.length = 0;

  workbook.eachSheet((sheet) => {
    const sheetData = {
      name: sheet.name,
      headers: [],
      rows: [],
      data: [],
    };

    // Get header value
    const headerRow = sheet.getRow(1);
    headerRow.eachCell((cell) => {
      sheetData.headers.push(cell.value);
    });

    // Get rowvalue
    sheet.eachRow((row, rowIndex) => {
      if (rowIndex > 1) {
        const rowData = {};
        row.eachCell((cell, colNumber) => {
          rowData[sheetData.headers[colNumber - 1]] = cell.value;
        });
        sheetData.rows.push(rowData);
      }
    });

    // Convert to Json
    sheetData.data = sheetData.rows;
    sheets.push(sheetData);
  });

  emit("update:modelValue", sheets);
  emit('callFunction', sheets)
};
</script>
