import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot } from '@fortawesome/free-solid-svg-icons'


const heading = (props) => {
    return (

        <header>
            {props.title} <FontAwesomeIcon icon={faRobot} aria-hidden="true"></FontAwesomeIcon>

        </header>
    )


}

export default heading