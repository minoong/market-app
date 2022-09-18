import React from 'react'
import StarIcon from '@mui/icons-material/Star'

function Mark() {
 return (
  <div>
   <StarIcon fontSize="small" color="disabled" />
  </div>
 )
}

export default React.memo(Mark)
