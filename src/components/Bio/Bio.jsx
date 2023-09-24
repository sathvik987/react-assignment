import { useState, Fragment, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Badge from 'react-bootstrap/Badge';

import EditBio from "../EditBio/EditBio";
import ViewResume from "../ViewResume/ViewResume";

import "./bio.css"


function Bio() {
    const [route, setRoute] = useState("My Bio");
    const [aboutMe, setAboutMe] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [resume, setResume] = useState(null)

    const [allProSkills, setProSkills] = useState([])
    const [allHobbiesSkills, setAllHobbiesSkills] = useState([])
    const [allSubjects, setAllSubjects] = useState([])
    const [codeRatings, setCodeRatings] = useState([])
    const [meetRatings, setMeetRatings] = useState([])

    const getAllSkills = async () => {
        try {
            let skills = await (await (fetch("https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/GetProfessionalSkillsResponse.json"))).json()
            setProSkills(skills.result[0]["skills"])
            skills = await (await (fetch("https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/GetHobbiesResponse.json"))).json()
            setAllHobbiesSkills(skills.result[0]["hobbies"])
            skills = await (await (fetch("https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/GetSubjectsResponse.json"))).json()
            setAllSubjects(skills.result[0]["subjects"])

            let res = await (await (fetch("https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/RatingsEthicalCodeResponse.json"))).json()
            setCodeRatings(res)
            res = await (await (fetch("https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/RatingsVirtuallyMetResponse.json"))).json()
            setMeetRatings(res)
        } catch (error) {
            console.log(error);
        }

    }


    useEffect(() => {
        getAllSkills()
    }, [])


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
                    <hr />
                    <Col className="mt-2 flex-center-space-between">
                        <span style={{ fontWeight: 600 }}>Skills</span>
                        <span><FontAwesomeIcon className='cursor-pointer' icon={["fas", "pencil"]} onClick={() => { }} /></span>
                    </Col>
                    <Col className="mt-2">
                        I am incredible at this skill/professionally great at
                    </Col>
                    <div className="skills-col">
                        {
                            allProSkills && allProSkills.length ? allProSkills.map((skill) => {
                                return <Badge style={{ margin: "0.5em 1em" }} pill bg="primary" key={skill._id}>
                                    {skill.value}
                                </Badge>
                            }) : ""
                        }
                    </div>
                    <hr />

                    <Col className="mt-4">
                        Hobbies i am passionate about
                    </Col>
                    <div className="skills-col">
                        {
                            allHobbiesSkills && allHobbiesSkills.length ? allHobbiesSkills.map((skill) => {
                                return <Badge style={{ margin: "0.5em 1em" }} pill bg="primary" key={skill._id}>
                                    {skill.value}
                                </Badge>
                            }) : ""
                        }
                    </div>
                    <hr />

                    <Col className="mt-4">
                        My favorite subjects are
                    </Col>
                    <div className="skills-col">
                        {
                            allSubjects && allSubjects.length ? allSubjects.map((skill) => {
                                return <Badge style={{ margin: "0.5em 1em" }} pill bg="primary" key={skill._id}>
                                    {skill.value}
                                </Badge>
                            }) : ""
                        }
                    </div>


                    <div style={{ backgroundColor: "grey" }}>
                        <Col className="mt-4 rating flex-center-space-even">
                            <span>
                                {codeRatings && codeRatings.ethicalCodeCount ? codeRatings.ethicalCodeCount : 0}
                            </span>
                            <span>Say has ethical code of conduct</span>
                        </Col>
                        <hr style={{ color: "white" }} />
                        <Col className="mt-4 rating flex-center-space-even">
                            <span>
                                {meetRatings && meetRatings.virtuallyMetCount ? meetRatings.virtuallyMetCount : 0}
                            </span>
                            <span>Have met in real life/Video call</span>
                        </Col>
                    </div>

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