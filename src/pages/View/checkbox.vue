<template>
  <div class="rounded mx-30 mt-30">
    <div class="flex justify-between">
      <div class="flex-col">
        <div class="flex items-center gap-20">
          <span class="text-xl">{{ props.serial_num }}</span>
          <span class="text-xl flex gap-5 items-center" >{{ props.title }} <el-tag type="primary" class="ml-5">多选</el-tag> <el-tag type="warning" v-if="!required">选答</el-tag> <el-tag type="danger" v-if="localUnique">唯一</el-tag></span>
        </div>
        <div class="flex items-center mt-15 ml-10">
          <span class="text-md text-gray-500">{{ props.describe }}</span>
        </div>
      </div>
      <div class="flex-col justify-center items-center">
      </div>
    </div>
    <div class="divider my-5"></div>
    <div class="flex-col p-5 h-auto">
      <div v-for="item in localOptions" :key="item.serial_num" class="flex items-center gap-10 my-5">
        <input type="checkbox" :name="props.serial_num" class="checkbox-sm my-5" :value="item.content" v-model="answerArr"/>
        <span v-if="item.content">{{ item.content }}</span>
        <div class="ml-10 flex items-center gap-20">
          <div v-if="item.img" class="mt-4">
            <img v-if="item.img" :src="item.img" alt="Preview" style="max-width: 150px; max-height: 150px;" />
          </div>
        </div>
      </div>
      <div class="flex gap-10 mt-10" v-if="localOtherOption">
        <input type="checkbox" :name="props.serial_num" class="checkbox-sm my-5" :value="otherAnswer" v-model="answerArr"/>
        <input type="text" class="input-sm w-150" placeholder="其他" v-model="otherAnswer"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  serial_num: number,
  title?: string,
  required: boolean,
  unique: boolean,
  otherOption: boolean,
  describe: string,
  answer: string,
  options?: {
    content: string;
    img: string;
    serial_num: number;
  }[]
}>();

const localUnique = ref<boolean>(props.unique);
const localOtherOption = ref<boolean>(props.otherOption);
const localOptions = ref(props.options ? [...props.options] : []);
const otherAnswer = ref<string>('');
const answerArr = ref<string[]>([]);

const emits = defineEmits(['update:answer']);

watch([answerArr, otherAnswer], ([newAnswerArr, newOtherAnswer]) => {
  if (localOtherOption.value && newOtherAnswer && newAnswerArr.includes(newOtherAnswer)) {
    const combinedAnswers = newAnswerArr.filter(answer => answer !== newOtherAnswer).concat(newOtherAnswer).join('┋');
    emits('update:answer', combinedAnswers);
  } else {
    const combinedAnswers = newAnswerArr.join('┋');
    emits('update:answer', combinedAnswers);
  }
});
</script>

<style scoped>
</style>
