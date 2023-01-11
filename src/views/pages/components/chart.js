// Semi Circle

const semiRadialbarChart = {
  chartOptions: {
    chart: {
      type: 'radialBar',
      height: 350,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        track: {
          background: '#e7e7e7',
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: 0,
            left: 0,
            color: '#999',
            opacity: 1,
            blur: 2,
          },
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: 0,
            fontSize: '32px',
          },
        },
      },
    },
    grid: {
      padding: {
        top: -10,
      },
    },
    fill: {
      colors: [
        function ({ value }) {
          if (value < 55) {
            return '#D35400'
          } else if (value >= 55 && value < 80) {
            return '#F39C12'
          } else {
            return '#2ECC71'
          }
        },
      ],
    },
    labels: ['Average Results'],
    colors: ['#3b76e1'],
  },
}

export { semiRadialbarChart }
