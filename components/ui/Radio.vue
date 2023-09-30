<template>
  <div class="flex flex-wrap">
    <div
      v-for="item in list"
      :key="item.value as string"
      class="flex border rounded center pl-2"
    >
      <input
        :id="id + item.name"
        v-model="value"
        type="radio"
        :name="id + item.name"
        :value="item.value"
        :checked="value === item.value"
      />
      <label
        :for="id + item.name"
        class="cursor-pointer py-1 pl-2 pr-2"
        :class="{ 'text-primary': value === item.value }"
        >{{ item.name }}</label
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  import { uniqueId } from 'lodash-es'
  const id = uniqueId()

  const props = defineProps({
    list: {
      type: Array as PropType<IItem[]>,
      default: () => [],
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
  })
  const emit = defineEmits(['update:modelValue', 'change'])
  const value = computed<string | number>({
    set(value) {
      emit('update:modelValue', value)
    },
    get() {
      return props.modelValue
    },
  })
</script>

<style lang="scss" scoped>
  input[type='radio'] {
    width: 1.15em;
    height: 1.15em;

    @apply border rounded-1/2 m-0 cursor-pointer center appearance-none bg-default;
  }

  input[type='radio']::before {
    width: 0.65em;
    height: 0.65em;
    content: '';
    transform: scale(0);

    @apply bg-primary rounded-1/2 transition-100 ease-in-out;
  }

  input[type='radio']:checked::before {
    transform: scale(1);
  }
</style>
