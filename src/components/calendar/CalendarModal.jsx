import { useState } from 'react'
import Modal from 'react-modal'
import DateTimePicker from 'react-datetime-picker'
import moment from 'moment'
import Swal from 'sweetalert2'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}
Modal.setAppElement('#root')

const now = moment().minutes(0).seconds(0).add(1, 'hours')
const nowPlusOne = now.clone().add(1, 'hours')

export const CalendarModal = () => {

  const [dateStart, setDateStart] = useState(now.toDate())
  const [dateEnd, setDateEnd] = useState(nowPlusOne.toDate())
  const [titleValid, setTitleValid] = useState(true)

  const [formValues, setFormValues] = useState({
    title: 'Evento',
    notes: '',
    start: now.toDate(),
    end: nowPlusOne.toDate(),
  })

  const { title, notes, start, end } = formValues

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    })
  }

  const closeModal = () => {
    //TODO: cerrar el modal
  }
  const handleStartDateChange = (e) => {
    setDateStart(e)
    setFormValues({
      ...formValues,
      start: e,
    })
  }

  const handleEndDateChange = (e) => {
    setDateEnd(e)
    setFormValues({
      ...formValues,
      end: e,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const momentStart = moment(start)
    const momentEnd = moment(end)

    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire('Error', 'La fecha 2 debe ser mayor que la fecha de inicio', 'error')
    }

    if (title.trim().length < 2) {
      return setTitleValid(false)
    }

    //TODO: realizar validacion en bdd

    setTitleValid(true)
    closeModal()
  }

  return (
    <Modal
      className='modal'
      overlayClassName={'modal-fondo'}
      isOpen={true}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={handleSubmit}>

        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            className='form-control'
            onChange={handleStartDateChange}
            value={dateStart}
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            className='form-control'
            onChange={handleEndDateChange}
            value={dateEnd}
            minDate={dateStart}
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid && 'is-invalid'}`}
            placeholder="Título del evento"
            name="title"
            value={title}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>
    </Modal>
  )
}