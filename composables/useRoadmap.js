export const useRoadmap = () => {

  const roadmap = [
    {
      title: 'Q1 2023',
      list: [
        { txt: 'roadmap.q1.0', end: true },
        { txt: 'roadmap.q1.1', end: true },
        { txt: 'roadmap.q1.2' }
      ]
    },
    {
      title: 'Q2 2023',
      list: [
        { txt: 'roadmap.q2.0' },
        { txt: 'roadmap.q2.1' },
        { txt: 'roadmap.q2.2' }
      ]
    },
    {
      title: 'Q3 2023',
      list: [
        { txt: 'roadmap.q3.0' },
        { txt: 'roadmap.q3.1' },
        { txt: 'roadmap.q3.2' }
      ]
    },
    {
      title: 'Q4 2023',
      list: [
        { txt: 'roadmap.q4.0' },
        { txt: 'roadmap.q4.1' },
        { txt: 'roadmap.q4.2' }
      ]
    }
  ]

  return {
    roadmap
  }

}