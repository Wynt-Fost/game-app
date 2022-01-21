import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot } from '@fortawesome/free-solid-svg-icons'


const heading = (props) => {
    return (

        <header>
            {/* I plan to expand the app this would be used to change the name of the header */}
            {props.title} <FontAwesomeIcon icon={faRobot} aria-hidden="true"></FontAwesomeIcon>

        </header>
    )


}

export default heading