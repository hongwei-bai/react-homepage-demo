import React from "react";
import {withRouter} from "react-router-dom";
import {Card, Divider } from 'antd';

const {Meta} = Card;

class KnowledgeRoot extends React.Component {

    render() {
        return (
            <div>
                <Divider orientation="left" plain>
                    Left Text
                </Divider>
                <Card
                    hoverable
                    style={{width: 160}}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com"/>
                </Card>
                <Card
                    hoverable
                    style={{width: 160}}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com"/>
                </Card>
                <Divider orientation="left" plain>
                    Left Text
                </Divider>
                <Card
                    hoverable
                    style={{width: 160}}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com"/>
                </Card>
            </div>
        )
    }
}

export default withRouter(KnowledgeRoot);