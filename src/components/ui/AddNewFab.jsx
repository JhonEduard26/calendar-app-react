import { useDispatch } from 'react-redux'
import { setOpenModal } from '../../actions/ui'

export const AddNewFab = () => {

  const dispatch = useDispatch()

  const handleAddNewEvent = () => {
    dispatch(setOpenModal())
  }

  return (
    <button
      className='btn btn-primary fab'
      onClick={handleAddNewEvent}
    >
      <i className='fas fa-plus'></i>
    </button>
  )
}
