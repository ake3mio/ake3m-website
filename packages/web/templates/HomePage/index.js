import React from 'react'
import './styles/index.scss'
import Img from "../../components/Img";
import CardMenu from "../../components/CardMenu";
import LinkHomeLogo from '../../components/LinkHomeLogo';

class HomePage extends React.Component {

    render() {
        const { content: { background, menu } } = this.props;
        return (
            <div className="HomePage">
                <Img
                    className="HomePage__background"
                    {...background}
                    preload={true}
                />
                <LinkHomeLogo/>
                <CardMenu menuLinks={menu}/>
            </div>
        )
    }
}

export default HomePage
