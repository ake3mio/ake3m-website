import React, { Component } from 'react';
import CardMenuItem from "../CardMenuItem";
import './index.scss';
import WordFragment from "../WordFragment";

class CardMenu extends Component {

    itemsLeft = 0;

    state = {
        selectedMenuItem: null
    };

    render() {
        return (
            <div className="CardMenu">
                <WordFragment/>
                {this.renderMenuLinks()}
            </div>
        );
    }

    renderMenuLinks() {
        const { menuLinks } = this.props;
        const step = 0.65;
        let currentOffset = .25;

        return menuLinks.map(({ menulink: { data, uid } }, index) => {
            const offset = index > 0 ? currentOffset - step : currentOffset;

            return (
                <CardMenuItem
                    key={uid}
                    index={index}
                    item={{ ...data, slug: uid }}
                    offset={offset}
                />
            );
        });
    }

}


export default CardMenu;

