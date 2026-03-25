import './../App.css'
import { Col, Container, Row } from 'react-bootstrap'

function Layout({ children }) {
    return (
        <Container> 
            <Row>
                <Col></Col>
                <Col xs={12} md={10}>
                    <Row >
                        <header>
                            <h1>Task scheduler</h1>
                        </header>
                    </Row>
                    <Row>
                        <main>
                            {children}
                        </main>
                    </Row>
                    <Row>
                        <footer>
                        <p>Developed and presented by Christian Virreira on 22. March 2026</p>
                    </footer>
                    </Row>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}

export default Layout