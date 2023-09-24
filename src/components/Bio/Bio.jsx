import { useState, Fragment } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import EditBio from "../EditBio/EditBio";
import ViewResume from "../ViewResume/ViewResume";

import "./bio.css"


function Bio() {
    const [route, setRoute] = useState("My Bio");
    const [aboutMe, setAboutMe] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [resume, setResume] = useState(null)


    const routeChange = (route) => {
        setRoute(route)
    };

    let currentPage = null;
    switch (route) {
        case "My Bio":
            currentPage =
                <Fragment>
                    <Col className="mt-4 flex-center-space-between">
                        <span style={{ fontWeight: 600 }}>About me</span>
                        <span><FontAwesomeIcon className='cursor-pointer' icon={["fas", "pencil"]} onClick={() => {
                            routeChange("Edit Bio")
                        }} /></span>
                    </Col>
                    {
                        aboutMe ?
                            <Col className="mt-2 about-me">
                                {aboutMe}
                            </Col> :
                            <Col className="gray mt-2" style={{ textAlign: "center" }}>
                                No about me added yet
                            </Col>
                    }
                    <hr />
                    <Col className="flex-center-space-between mt-2">
                        <span style={{ fontWeight: 600 }}>Blood group</span>
                        <span className="gray">{bloodGroup ? bloodGroup : ''}</span>
                    </Col>
                    <Col className="mt-2 resume-card">
                        <div className="flex-center-space-between">
                            <FontAwesomeIcon className='cursor-pointer' icon={["fas", "file-pdf"]} style={{ marginRight: "0.5em", fontSize: "2em" }} />
                            Resume
                        </div>
                        <div>
                            <span><FontAwesomeIcon className='cursor-pointer' icon={["fas", "chevron-right"]} onClick={() => {
                                routeChange("View Resume")
                            }} /></span>
                        </div>
                    </Col>
                </Fragment>
            break
        case "Edit Bio":
            currentPage = <EditBio aboutMe={aboutMe} resume={resume} bloodGroup={bloodGroup} setAboutMe={setAboutMe}
                setBloodGroup={setBloodGroup} setResume={setResume} setRoute={setRoute}></EditBio>
            break
        case "View Resume":
            currentPage = <ViewResume routeChange={routeChange} resume={resume}></ViewResume>
            break;
        default:
            routeChange("My Bio")
    }
    return (
        <Container>
            <Row className="bio-row">
                <Col lg={4} className="mt-4">
                    {
                        route !== 'View Resume' ?
                            <Col>
                                <span style={{ marginRight: "1em" }}><FontAwesomeIcon className='cursor-pointer' icon={["fas", "chevron-left"]} onClick={() => {
                                    routeChange("My Bio")
                                }} /></span>  {route}
                            </Col> : ""
                    }

                    {currentPage}
                </Col>
            </Row>
        </Container>
    );
}

export default Bio;