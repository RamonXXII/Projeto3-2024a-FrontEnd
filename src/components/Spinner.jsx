import Spinner from 'react-bootstrap/esm/Spinner';

function SpinnerLoading(){
  return(
    <Spinner animation="border" role="status" variant='success'>
      <Spinner animation='border' role='status' variant ="dark" size='sm'>
        <span className="visually-hidden">Carregando...</span>
      </Spinner>
      <span className="visually-hidden">Carregando...</span>
    </Spinner>
  )
}

export default SpinnerLoading;