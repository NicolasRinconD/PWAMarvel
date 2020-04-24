import React from 'react';
import md5 from 'md5';
import { Accordion, Card } from 'react-bootstrap';
export default class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            supers: [],
            err: '' 
        };
    }

    componentDidMount() {
        if(!navigator.onLine){
            if(localStorage.getItem('characters') === null){
                this.setState({err: '!OOPS, Something Happened...\n Retry Again Later'});
            }
            else{
                this.setState({ supers: localStorage.getItem('characters') });
            }
        }

        var ts = Date.now().toString;
        let md5s = md5(ts + "86688e03b105dc30d707e67e0ffe77bf251ca29f" + "896724abd5a3b9f7d079bc0d2dffc265")
        fetch("http://gateway.marvel.com/v1/public/characters?ts=" + ts + "&apikey=896724abd5a3b9f7d079bc0d2dffc265&hash=" + md5s)
            .then(result => result.json())
            .then(res => {
                console.log(res.data.results);
                var superArr = res.data.results;
                this.setState(prevState => ({
                    supers: [...prevState.supers, superArr]
                  }));
                localStorage.setItem('characters', this.state.supers);
            })
    }



    render() {

        

        return (
                <Accordion defaultActiveKey="0">
                    {this.state.supers.map((e)=>(
                        e.map((elem,i) =>(
                            <Card >
                            <Accordion.Toggle as={Card.Header} eventKey="0" >
                                <div>
                                {elem.name}
                                
                                </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0" >
                            <Card.Body>
                                <img src={elem.thumbnail.path + "." + elem.thumbnail.extension} ></img>
                                <br></br>
                                <h5><p>{elem.description}
                                    </p></h5>
                                
                            </Card.Body>
                             </Accordion.Collapse>
                            </Card>
                        ))
                    ))}
                </Accordion>
        );
    }
}
