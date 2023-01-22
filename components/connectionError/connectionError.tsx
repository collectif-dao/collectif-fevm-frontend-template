import {ConnectionErrorStyle} from './connectionErrorStyles';
import { useErrorMessage } from './useErrorMessage'; 

function ConnectionError(props) {
	const error = useErrorMessage();

  if (error) {
    return <ConnectionErrorStyle {...props}>{error}</ConnectionErrorStyle>;
  }

  return null;
}

export default ConnectionError