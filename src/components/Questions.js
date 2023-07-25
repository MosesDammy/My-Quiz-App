import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

/** Custom Hook */
import { useFetchQuestion } from '../hooks/FetchQuestion'
import { updateResult } from '../hooks/setResult'
import{ updateResultAction } from '../redux/resultReducer'
import { useDispatch } from 'react-redux'
export default function Questions({ onChecked }) {

  const [checked, setChecked] = useState(undefined)
  const { trace } = useSelector(state => state.questions)
  const  result = useSelector(state => state.result.result)
  const [{ isLoading, apiData, serverError}] = useFetchQuestion()
  // const question = data[0]

  const questions = useSelector(state => state.questions.queue[state.questions.trace])
  // const trace = useSelector(state => state.questions.trace)
  const dispatch = useDispatch()

  useEffect(() => {
   
    dispatch(updateResultAction({ trace, checked}))
  },[checked])

  function onSelect(i){
    onChecked(i)
    setChecked(i)
    dispatch(updateResultAction({ trace, checked}))
  }

  if(isLoading) return <h3 className='text-light'> isLoading </h3>
  if(serverError) return <h3 className='text-light'> {serverError || 'unknown Error'} </h3>

  return (
    <div className='questions'>
      <h2 className='text-light'> {questions?.question} </h2>

      <ul key={questions?.id}>
        {
          questions?.options.map((q, i) => (
          <li key={i}>
            <input 
            type='radio' 
            value={false} 
            name='options' 
            id={`q${i}-option`} 
            onChange={() => onSelect(i)}/>

            <label className='text-primary' htmlFor={`q${i}-option`}> {q} </label>
            <div className={`check ${result[trace] == i ? 'checked' : ''}`}></div>
          </li>
          ))
        }
      </ul>
    </div>
  )
}
