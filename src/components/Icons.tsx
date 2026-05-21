import { Component } from "react";
import type { IconType } from "react-icons";
import { Link } from "react-router-dom";


interface IconsProps {
    Icon: IconType;
    heading: string;
    path:string;
}

export default class Icon extends Component<IconsProps> {
    render(){
        const Icon=this.props.Icon
        return (
          <Link to={this.props.path} className="flex flex-col items-center">
            <Icon className="text-lg"/>
            <h1 className="text-sm">{this.props.heading}</h1>
          </Link>
        )
    }
}