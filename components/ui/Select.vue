<script setup lang="ts">
  const props = defineProps({
    list: {
      type: Array as PropType<IItem[]>,
      default: () => [],
    },
    modelValue: {
      type: String,
      default: '',
    },
  })
  const emit = defineEmits(['update:modelValue', 'change'])
  const value = computed<string>({
    set(value) {
      emit('update:modelValue', value)
    },
    get() {
      return props.modelValue
    },
  })
  const current = ref(props.list?.find((i) => i.value === value.value)?.name)
  const is_toggle = ref(false)
  function onClick(evt: MouseEvent) {
    const v = (evt.target as HTMLElement)?.dataset?.value
    const l = (evt.target as HTMLElement)?.dataset?.label
    if (v) {
      value.value = v
      current.value = l
      emit('change', v)
    }
    is_toggle.value = false
  }

  function onToggle() {
    is_toggle.value = !is_toggle.value
  }

  const cloneList = ref<IItem[]>(props.list)

  watch(
    () => props.list,
    (newVal) => {
      cloneList.value = newVal
    },
  )

  function onInput() {
    cloneList.value = props.list.filter(
      (i) => i.name.indexOf(current?.value || '') > -1,
    )
    is_toggle.value = true
  }
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="relative inline-block max-w-60 bg-default">
      <button
        type="button"
        class="min-w-40 w-full flex items-center justify-between gap-x-2 rounded py-1 pl-3 pr-3 border"
        aria-expanded="true"
        aria-haspopup="true"
        @click="onToggle"
      >
        <input v-model="current" @input="onInput" />
        <svg
          class="h-4 w-4 -mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <div
        :class="{
          'opacity-0 pointer-events-none': !is_toggle,
          'opacity-100 pointer-events-auto': is_toggle,
        }"
        class="absolute top-100% border left-0 z-10 mt-1 max-h-50 max-w-60 w-100% overflow-y-auto rounded transition-200 bg-default"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
        @click="onClick"
      >
        <a
          v-for="item in cloneList"
          :key="item.value as string"
          :class="{ 'text-primary': value === item.value }"
          :data-value="item.value"
          :data-label="item.name"
          class="block truncate px-3 min-h-8 py-2 text-sm hover:bg-hover"
          >{{ item.name }}</a
        >
      </div>
    </div>
  </div>
</template>
