import { memo } from 'react'

const Smiley = function Smiley() {
  console.log('Smiley rendered')
  return <div>😊</div>
}

export default memo(Smiley) 