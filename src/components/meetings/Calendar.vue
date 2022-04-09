<template>
  <calendar
    class="custom-calendar max-w-full"
    :masks="masks"
    :attributes="attributes"
    disable-page-swipe
    is-expanded
  >
    <template #day-content="{ day, attributes }">
      <div class="flex flex-col h-full z-10 overflow-hidden">
        <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
        <div class="flex-grow overflow-y-auto overflow-x-auto">
          <el-popover
            v-for="attr in attributes"
            :key="attr.key"
            placement="top-start"
            :title="attr.customData.title"
            :width="300"
            trigger="hover"
          >
            <template #default>
              <p>{{ attr.customData.date.toLocaleString() }}</p>
              <p>Members</p>
              <ul style="margin-top: 0">
                <li
                  v-for="(member, index) in attr.customData.members"
                  :key="index"
                >
                  {{ member["Full Name"] }}
                </li>
              </ul>
            </template>
            <template #reference>
              <div
                class="meeting text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
                :class="attr.customData.class"
              >
                {{ attr.customData.title }}
              </div>
            </template>
          </el-popover>
        </div>
      </div>
    </template>
    <template #day-popover>
      <div>
        Using my own content now
      </div>
    </template>
  </calendar>
</template>
<script setup>
import 'v-calendar/dist/style.css';
import { Calendar } from 'v-calendar';
import { ElPopover } from 'element-plus';
import { computed } from '@vue/reactivity';
import Typography from '../Typography.vue';

const month = new Date().getMonth();
const year = new Date().getFullYear();
const masks = {
    weekdays: 'WWW',
  };

const props = defineProps(
  {
    meetings: {
      type: Array,
      default: () => [],
    },
  }
);

const attributes = computed(() => {
  const meetings = props.meetings;
  return meetings.map((meeting, index) => {
    return {
      key: index,
      dates: meeting.date,
      customData: {
        title: meeting.name,
        members: meeting.members,
        date: meeting.date,
        class: 'type-'+meeting.type,
      },
      popover: {
        label: meeting.name,
      },
    }
  });
});

</script>
<style>
.meeting {
  padding: 8px 4px;
  border-radius: 8px;
  font-size: 14px;
  margin-block-start: 8px;
  margin-top: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 600;
}

.type-meeting {
  background-color: var(--el-color-primary-light-7);
}

.type-task {
  background-color: var(--el-color-success-light-7);
}

/* ::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  display: none;
} */
.custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;
  border-radius: 0;
  width: 100%;
  font-family: 'Poppins', sans-serif;
}

.custom-calendar.vc-container .vc-header {
  background-color: #f1f5f8;
  padding: 10px 0;
}
.custom-calendar.vc-container .vc-weeks {
  padding: 0;
}
.custom-calendar.vc-container .vc-day
{
  background-color: var(--weekday-bg);
  border-left: var(--weekday-border);
  border-right: var(--weekday-border);
  border-bottom: var(--weekday-border);
  border-top: var(--weekday-border);
  padding: 5px 0;
}
.custom-calendar.vc-container .vc-day {
  padding: 0 5px 3px 5px;
  text-align: left;
  min-height: var(--day-height);
  min-width: var(--day-width);
  background-color: white;
}

.custom-calendar.vc-container.weekday-1,
.custom-calendar.vc-container.weekday-7 {
  background-color: #eff8ff;
}

.custom-calendar.vc-container:not(.on-bottom) {
  border-bottom: var(--day-border);
}

.custom-calendar.vc-container:not(.on-bottom).weekday-1 {
  border-bottom: var(--day-border-highlight);
}

.custom-calendar.vc-container:not(.on-right) {
  border-right: var(--day-border);
}

.custom-calendar.vc-container .vc-day-dots {
  margin-bottom: 5px;
}
</style>