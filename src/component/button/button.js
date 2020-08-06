import React, { Component } from "react";
import Radium from 'radium'
import chroma from "chroma-js";

import './button.css';

const styleGenerator = ({ primary, secondary, background }) => {
    const backgroundColor = primary ? "#00ffff" : secondary ? "#00ced1" : background;
    return {
        background: backgroundColor,
        ":hover": {
            background: chroma(backgroundColor).darken() //ブレンドモード:darken
        }
    };
};

class Button extends Component {
    static defaultProps = {
        background: "#90ee90"
    };

    render() {
        const { style, ...other } = this.props;
        return <button style={[styleGenerator(this.props), style]} {...other} />;
    }
}

//CSSの拡張（hover）等をjsでcss操作できるようにライブラリーを挟む（Radium）
export default Radium(Button);
