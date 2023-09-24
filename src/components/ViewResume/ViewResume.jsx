import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import Col from 'react-bootstrap/Col';

function ViewResume(props) {
    return (
        <Fragment>
            {
                props.resume ?
                    <Col className="mt-4 flex-center-space-between">
                        <FontAwesomeIcon icon={["fas", "file-pdf"]} style={{ marginRight: "0.5em", fontSize: "1em" }} />
                        <span>{props.resume.name}</span>
                        <span><FontAwesomeIcon className='cursor-pointer' icon={["fas", "times"]} onClick={() => {
                            props.routeChange("My Bio")
                        }} /></span>
                    </Col>
                    : <Col className="mt-4 flex-center-space-between">
                        <span></span>
                        <span><FontAwesomeIcon className='cursor-pointer' icon={["fas", "times"]} onClick={() => {
                            props.routeChange("My Bio")
                        }} /></span>
                    </Col>
            }

            {
                props.resume ?
                    <Col className="mt-4">
                        <iframe
                            title="PDF Viewer"
                            src={URL.createObjectURL(props.resume)}
                            width="100%"
                            style={{ height: "80vh", width: "100%" }}
                        />
                    </Col> :
                    <Col style={{ marginTop: "40%" }} className="text-center">
                        No resume found.
                    </Col>
            }
        </Fragment>
    );
}

export default ViewResume;