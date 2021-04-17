import React, { useState, useEffect, useContext, useCallback } from 'react'
import {
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Paper } from '@material-ui/core'
import axios from 'axios'
import { Context } from '../context'
import { blueGrey } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  chart: { fontSize: '0.8rem' },
  titleText: {
    fontFamily: 'Yanone Kaffeesatz',
    fontSize: '1.3rem',
    color: blueGrey[700],
    paddingBottom: 7,
    paddingLeft: 15,
  },
  user: {
    color: theme.palette.secondary.light,
    fontSize: '1.6rem',
    marginLeft: 5,
    marginRight: 5,
  },
}))

export const MemoriesChart = ({ memory }) => {
  const classes = useStyles()
  const { setInfo } = useContext(Context)

  const [chartData, setChartData] = useState([])
  const [year, setYear] = useState(new Date().getFullYear())

  const genChartData = (items, lastMonth) => {
    const result = []
    for (let mon = 0; mon <= lastMonth; mon++) {
      let count = 0
      items.forEach((item) => {
        if (mon === new Date(item.date).getMonth()) count++
      })
      result.push(count)
    }

    return result
  }

  const getChartData = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/memory/chartdata/user/${memory.user._id}/year/${year}`
      )

      const publicMemories = response.data.memories.filter(
        (item) => item.shared === true
      )
      const privateMemories = response.data.memories.filter(
        (item) => item.shared === false
      )

      const publicArr = genChartData(publicMemories, response.data.lastMonth)
      const privateArr = genChartData(privateMemories, response.data.lastMonth)

      const datas = []
      const label = [
        'январь',
        'февраль',
        'март',
        'апрель',
        'май',
        'июнь',
        'июль',
        'август',
        'сентябрь',
        'октябрь',
        'ноябрь',
        'декабрь',
      ]

      for (let mon = 0; mon <= response.data.lastMonth; mon++) {
        datas.push({
          public: publicArr[mon],
          private: privateArr[mon],
          date: label[mon],
        })
      }

      setChartData(datas)
    } catch (err) {
      setInfo({
        type: 'error',
        msg: err?.message || 'нет данных для графика',
      })
    }
  }, [memory.user?._id, year, setInfo])

  useEffect(() => {
    getChartData()
  }, [memory, getChartData])

  return (
    <>
      <Box className={classes.titleText}>
        Динамика создания воспоминаний пользователем
        <span className={classes.user}>{memory.user?.username}</span>в {year}{' '}
        году
      </Box>
      <Paper>
        <Box minWidth={320} height={150}>
          <ResponsiveContainer>
            <LineChart
              className={classes.chart}
              data={chartData}
              margin={{ top: 10, right: 15, left: 15, bottom: 0 }}
            >
              <XAxis dataKey='date' />
              <Tooltip />
              <Legend verticalAlign='top' align='right' height={20} />
              <CartesianGrid stroke='#f5f5f5' strokeDasharray='5 5' />
              <Line
                type='monotone'
                dataKey='public'
                stroke='#1976d2'
                yAxisId={1}
              />
              <Line
                type='monotone'
                dataKey='private'
                stroke='#dc004e'
                yAxisId={0}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </>
  )
}
