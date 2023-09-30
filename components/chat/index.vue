<template>
  <div class="w-full h-full center relative flex-col overflow-hidden">
    <div
      v-show="isShowPanel"
      ref="panelRef"
      class="w-35% rr-block border-r flex flex-col gap-y-2 <sm:(absolute w-80% bg-default/60 backdrop-blur-8 p-0) z-99 h-full absolute top-0 left-0 p-2"
    >
      <UiTab
        v-model="currentTab"
        :list="tabList"
        class="w-full h-full overflow-y-auto"
        type="card"
      >
        <template #default="{ current }">
          <ChatConfigTheme
            v-show="current === 'global'"
            v-model="msgCount"
            v-model:disturb="isDisturb"
            :group="groupConfig"
            @operate="onThemeOperate"
            @time="onTime"
            @bg="onTheme"
            @group="onGroup"
          ></ChatConfigTheme>
          <ChatConfigShell
            v-show="current === 'shell'"
            v-model:system="system"
            v-model="currentTime"
            @config="onShellConfig"
          ></ChatConfigShell>

          <ChatConfigObject
            v-show="current === 'object'"
            v-model="currentUser"
            :map="map"
            :is-group="groupConfig?.enabled"
            @operate="onObjectOperate"
            @create="onAddUser"
            @delete="onDeleteUser"
          ></ChatConfigObject>

          <ChatConfigSelf
            v-show="current === 'self'"
            :map="map"
            @operate="onObjectOperate"
          ></ChatConfigSelf>
        </template>
      </UiTab>
    </div>
    <div
      ref="chatRef"
      class="relative bg-color z-9 w-78 h-92% <sm:(w-full h-full text-base) aspect-1/2 flex text-xs flex-col"
    >
      <ChatShell
        :time="currentTime?.join?.(':')"
        :config="currentShellConfig"
        :system="system"
        class="absolute pt-2 px-4 <sm:(pt-4 px-6) z-10"
      ></ChatShell>
      <div
        class="flex absolute w-full overflow-hidden pt-11.5 px-2 pb-2 <sm:(px-3 pt-15) justify-between backdrop-blur-8 border-b border-dark/10 bg-color/95 items-center w-full z-9"
      >
        <div class="flex cursor-pointer items-center gap-x-0">
          <div i-ion-ios-arrow-left class="text-lg"></div>
          <div class="bg-info/20 -ml-1 px-1.5 py-0.5 rounded-3">
            {{ msgCount }}
          </div>
        </div>
        <div
          class="self-center flex-1 flex line-height-1em center gap-x-0.5 mr-4 font-450 overflow-hidden"
        >
          <div v-show="!groupConfig?.enabled" class="truncate max-w-80%">
            {{ map['user'].name }}
          </div>
          <div v-show="groupConfig?.enabled" class="gap-x-1 max-w-full center">
            <div class="truncate inline-block center max-w-80%">
              {{ groupConfig?.name }}
            </div>
            <b> ({{ groupConfig?.number }}) </b>
          </div>
          <div
            v-show="isDisturb"
            i-ion-notifications-off-outline
            scale-75
            bg-info
          ></div>
        </div>
        <div class="cursor-pointer mr-1.5 flex items-center gap-x-1 font-bold">
          <div class="w-3px h-3px bg-dark rounded-1/2"></div>
          <div class="w-3px h-3px bg-dark rounded-1/2"></div>
          <div class="w-3px h-3px bg-dark rounded-1/2"></div>
        </div>
      </div>

      <div
        ref="containRef"
        class="bg-color pt-22 h-[calc(100%-4.5rem)] <sm:(h-[calc(100%-5.5rem)] gap-y-4 pt-26) chat-container overflow-y-auto py-2 px-2.5 flex gap-y-3 flex-col"
      >
        <ChatItem
          v-for="(item, index) in list"
          :key="item.id as string"
          :chat="item"
          :map="map"
          :username="map?.[currentUser]?.name"
          :is-custom-bg="isCustomBg"
          :is-group="groupConfig?.enabled"
          @avatar="onAvatar"
          @hongbao="onHongbao"
          @payment="onPayment"
          @delete="onDelete(index)"
          @revert="onRevert(index, $event)"
          @down="onDown(index)"
          @up="onUp(index)"
        ></ChatItem>
      </div>

      <div class="relative w-full center flex-1 px-2 items-start py-2 bg-hover">
        <div class="center w-full gap-x-2">
          <div
            ref="toggleRef"
            class="border-1.5 rounded-full border-dark p-0.5 cursor-pointer"
            @click="onTogglePanel"
          >
            <div i-ion-ios-wifi class="rotate-90deg scale-80"></div>
          </div>
          <div class="flex-1">
            <input
              v-model="inputVal"
              class="w-full px-2 bg-default py-2 rounded"
              @change="onInputChange"
              @keyup.enter="onInputChange"
            />
          </div>
          <div class="<sm:mr-2 border-1.5 rounded-full p-0.1 border-dark">
            <svg
              t="1695407081290"
              class="cursor-pointer h-4.5 w-4.5 <sm:(w-6 h-6)"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6666"
              fill="currentColor"
            >
              <path
                d="M320 363.2m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"
                p-id="6668"
              ></path>
              <path
                d="M704 363.2m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"
                p-id="6669"
              ></path>
              <path
                d="M734.4 555.2H289.6c-17.6 0-33.6 8-46.4 20.8s-17.6 33.6-12.8 51.2C256 763.2 376 857.6 512 857.6s256-97.6 281.6-230.4c4.8-17.6 0-33.6-12.8-51.2-12.8-12.8-30.4-20.8-46.4-20.8zM512 772.8c-84.8 0-161.6-56-187.2-132.8H704c-30.4 81.6-107.2 132.8-192 132.8z"
                p-id="6670"
              ></path>
            </svg>
          </div>
          <div
            class="border-1.5 rounded-full center border-dark p-0.5 cursor-pointer"
          >
            <div i-ion-md-add class="cursor-pointer font-bold"></div>
          </div>
        </div>
        <div
          v-if="system === 'ios'"
          class="absolute bottom-1.5 center bg-dark w-35% h-1 rounded"
        ></div>
        <div v-else class="absolute bottom-2 center gap-x-15% w-full">
          <div i-ion-triangle-outline class="-rotate-90deg"></div>
          <div
            class="rounded-full w-3.5 h-3.5 <sm:(h-4.5 w-4.5) border-dark border-1"
          ></div>
          <div
            class="rounded-0.5 w-3 h-3 <sm:(h-4 w-4) border-dark border-1"
          ></div>
        </div>
      </div>
    </div>
    <div
      class="w-35% absolute rr-block gap-y-3 <sm:hidden flex border-l flex-col center right-0 h-full p-2"
    >
      <div
        class="p-2 flex flex-col w-85% gap-y-2 rounded relative z-9 bg-default/20 backdrop-blur-8"
      >
        <div class="flex justify-between items-center">
          <h2 class="font-bold">微信聊天生成器</h2>
          <DarkToggle></DarkToggle>
        </div>

        <div class="text-danger text-sm">
          仅供娱乐，正式场合请勿使用，严禁用于违法行为，否则后果自负
        </div>
      </div>
      <ChatVisual></ChatVisual>
    </div>
    <UiDialog v-model="dialogVisible">
      <div class="flex flex-col gap-y-4 bg-default rounded p-2 text-center">
        <div>长按保存图片</div>
        <img :src="downloadUrl" class="w-auto max-h-80vh" />
      </div>
    </UiDialog>
  </div>
