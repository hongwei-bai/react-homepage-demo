import React from 'react';
import * as SRD from "storm-react-diagrams"
import './FlowChatDemo.css';

require("storm-react-diagrams/dist/style.min.css")

class FlowChatDemo extends React.Component {
    setupEngine() {
        // 1) setup the diagram engine
        let engine = new SRD.DiagramEngine();
        engine.installDefaultFactories();

        // 2) setup the diagram model
        let model = new SRD.DiagramModel();

        // 3) create a default node
        let node1 = new SRD.DefaultNodeModel("Node 1", "rgb(0,192,255)");
        let port1 = node1.addOutPort("Out");
        node1.setPosition(100, 100);

        // 4) create another default node
        let node2 = new SRD.DefaultNodeModel("Node 2", "rgb(192,255,0)");
        let port2 = node2.addInPort("In");
        node2.setPosition(400, 100);

        // 5) link the ports
        let link1 = port1.link(port2);

        // 6) add the models to the root graph
        model.addAll(node1, node2, link1);

        // 7) load model into engine
        engine.setDiagramModel(model);
        return engine;
    }

    render() {
        return <div className="DemoRootDark">
            <p className="DemoContentDark">
                <h1>Storm React Diagrams</h1>
                <SRD.DiagramWidget className="DemoDiagram" diagramEngine={this.setupEngine()}/>
                <p>a super simple, no-nonsense diagramming library written in react that just works.</p>
                <ul className="DemoLinks">
                    <li>
                        <a href="https://github.com/projectstorm/react-diagrams">Author's Github</a><br/>
                    </li>
                    <li>
                        <a href="https://blog.sourcerer.io/build-interactive-diagrams-with-storm-react-diagrams-f172ae26af9d">Build
                            interactive diagrams with storm-react-diagrams!</a>
                    </li>
                </ul>
            </p>
        </div>
    }
}

export default FlowChatDemo;
