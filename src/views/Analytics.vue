<template>
  <div>
    Test
  </div>
  <div class="progresses">
    <progress-indicator-card
      v-for="(progress, index) in userProgress"
      :key="index"
      :title="progress.title"
      :subtitle="progress.subtitle"
      :completion-count="progress.completionCount"
    />
  </div>
  <pie
    :chart-data="chartData"
  />
  <line-chart
    :chart-data="lineChartData"
  />
</template>
<script setup>
  import ProgressIndicatorCard from '../components/analytics/ProgressIndicatorCard.vue';

  import { Pie, Line as LineChart } from 'vue-chartjs';
  import { Chart, ArcElement, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, LinearScale } from 'chart.js'
  import { ref, onMounted } from 'vue';

  Chart.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement);

  const chartData = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  // const labels = Utils.months({count: 7});
  const lineChartData = {
    labels: [
      1, 2, 3, 4, 5, 6, 7,
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      pointBackgroundColor: 'white',
      borderWidth: 1,
      pointBorderColor: '#249EBF',
      backgroundColor: 'transparent',
      tension: 0.1
    }]
  };

  const lastWeekDate = new Date();
  lastWeekDate.setDate(lastWeekDate.getDate() - 7);

  const lastMonthDate = new Date();
  lastMonthDate.setDate(lastMonthDate.getDate() - 30);

  const todayDate = new Date();

  const userProgress = ref([
    {
      title: 'Daily progress',
      subtitle: todayDate.toLocaleDateString(),
      completionCount: 0,
    },
    {
      title: 'Weekly progress',
      subtitle: lastWeekDate.toLocaleDateString() + ' - ' + todayDate.toLocaleDateString(),
      completionCount: 0,
    },
    {
      title: 'Monthly progress',
      subtitle: lastMonthDate.toLocaleDateString() + ' - ' + todayDate.toLocaleDateString(),
      completionCount: 0,
    }
  ]);

</script>
<style scoped>
  .progresses {
    display: flex;
  }
</style>