</template>

<script setup lang="ts">
  import { saveAs } from 'file-saver'
  import { domToPng } from 'modern-screenshot'
  import { CHAT_LIST, CHAT_USER_MAP, GROUP_CONFIG } from '~/constants'
  const msgCount = ref(99)
  const containRef = ref()
  const inputVal = ref('')
  const isShowPanel = ref(false)
  const panelRef = ref()
  const toggleRef = ref()
  const tabList = ref([
    {
      name: '全局',
      value: 'global',
    },
    {
      name: '外壳',
      value: 'shell',
    },
    {
      name: '对象',
      value: 'object',
    },
    {
      name: '本人',
      value: 'self',
    },
  ])
  const currentUser = ref('user')
  const currentTab = ref('global')

  onMounted(() => {
    const bool = isMobileDevice()
    if (bool) {
      onClickOutside(
        panelRef,
        () => {
          isShowPanel.value = false
        },
        {
          ignore: [toggleRef.value],
        },
      )
    } else {
      isShowPanel.value = true
    }
  })

  function onTogglePanel() {
    const bool = isMobileDevice()
    if (bool) isShowPanel.value = !isShowPanel.value
  }
  const map = ref<Record<string, Record<string, string>>>({})

  const userMap = useLocalStorage<Record<string, Record<string, string>>>(
    CHAT_USER_MAP,
    {
      user: {
        url: '/logo.svg',
        name: '新用户',
      },
      self: {
        url: '/logo.svg',
        name: '猫染',
      },
    },
  )

  map.value = userMap.value

  const list = ref<Record<string, unknown>[]>([])

  const stateList = useLocalStorage<Record<string, unknown>[]>(CHAT_LIST, [])
  list.value = stateList.value

  function onInputChange() {
    if (inputVal.value) {
      addListItem({
        role: 'self',
        user: 'self',
        message: inputVal.value,
      })

      inputVal.value = ''
    }
  }

  function scrollBottom() {
    nextTick(() => {
      containRef?.value?.scrollTo({
        top: containRef?.value?.scrollHeight,
        behavior: 'smooth',
      })
    })
  }

  function onAvatar(key: keyof typeof map.value, url: string) {
    if (typeof map.value[key] === 'object') map.value[key].url = url
  }

  function onHongbao(role: string) {
    addListItem({
      role: 'system',
      type: 'hongbao',
      status: role === 'self' ? 0 : 1,
      user: currentUser.value,
    })
  }

  function onPayment(opt: Record<string, unknown>) {
    const { price, role, status } = opt
    if (role === 'self') {
      addListItem({
        role: 'user',
        user: 'user',
        type: 'payment',
        price: price,
        status: status,
      })
    } else {
      addListItem({
        user: 'user',
        role: 'self',
        type: 'payment',
        price: price,
        status: status,
      })
    }
  }

  function onDelete(index: number) {
    list.value.splice(index, 1)
  }

  function onRevert(index: number, status: number) {
    onDelete(index)
    addListItem({
      role: 'system',
      type: 'revert',
      status: status,
      user: currentUser.value,
    })
  }

  function onUp(index: number) {
    if (list.value[index - 1]) {
      ;[list.value[index - 1], list.value[index]] = [
        list.value[index],
        list.value[index - 1],
      ]
    }
  }
  function onDown(index: number) {
    if (list.value[index + 1]) {
      ;[list.value[index], list.value[index + 1]] = [
        list.value[index + 1],
        list.value[index],
      ]
    }
  }

  function addListItem(opt: Record<string, unknown> = {}) {
    opt.id = crypto?.randomUUID?.()
    list.value.push(opt)
    scrollBottom()
  }

  const isCustomBg = ref(false)
  function onTheme(opt: Record<string, unknown>) {
    const { type, value, mode } = opt
    if (value) isCustomBg.value = true
    switch (type) {
      case 'color':
        containRef.value.style.background = value

        break
      case 'custom':
        if (value) containRef.value.style.backgroundImage = `url(${value})`
        containRef.value.style.backgroundSize = mode
        break
    }
  }

  const groupState = useLocalStorage<IGroupConfig>(GROUP_CONFIG, {
    enabled: false,
    name: '',
    number: 3,
  })
  const groupConfig = ref<IGroupConfig>(groupState.value)

  function onGroup(config: IGroupConfig) {
    groupConfig.value = config
  }

  function onAddUser(opt: Record<string, string>) {
    const { id, name, url } = opt
    if (id && groupConfig?.value?.enabled) {
      map.value[id as string] = {
        name: name,
        url: url,
      }
    }
  }

  function onDeleteUser(id: string) {
    delete map.value[id]
    const arr = list.value.filter((i) => i.user !== id)
    resetList(arr)
    currentUser.value = 'user'
  }

  function resetList(arr: Record<string, unknown>[]) {
    list.value = arr
    stateList.value = arr
  }

  const chatRef = ref()
  const dialogVisible = ref(false)
  const downloadUrl = ref('')
  async function onThemeOperate(
    opt: Record<string, unknown>,
    cb?: (bool: boolean) => unknown,
  ) {
    const { type, onlyContent, dialog } = opt
    let url = ''

    switch (type) {
      case 'clear':
        resetList([])
        break
      case 'export':
        try {
          url = await screenshot(chatRef.value, onlyContent as boolean)
        } catch (error) {
          console.error(error)
        } finally {
          cb?.(true)
        }
        break
      case 'long_export':
        try {
          url = await screenLongshot(chatRef.value, onlyContent as boolean)
        } catch (error) {
          console.error(error)
        } finally {
          cb?.(true)
        }
        break
      default:
        break
    }
    if (url) {
      if (dialog) {
        dialogVisible.value = true
        downloadUrl.value = url
      } else {
        saveAs(url, '微信.png')
      }
    }
  }

  async function screenshot(dom: HTMLElement, onlyContent: boolean) {
    if (onlyContent) {
      return await shotContent()
    } else {
      return await domToPng(dom, {
        scale: 2,
        height: dom.scrollHeight,
      })
    }
  }

  async function screenLongshot(dom: HTMLElement, onlyContent: boolean) {
    if (onlyContent) {
      return await shotContent()
    } else {
      const clientHeight = containRef.value.clientHeight
      const scrollHeight = containRef.value.scrollHeight
      return await domToPng(dom, {
        scale: 2,
        height: dom.clientHeight + scrollHeight - clientHeight,
        onCloneNode: function (cloned: any) {
          if (scrollHeight > clientHeight) {
            cloned.querySelector('.chat-container').style['overflow'] =
              'initial'
            cloned.querySelector('.chat-container').style['height'] = 'initial'
          }
        },
      })
    }
  }

  async function shotContent() {
    return await domToPng(containRef.value, {
      scale: 2,
      height: containRef.value.scrollHeight - 80,
      onCloneNode: function (cloned: any) {
        cloned.style['padding-top'] = '0.5rem'
      },
    })
  }

  function onTime(time: string, user?: string) {
    addListItem({
      role: 'system',
      type: 'time',
      time: time,
      user: user,
    })
  }

  function onObjectOperate(opt: Record<string, unknown>) {
    const { type, value, role, status, user, message, time } = opt
    switch (type) {
      case 'input':
        if (status === 3) {
          onTime(time as string, user as string)
        }
        addListItem({
          user: user,
          role: role,
          message: value,
          status: status,
        })
        if (status === 1) {
          addListItem({
            role: 'system',
            type: 'rejected',
          })
        }
        if (status === 2) {
          addListItem({
            role: 'system',
            type: 'delete',
          })
        }

        break
      case 'image':
        addListItem({
          role: role,
          type: 'image',
          user: user,
          url: value,
        })

        break
      case 'hongbao':
        addListItem({
          role: role,
          user: user,
          type: 'hongbao',
          message: message,
        })

        break
      case 'payment':
        addListItem({
          role: role,
          type: 'payment',
          user: user,
          price: value,
          message: message,
        })
        break
      case 'audio':
        addListItem({
          role: role,
          type: 'yuyin',
          user: user,
          minute: value,
          isNew: true,
        })
        break
      case 'video':
        addListItem({
          role: role,
          type: 'video',
          user: user,
          status: status,
          time: value,
        })
        break
      case 'paiyipai':
        addListItem({
          role: 'system',
          type: 'paiyipai',
          status: status,
          user: currentUser.value,
        })
        break
      case 'delete':
        addListItem({
          role: 'system',
          type: 'delete',
        })
        break
      case 'add':
        addListItem({
          role: 'user',
          user: currentUser.value,
          message: '我是' + map.value[currentUser.value].name,
        })
        addListItem({
          role: 'system',
          type: 'add',
        })
        break
    }
  }

  const currentShellConfig = ref<Record<string, unknown>>({
    system: 'ios',
    battery: 100,
    signal: 4,
    wifi: 3,
    g: '5G',
    enable_wifi: true,
    enable_battery: false,
  })

  const date = new Date()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const currentTime = ref<string[]>([
    hour < 10 ? '0' + hour : hour + '',
    minute < 10 ? '0' + minute : minute + '',
  ])

  const system = ref('ios')

  function onShellConfig(config: Record<string, unknown>) {
    currentShellConfig.value = config
  }

  const isDisturb = ref(false)
</script>

<style lang="scss" scoped>
  @use '~/style/common/mixin' as *;

  .chat-container {
    @include scrollbar;
  }
</style>
